// src/api/authApi.ts
import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const registerUser = async (data: { name: string; email: string; password: string }) => {
    const res = await API.post('/auth/register', data);
    return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
    const res = await API.post('/auth/login', data);
    return res.data;
};
