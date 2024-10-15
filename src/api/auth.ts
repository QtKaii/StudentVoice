import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

interface User {
    username: string;
    email: string;
    password: string;
}

interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    userId?: string; // Added userId
}

export async function signup(user: User): Promise<AuthResponse> {
    try {
        const response = await axios.post(`${API_URL}/signup`, user);
        return response.data;
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, message: 'An error occurred during signup' };
    }
}

export async function login(email: string, password: string): Promise<AuthResponse> {
    try {
        const response = await axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
        return response.data; // Return the entire response data
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An error occurred during login' };
    }
}

export function logout(): void {
    localStorage.removeItem('authToken');
}

export function getAuthToken(): string | null {
    return localStorage.getItem('authToken');
}

export async function getCurrentUser(): Promise<{ authenticated: boolean; userId?: string }> {
    const token = getAuthToken();
    if (!token) {
        return { authenticated: false };
    }

    try {
        const response = await axios.get(`${API_URL}/verify-token`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return { authenticated: true, userId: response.data.userId };
    } catch (error) {
        console.error('Token verification error:', error);
        logout(); // Clear invalid token
        return { authenticated: false };
    }
}

export function createAuthenticatedAxiosInstance() {
    const token = getAuthToken();
    return axios.create({
        baseURL: API_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchUserData(): Promise<any> {
    try {
        const axiosInstance = createAuthenticatedAxiosInstance();
        const response = await axiosInstance.get('/user-data');
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}
