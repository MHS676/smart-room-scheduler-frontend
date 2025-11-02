import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getBookings } from '../../services/bookingApi';
import type { Booking } from '../../types/booking';

export default function BookingList() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useAuth();

    useEffect(() => {
        if (token) fetchBookings();
    }, [token]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getBookings(token!);
            setBookings(data);
        } catch (err: any) {
            console.error('Failed to fetch bookings:', err);
            setError(err.message || 'Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRMED':
                return 'bg-green-100 text-green-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                {error}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Your Bookings</h2>
                <button
                    onClick={fetchBookings}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                    Refresh
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Room
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Duration
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Attendees
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {booking.meetingRoom?.name || 'Unknown Room'}
                                    </div>
                                    <div className="text-sm text-gray-500">{booking.ticketTitle}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">
                                        {new Date(booking.startTime).toLocaleString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{booking.duration} min</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{booking.attendeesCount}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                            booking.status
                                        )}`}
                                    >
                                        {booking.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {bookings.length === 0 && (
                    <div className="text-center py-12">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try creating a booking.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
