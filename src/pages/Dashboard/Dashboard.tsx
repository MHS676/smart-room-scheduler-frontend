// src/pages/Dashboard.tsx
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Welcome, {user?.name} ({user?.role})
                </h1>
                <button
                    onClick={logout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link to="/rooms" className="p-6 bg-blue-100 rounded-lg text-center hover:bg-blue-200">
                    🏢 View Rooms
                </Link>
                <Link to="/book" className="p-6 bg-green-100 rounded-lg text-center hover:bg-green-200">
                    📝 Create Booking
                </Link>
                <Link to="/calendar" className="p-6 bg-yellow-100 rounded-lg text-center hover:bg-yellow-200">
                    📅 Calendar View
                </Link>
            </div>
        </div>
    );
}
