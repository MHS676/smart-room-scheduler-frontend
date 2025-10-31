// src/api/roomApi.ts
import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

export const getRooms = async (token: string) => {
    const res = await API.get('/rooms', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
