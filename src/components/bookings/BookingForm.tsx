// src/components/BookingForm/BookingForm.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createBooking } from '../../services/bookingApi';
import type { BookingRequest, BookingResponse, AlternativeRoom } from '../../types/booking';

interface BookingFormProps {
    onSuccess?: () => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
    const { token } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [alternatives, setAlternatives] = useState<AlternativeRoom[]>([]);

    const [formData, setFormData] = useState<BookingRequest>({
        roomName: '',
        attendeesCount: 1,
        duration: 30,
        requiredEquipment: [],
        preferredStart: '',
        flexibility: 15,
        priority: 'NORMAL',
        ticketTitle: '',
    });

    // Debug token
    useEffect(() => {
        console.log('Token in BookingForm:', token);
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        setAlternatives([]);

        try {
            if (!token) throw new Error('Authentication required - Please log in again');

            const response = (await createBooking(formData, token)) as BookingResponse;

            if ('alternatives' in response && response.alternatives && response.alternatives.length > 0) {
                setError('Your requested room/time is unavailable. Please choose an alternative.');
                setAlternatives(response.alternatives);
            } else {
                setSuccess('Booking created successfully!');
                onSuccess?.();
                setFormData({
                    roomName: '',
                    attendeesCount: 1,
                    duration: 30,
                    requiredEquipment: [],
                    preferredStart: '',
                    flexibility: 15,
                    priority: 'NORMAL',
                    ticketTitle: '',
                });
            }
        } catch (err: any) {
            console.error('Booking error:', err);
            setError(err.message || 'Failed to create booking');
        } finally {
            setLoading(false);
        }
    };

    const handleEquipmentChange = (equipment: string) => {
        setFormData(prev => ({
            ...prev,
            requiredEquipment: prev.requiredEquipment.includes(equipment)
                ? prev.requiredEquipment.filter(e => e !== equipment)
                : [...prev.requiredEquipment, equipment],
        }));
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create a Booking</h2>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md">
                    <p className="font-medium">{error}</p>
                    {alternatives.length > 0 && (
                        <div className="mt-4">
                            <p className="text-sm text-gray-600 mb-2">Suggested alternative rooms:</p>
                            <div className="grid grid-cols-2 gap-3">
                                {alternatives.map(room => (
                                    <button
                                        key={room.id}
                                        type="button"
                                        onClick={() => {
                                            setFormData(prev => ({ ...prev, roomName: room.name }));
                                            setError('');
                                            setAlternatives([]);
                                        }}
                                        className="p-3 text-left bg-white border border-red-300 rounded hover:bg-red-50 transition"
                                    >
                                        <div className="font-semibold text-gray-800">{room.name}</div>
                                        <div className="text-sm text-gray-600">
                                            Capacity: {room.capacity}
                                        </div>
                                        <div className="text-xs text-indigo-600 mt-1">Click to select this room</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-md">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Room Name</label>
                    <input
                        type="text"
                        value={formData.roomName}
                        onChange={e => setFormData(prev => ({ ...prev, roomName: e.target.value }))}
                        placeholder="Enter room name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Ticket Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ticket Title</label>
                    <input
                        type="text"
                        value={formData.ticketTitle}
                        onChange={e => setFormData(prev => ({ ...prev, ticketTitle: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                {/* Attendees & Duration */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Attendees Count</label>
                        <input
                            type="number"
                            min="1"
                            value={formData.attendeesCount}
                            onChange={e => setFormData(prev => ({ ...prev, attendeesCount: parseInt(e.target.value) }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                        <select
                            value={formData.duration}
                            onChange={e => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                        </select>
                    </div>
                </div>

                {/* Required Equipment */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Required Equipment</label>
                    <div className="mt-2 flex flex-wrap gap-3">
                        {['Projector', 'Whiteboard', 'Video Conference', 'Audio System'].map(equipment => (
                            <label key={equipment} className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={formData.requiredEquipment.includes(equipment)}
                                    onChange={() => handleEquipmentChange(equipment)}
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">{equipment}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Preferred Start & Flexibility */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preferred Start Time</label>
                        <input
                            type="datetime-local"
                            value={formData.preferredStart}
                            onChange={e => setFormData(prev => ({ ...prev, preferredStart: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Flexibility (minutes)</label>
                        <select
                            value={formData.flexibility}
                            onChange={e => setFormData(prev => ({ ...prev, flexibility: parseInt(e.target.value) }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="0">No flexibility</option>
                            <option value="15">±15 minutes</option>
                            <option value="30">±30 minutes</option>
                            <option value="60">±1 hour</option>
                        </select>
                    </div>
                </div>

                {/* Priority */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                        value={formData.priority}
                        onChange={e => setFormData(prev => ({ ...prev, priority: e.target.value as 'HIGH' | 'NORMAL' | 'LOW' }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="LOW">Low</option>
                        <option value="NORMAL">Normal</option>
                        <option value="HIGH">High</option>
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                    {loading ? 'Creating Booking...' : 'Create Booking'}
                </button>
            </form>
        </div>
    );
}
