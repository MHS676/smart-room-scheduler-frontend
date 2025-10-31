import { useState } from "react";
import RoomFilter from "../../components/rooms/RoomFilter";

export default function RoomsPage() {
    const [filters, setFilters] = useState({});
    console.log("Filters applied:", filters);

    return (
        <div className="p-6 flex gap-6">
            <RoomFilter onFilter={setFilters} />
            <div className="flex-1 bg-gray-50 p-6 rounded-xl">Room results will go here...</div>
        </div>
    );
}
