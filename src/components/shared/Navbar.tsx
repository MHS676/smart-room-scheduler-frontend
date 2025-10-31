// src/components/shared/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const role = user?.role?.toLowerCase();

    return (
        <nav className="bg-white shadow py-3 px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <Link to="/" className="font-bold">SmartRoom</Link>
                <Link to="/bookings" className="text-sm">Bookings</Link>
                <Link to="/rooms" className="text-sm">Rooms</Link>
                {role === 'admin' && <Link to="/" className="text-sm">Admin</Link>}
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm">{user?.name} ({user?.role})</span>
                <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded">Logout</button>
            </div>
        </nav>
    );
};
export default Navbar;
