
import Navbar from '../../components/shared/Navbar';
import { useAuth } from '../../context/AuthContext';

export default function UserDashboard() {
    const { user } = useAuth();
    return (
        <div>
            <Navbar />
            <main className="p-6">
                <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded shadow">My bookings</div>
                    <div className="bg-white p-4 rounded shadow">Available rooms</div>
                </div>
            </main>
        </div>
    );
}
