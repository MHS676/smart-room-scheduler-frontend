// src/api/bookingApi.ts
import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
});

export const getBookings = async (token: string) => {
    const res = await API.get('/bookings', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const createBooking = async (data: any, token: string) => {
    const res = await API.post('/bookings', data, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
