import React, { useState } from "react";
import { loginUser } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const response = await loginUser({
                email,
                password
            });
            console.log('Login Response:', response); // Debug login response
            login(response);
            console.log('Token after login:', localStorage.getItem('token')); // Debug token storage
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border px-3 py-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border px-3 py-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-400"
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-indigo-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
