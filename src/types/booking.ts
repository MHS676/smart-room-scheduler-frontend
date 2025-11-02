// src/types/booking.ts

export type BookingPriority = 'HIGH' | 'NORMAL' | 'LOW';

export interface BookingRequest {
    roomName: string; // ✅ user-friendly name instead of roomId
    attendeesCount: number;
    duration: number; // in minutes
    requiredEquipment: string[];
    preferredStart: string; // ISO string
    flexibility: number; // in minutes
    priority: BookingPriority;
    ticketTitle: string;
}

export interface AlternativeRoom {
    id: string;
    name: string;
    capacity: number;
}

export interface Booking {
    id: string;
    meetingRoomId: string;
    meetingRoom?: { name: string };
    startTime: string;
    endTime: string;
    attendeesCount: number;
    duration: number;
    requiredEquipment: string[];
    priority: string;
    status: string;
    ticketTitle: string;
    cost: number;
}

export type BookingResponse =
    | Booking
    | { message: string; alternatives?: AlternativeRoom[] };
