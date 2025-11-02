import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const Sidebar = () => {
    const location = useLocation();
    const { user } = useAuth();

    const menuItems = [
        {
            title: 'Dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            ),
            path: '/dashboard'
        },
        {
            title: 'Bookings',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            path: '/book'
        },
        {
            title: 'Rooms',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
            path: '/rooms'
        },
        {
            title: 'Calendar',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            path: '/calendar'
        }
    ];

    if (user?.role === 'ADMIN') {
        menuItems.push({
            title: 'Users',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            path: '/users'
        });
    }

    return (
        <div className="h-full bg-white border-r border-gray-200 w-64 fixed left-0 top-16">
            <nav className="mt-5 px-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`
                            flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1
                            ${location.pathname === item.path
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-700 hover:bg-gray-50'
                            }
                            transition-colors duration-150
                        `}
                    >
                        {item.icon}
                        <span className="ml-3">{item.title}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <div className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
            <div className="px-4 h-16 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-xl font-semibold text-indigo-600">Smart Room</span>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center space-x-3 focus:outline-none"
                    >
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">
                                {user?.name?.charAt(0)?.toUpperCase()}
                            </span>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                        <svg
                            className={`w-4 h-4 text-gray-400 transform transition-transform ${isProfileOpen ? 'rotate-180' : ''
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                            <button
                                onClick={logout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Sidebar />
            <div className="pl-64 pt-16">
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}