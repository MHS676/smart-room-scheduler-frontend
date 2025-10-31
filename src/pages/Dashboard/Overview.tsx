import Navbar from '../../components/shared/Navbar'


export default function DashboardPage() {
    return (
        <div>
            <Navbar />
            <main className="p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 bg-white p-4 rounded shadow">Bookings summary (placeholder)</div>
                    <div className="bg-white p-4 rounded shadow">Rooms summary (placeholder)</div>
                </div>
            </main>
        </div>
    )
}