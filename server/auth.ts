import { Surreal } from "surrealdb";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

const db = new Surreal();
const secretKey = process.env.JWT_SECRET_KEY;
if (!secretKey) {
    throw new Error("JWT_SECRET_KEY is not set in environment variables");
}

// Initialize the database connection with retry mechanism and detailed logging
export async function initDB(maxRetries = 5, retryDelay = 5000) {
    const surrealDbUrl = process.env.SURREALDB_URL || "ws://localhost:8000/rpc";
    console.log(`Attempting to connect to SurrealDB at ${surrealDbUrl}`);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}: Connecting to SurrealDB...`);
            await db.connect(surrealDbUrl);
            console.log(`Attempt ${attempt}: Connection established. Setting namespace and database...`);
            await db.use({ namespace: "studentvoice", database: "auth" });
            console.log(`Attempt ${attempt}: Namespace and database set. Signing in...`);
            await db.signin({
                username: "root",
                password: "root",
            });
            console.log("Successfully connected to SurrealDB and signed in");
            return; // Connection successful, exit the function
        } catch (error) {
            console.error(`Attempt ${attempt} failed to connect to database:`, error);
            if (attempt === maxRetries) {
                console.error(`Max retries (${maxRetries}) reached. Throwing error.`);
                throw error; // Throw error on last attempt
            }
            console.log(`Retrying in ${retryDelay / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}

interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
}

const userSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(100),
});

export async function signup(user: Omit<User, 'id'>): Promise<{ success: boolean; message: string }> {
    try {
        // Validate input
        const validatedUser = userSchema.parse(user);

        // Check if user already exists
        const existingUser = await db.query<[[User]]>(
            "SELECT * FROM user WHERE email = $email",
            { email: validatedUser.email }
        );
        if (existingUser[0].length > 0) {
            return { success: false, message: 'User already exists' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(validatedUser.password, 10);

        // Create a new user
        await db.create('user', {
            username: validatedUser.username,
            email: validatedUser.email,
            password: hashedPassword,
        });

        return { success: true, message: 'User created successfully' };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: 'Invalid input: ' + error.errors.map(e => e.message).join(', ') };
        }
        console.error('Error creating user:', error);
        return { success: false, message: 'An error occurred' };
    }
}

export async function login(email: string, password: string): Promise<{ success: boolean; message: string; token?: string }> {
    try {
        const users = await db.query<[[User]]>(
            "SELECT * FROM user WHERE email = $email",
            { email }
        );
        if (users[0].length !== 1) {
            return { success: false, message: 'User not found' };
        }

        const user = users[0][0];
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword && user.id) {
            const token = jwt.sign({ userId: user.id }, secretKey as string, { expiresIn: '1h' });
            return { success: true, message: 'Login successful', token };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An error occurred during login' };
    }
}

export function verifyToken(token: string): { userId: string } | null {
    try {
        const decoded = jwt.verify(token, secretKey as string) as JwtPayload;
        if (decoded && decoded.userId) {
            return { userId: decoded.userId };
        }
        return null;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

export async function getUserData(userId: string): Promise<User | null> {
    try {
        const users = await db.query<[[User]]>(
            "SELECT id, username, email FROM user WHERE id = $userId",
            { userId }
        );
        if (users[0].length === 1) {
            return users[0][0];
        }
        return null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}
