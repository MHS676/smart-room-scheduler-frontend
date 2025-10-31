import { useEffect, useState } from "react";
import API from "../lib/api";

export interface Booking {
    id: string;
    room: { name: string };
    startTime: string;
    endTime: string;
    status: string;
}

export function useBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await API.get("/bookings");
            setBookings(res.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    return { bookings, loading, refetch: fetchBookings };
}
