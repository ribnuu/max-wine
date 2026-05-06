"use client";
import { useState, useEffect } from "react";

export default function AdminAuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("mak@makwines.co.uk");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/verify")
      .then((res) => {
        if (res.ok) setIsAuthenticated(true);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setIsAuthenticated(true);
    } else {
      const data = await res.json().catch(() => ({ error: "Login failed" }));
      setError(data.error || "Login failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-lg w-96"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-[#660033]">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-1">Mak Wines Dashboard</p>
          </div>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent"
            required
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#660033] focus:border-transparent"
            required
            autoFocus={false}
            autoComplete="current-password"
          />
          <button
            type="submit"
            className="w-full bg-[#660033] text-white py-3 rounded font-medium hover:bg-[#550028] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
