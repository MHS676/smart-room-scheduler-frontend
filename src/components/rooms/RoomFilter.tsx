interface RoomFilterProps {
    onFilter: (filters: { capacity?: number; equipment?: string[] }) => void;
}

export default function RoomFilter({ onFilter }: RoomFilterProps) {
    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const capacity = Number((form.elements.namedItem("capacity") as HTMLInputElement).value);
        const equipment = Array.from(form.querySelectorAll("input[name='equipment']:checked")).map(
            (el) => (el as HTMLInputElement).value
        );
        onFilter({ capacity, equipment });
    };

    return (
        <form onSubmit={handleFilter} className="bg-white p-4 rounded-lg shadow w-64 space-y-2">
            <h2 className="text-lg font-semibold">Filter Rooms</h2>
            <input
                name="capacity"
                type="number"
                placeholder="Min Capacity"
                className="border p-2 w-full rounded"
            />
            <div>
                {["projector", "whiteboard", "tv"].map((eq) => (
                    <label key={eq} className="flex items-center gap-2">
                        <input name="equipment" value={eq} type="checkbox" />
                        {eq}
                    </label>
                ))}
            </div>
            <button className="bg-blue-500 text-white w-full rounded py-2">Apply</button>
        </form>
    );
}
