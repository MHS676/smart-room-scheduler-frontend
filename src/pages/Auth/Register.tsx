// src/pages/Register.tsx
import { useState } from 'react';
import { registerUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(form);
            alert('Registration successful!');
            navigate('/login');
        } catch (err: any) {
            alert(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md p-6 rounded-lg w-96 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center">Register</h2>
                <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="border w-full p-2 rounded"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="border w-full p-2 rounded"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="border w-full p-2 rounded"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
