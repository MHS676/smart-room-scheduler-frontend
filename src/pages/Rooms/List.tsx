import { useEffect, useState } from 'react'
import Navbar from '../../components/shared/Navbar'
import { api } from '../../services/api'


export default function RoomsPage() {
    const [rooms, setRooms] = useState<any[]>([])
    useEffect(() => { api.get('/rooms').then(r => setRooms(r.data)).catch(() => { }) }, [])
    return (
        <div>
            <Navbar />
            <main className="p-6">
                <h1 className="text-2xl font-bold mb-4">Meeting Rooms</h1>
                <div className="grid grid-cols-3 gap-4">
                    {rooms.map(r => (
                        <div key={r.id} className="bg-white p-4 rounded shadow">
                            <h3 className="font-semibold">{r.name}</h3>
                            <p>Capacity: {r.capacity}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}