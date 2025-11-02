// src/services/bookingApi.ts
import type { BookingRequest, BookingResponse } from '../types/booking';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

/**
 * Create a booking request
 */
export async function createBooking(
    data: BookingRequest,
    token: string
): Promise<BookingResponse> {
    const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to create booking');
    }

    return res.json() as Promise<BookingResponse>;
}

/**
 * Get all rooms (optional helper if you want dropdown list)
 */
export async function getRooms(token: string) {
    const res = await fetch(`${API_BASE}/rooms`, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch rooms');
    }

    return res.json();
}

export async function getBookings(token: string) {
    const res = await fetch(`${API_BASE}/bookings/calendar`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to fetch bookings');
    }

    return res.json();
}