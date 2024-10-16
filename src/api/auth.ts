import axios, { Axios } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

type User = {
    userId: string;
    username: string;
    email: string;
    isFirstLogin: boolean;
    institutionId?: string;
    courseId?: string;
    year?: string;
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

export async function getCurrentUser(): Promise<User | null> { 
    const token = getAuthToken();
    if (!token) {
        return null;
    }

    try {
        const instanceAxios = createAuthenticatedAxiosInstance();
        const response = await instanceAxios.get<{ authenticated: boolean; userId?: string }>('/verify-token');
        if (response.data.authenticated) {
            const user = await instanceAxios.get<User>('/user-data')
            return user.data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Token verification error:', error);
        logout(); // Clear invalid token
        return null;
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