import React, { useState } from "react";
import { registerUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "EMPLOYEE",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            await registerUser({
                name: form.name,
                email: form.email,
                password: form.password
            });
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err: any) {
            setError(err.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full name"
                        className="w-full border px-3 py-2 rounded"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="w-full border px-3 py-2 rounded"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full border px-3 py-2 rounded"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="role"
                        className="w-full border px-3 py-2 rounded"
                        value={form.role}
                        onChange={handleChange}
                    >
                        <option value="EMPLOYEE">EMPLOYEE</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="CEO">CEO</option>
                    </select>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">{success}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-400"
                    >
                        {isLoading ? "Creating account..." : "Create account"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <a href="/login" className="text-indigo-600 hover:underline">
                        Sign in
                    </a>
                </p>
            </div>
        </div>
    );
}
