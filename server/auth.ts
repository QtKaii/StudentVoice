import { StringRecordId, Surreal } from "surrealdb";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

const db = new Surreal();

// Initialize the database connection with retry mechanism and detailed logging
export async function initDB(maxRetries = 5, retryDelay = 5000) {
    const surrealDbUrl = process.env.SURREALDB_URL || "ws://127.0.0.1:8000/rpc";
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

type User = {
    id: string;
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

        return { success: true, message: 'User created successfully. Please login to continue.' };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { success: false, message: 'Invalid input: ' + error.errors.map(e => e.message).join(', ') };
        }
        console.error('Error creating user:', error);
        return { success: false, message: 'An error occurred' };
    }
}

export async function login(email: string, password: string): Promise<{ success: boolean; message: string; token?: string; userId?: string }> {
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
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
            return { success: true, message: 'You have successfully logged in!', token, userId: user.id }; // Include userId
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
        if (decoded && decoded.userId) {
            return { userId: decoded.userId };
        }
        return null;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
}

type CleanedUserDataType = {
            id: string;
            username: string;
            email: string;
        };


export async function getUserData(userId: string): Promise<CleanedUserDataType | null> {
    try {
        const user = await db.select<User>(new StringRecordId(userId));

        if (user) {
            // Clean the user data
            // remove any other fields other than that described in the type
            const cleanedUserData: CleanedUserDataType = {
                id: user.id,
                username: user.username,
                email: user.email,
            };

            return cleanedUserData;
        }

        return null;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}
