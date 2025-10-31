import { useState } from "react";
import API from "../../lib/api";

interface BookingFormProps {
    onSuccess?: () => void;
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
    const [roomId, setRoomId] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [attendees, setAttendees] = useState("");
    const [equipment, setEquipment] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post("/bookings", {
                roomId,
                startTime,
                endTime,
                attendees: attendees.split(","),
                requiredEquipment: equipment,
            });
            alert("Booking created!");
            onSuccess?.();
        } catch (err) {
            alert("Failed to create booking");
            console.error(err);
        }
    };

    const toggleEquipment = (item: string) => {
        setEquipment((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold">Create a Booking</h2>
            <input
                className="border p-2 w-full rounded"
                placeholder="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <div className="flex gap-2">
                <input
                    type="datetime-local"
                    className="border p-2 rounded w-full"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                />
                <input
                    type="datetime-local"
                    className="border p-2 rounded w-full"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                />
            </div>
            <input
                className="border p-2 w-full rounded"
                placeholder="Attendees IDs (comma separated)"
                value={attendees}
                onChange={(e) => setAttendees(e.target.value)}
            />

            <div className="flex flex-wrap gap-3">
                {["projector", "whiteboard", "tv"].map((item) => (
                    <label key={item} className="flex items-center gap-1">
                        <input
                            type="checkbox"
                            checked={equipment.includes(item)}
                            onChange={() => toggleEquipment(item)}
                        />
                        {item}
                    </label>
                ))}
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                Book Room
            </button>
        </form>
    );
}
