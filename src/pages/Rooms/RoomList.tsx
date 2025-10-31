// src/pages/RoomList.tsx
import { useEffect, useState } from 'react';
import { getRooms } from '../../services/roomApi';
import { useAuth } from '../../context/AuthContext';

export default function RoomList() {
    const { user } = useAuth();
    const [rooms, setRooms] = useState<any[]>([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchRooms = async () => {
            const data = await getRooms(user?.token || '');
            setRooms(data);
        };
        fetchRooms();
    }, [user]);

    const filteredRooms = rooms.filter((r) =>
        r.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
            <input
                type="text"
                placeholder="Search rooms..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredRooms.map((room) => (
                    <div key={room.id} className="border p-4 rounded shadow-sm bg-white">
                        <h3 className="font-bold">{room.name}</h3>
                        <p>Capacity: {room.capacity}</p>
                        <p>Equipments: {room.requiredEquipment?.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
