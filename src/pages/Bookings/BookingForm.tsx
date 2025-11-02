import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';


type User = { id: string; name: string };
// Room type removed — not used in this page

const BookingForm: React.FC = () => {
    const { user } = useAuth();

    const [attendees, setAttendees] = useState<string[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [duration, setDuration] = useState(60);
    const [requiredEquipment, setRequiredEquipment] = useState<string[]>([]);
    const [preferredStart, setPreferredStart] = useState('');
    const [flexibility, setFlexibility] = useState(15);
    const [priority, setPriority] = useState<'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'>('NORMAL');
    const [ticketId, setTicketId] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    // fetch all users for attendee selection
    useEffect(() => {
        api.get('/users')
            .then(res => setAllUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const payload = {
            organizerId: user.id,
            attendees,
            duration,
            requiredEquipment,
            preferredStart,
            flexibility,
            priority,
            ticketId,
        };

        try {
            const res = await api.post('/bookings', payload);
            if (res.data.error) {
                setMessage(`Error: ${res.data.error}`);
            } else {
                setMessage('Booking created successfully!');
            }
        } catch (err: any) {
            setMessage(err.response?.data?.message || 'Failed to create booking');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">Create Booking</h2>
            {message && <div className="mb-4 text-red-500">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Attendees */}
                <div>
                    <label className="block font-medium mb-1">Attendees</label>
                    <select
                        multiple
                        className="w-full border p-2 rounded"
                        value={attendees}
                        onChange={e => setAttendees(Array.from(e.target.selectedOptions, o => o.value))}
                    >
                        {allUsers.map(u => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                    </select>
                </div>

                {/* Duration */}
                <div>
                    <label className="block font-medium mb-1">Duration (minutes)</label>
                    <input
                        type="number"
                        value={duration}
                        onChange={e => setDuration(parseInt(e.target.value))}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Required Equipment */}
                <div>
                    <label className="block font-medium mb-1">Required Equipment</label>
                    <div className="flex gap-2">
                        {['projector', 'whiteboard', 'microphone'].map(eq => (
                            <label key={eq} className="flex items-center gap-1">
                                <input
                                    type="checkbox"
                                    checked={requiredEquipment.includes(eq)}
                                    onChange={e => {
                                        if (e.target.checked) setRequiredEquipment(prev => [...prev, eq]);
                                        else setRequiredEquipment(prev => prev.filter(r => r !== eq));
                                    }}
                                />
                                {eq}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Preferred Start */}
                <div>
                    <label className="block font-medium mb-1">Preferred Start</label>
                    <input
                        type="datetime-local"
                        value={preferredStart}
                        onChange={e => setPreferredStart(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Flexibility */}
                <div>
                    <label className="block font-medium mb-1">Flexibility (minutes)</label>
                    <input
                        type="number"
                        value={flexibility}
                        onChange={e => setFlexibility(parseInt(e.target.value))}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* Priority */}
                <div>
                    <label className="block font-medium mb-1">Priority</label>
                    <select
                        value={priority}
                        onChange={e => setPriority(e.target.value as any)}
                        className="w-full border p-2 rounded"
                    >
                        {['LOW', 'NORMAL', 'HIGH', 'URGENT'].map(p => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>

                {/* Ticket ID */}
                <div>
                    <label className="block font-medium mb-1">Ticket ID (optional)</label>
                    <input
                        type="text"
                        value={ticketId}
                        onChange={e => setTicketId(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600"
                >
                    Create Booking
                </button>
            </form>

        </div>
    );
};

export default BookingForm;
