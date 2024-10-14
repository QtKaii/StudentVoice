import { Surreal } from "surrealdb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const db = new Surreal();
const secretKey = process.env.SECRET_KEY || "default-secret-key"; // Replace with a secure secret key

// Initialize the database connection
async function initDB() {
    try {
        await db.connect("http://127.0.0.1:8000/rpc");
        await db.use({ namespace: "studentvoice", database: "auth" });
        await db.signin({
            username: "root",
            password: "root",
        });
    } catch (error) {
        console.error('Failed to connect to database:', error);
    }
}

// Call initDB when the app starts
initDB();

interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
}

export async function signup(user: Omit<User, 'id'>): Promise<{ success: boolean; message: string }> {
    try {
        // Check if user already exists
        const existingUser = await db.query<[[User]]>(
            "SELECT * FROM user WHERE email = $email",
            { email: user.email }
        );
        if (existingUser[0].length > 0) {
            console.log(existingUser);
            return { success: false, message: 'User already exists' };
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Create new user
        const created = await db.create("user", {
            username: user.username,
            email: user.email,
            password: hashedPassword,
        });

        if (created && Array.isArray(created) && created.length > 0 && 'id' in created[0]) {
            return { success: true, message: 'User created successfully' };
        } else {
            return { success: false, message: 'Failed to create user' };
        }
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, message: 'An error occurred during signup' };
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
        if (isValidPassword) {
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            return { success: true, message: 'Login successful', token };
        } else {
            return { success: false, message: 'Invalid credentials' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An error occurred during login' };
    }
}
