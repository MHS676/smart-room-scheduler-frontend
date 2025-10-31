// src/pages/CalendarView.tsx
import { useEffect, useState } from 'react';
import { getBookings } from '../../services/bookingApi';
import { useAuth } from '../../context/AuthContext';

export default function CalendarView() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await getBookings(user?.token || '');
            setBookings(data);
        };
        fetchBookings();
    }, [user]);

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">📅 Booking Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookings.map((b) => (
                    <div key={b.id} className="border rounded p-3 bg-white shadow">
                        <h3 className="font-bold">{b.room?.name}</h3>
                        <p>{b.date}</p>
                        <p>
                            {b.startTime} - {b.endTime}
                        </p>
                        <p className="text-sm text-gray-600">{b.purpose}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
