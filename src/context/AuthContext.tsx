import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthResponse } from '../types/auth';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (data: AuthResponse) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        console.log('Initial load - stored token:', storedToken); // Debug stored token
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
        // finished reading from storage
        setLoading(false);
    }, []);

    const login = (data: AuthResponse) => {
        console.log('Login data received:', data); // Debug login data
        const { user, access_token } = data;
        setUser(user);
        setToken(access_token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', access_token);
        console.log('Token stored:', access_token); // Debug token storage
        setLoading(false);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
