import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { signup, login, initDB, verifyToken, getUserData } from './auth.js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Check if JWT_SECRET_KEY is set
if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not set in environment variables");
}

const app = express();
app.use(express.json());



// Extend the Express Request type to include the user property
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
            };
        }
    }
}

// Middleware to check for authentication
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.sendStatus(401);
        return;
    }

    const user = verifyToken(token);
    if (user == null) {
        res.sendStatus(403);
        return;
    }

    req.user = user;
    next();
};

// API routes should be defined BEFORE the static file serving middleware
app.post('/api/signup', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await signup(user);
        res.json(result);
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

app.post('/api/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await login(email, password);
        res.json(result);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
});

app.get('/api/verify-token', authenticateToken, (req: Request, res: Response) => {
    res.json({ authenticated: true, userId: req.user?.userId });
});


// Updated endpoint for fetching user data
app.get('/api/user-data', authenticateToken, async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.user?.userId) {
            res.status(400).json({ success: false, message: 'User ID not found' });
            return;
        }
        const userData = await getUserData(req.user.userId);
        if (userData) {
            res.json({ success: true, user: userData });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching user data' });
    }
});

const port = process.env.PORT || 3001;

// Initialize the database and start the server
initDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error: unknown) => {
        console.error("Failed to initialize database. Exiting application.", error);
        process.exit(1);
    });
