import { useBookings } from "../../hooks/useBookings";

export default function CalendarView() {
    const { bookings, loading } = useBookings();

    if (loading) return <p>Loading...</p>;

    return (
        <div className="grid gap-4">
            <h2 className="text-2xl font-bold">Calendar View</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings.map((b) => (
                    <div key={b.id} className="bg-white p-4 rounded shadow">
                        <h3 className="font-semibold">{b.room.name}</h3>
                        <p>{new Date(b.startTime).toLocaleString()} → {new Date(b.endTime).toLocaleString()}</p>
                        <p>Status: <span className="font-medium">{b.status}</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
}
