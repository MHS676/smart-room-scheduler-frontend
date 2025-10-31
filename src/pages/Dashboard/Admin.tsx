import Navbar from '../../components/shared/Navbar';

export default function AdminDashboard() {
    return (
        <div>
            <Navbar />
            <main className="p-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-4 rounded shadow">User management</div>
                    <div className="bg-white p-4 rounded shadow">Room management</div>
                    <div className="bg-white p-4 rounded shadow">Reports</div>
                </div>
            </main>
        </div>
    );
}
