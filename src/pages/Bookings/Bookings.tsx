import BookingForm from "../../components/bookings/BookingForm";
import { useBookings } from "../../hooks/useBookings";

export default function BookingsPage() {
    const { bookings, refetch } = useBookings();

    return (
        <div className="p-6 space-y-6">
            <BookingForm onSuccess={refetch} />
            <div>
                <h2 className="text-xl font-semibold mb-2">Your Bookings</h2>
                {bookings.map((b) => (
                    <div key={b.id} className="bg-gray-100 p-3 rounded-md mb-2">
                        {b.room.name} | {new Date(b.startTime).toLocaleString()} →{" "}
                        {new Date(b.endTime).toLocaleString()}
                    </div>
                ))}
            </div>
        </div>
    );
}
