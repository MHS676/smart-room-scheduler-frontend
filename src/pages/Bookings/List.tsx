import { useEffect, useState } from 'react'
import Navbar from '../../components/shared/Navbar'
import { api } from '../../services/api'


export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([])
    useEffect(() => { api.get('/bookings').then(r => setBookings(r.data)).catch(() => { }) }, [])
    return (
        <div>
            <Navbar />
            <main className="p-6">
                <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
                <div className="space-y-2">
                    {bookings.map(b => (
                        <div key={b.id} className="bg-white p-4 rounded shadow">{b.id} — {b.status}</div>
                    ))}
                </div>
            </main>
        </div>
    )
}