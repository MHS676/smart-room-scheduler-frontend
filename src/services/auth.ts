import axios from 'axios';
import type { AuthError, AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const registerUser = async (data: RegisterRequest): Promise<AuthResponse> => {
    try {
        const res = await API.post<AuthResponse>('/auth/register', data);
        return res.data;
    } catch (error: any) {
        throw {
            message: error.response?.data?.message || 'Registration failed',
            status: error.response?.status || 500,
        } as AuthError;
    }
};

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
    try {
        const res = await API.post<AuthResponse>('/auth/login', data);
        return res.data;
    } catch (error: any) {
        throw {
            message: error.response?.data?.message || 'Login failed',
            status: error.response?.status || 500,
        } as AuthError;
    }
};
