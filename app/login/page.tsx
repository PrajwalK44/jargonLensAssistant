import { getBackendUrl } from "../../lib/api";
("use client");

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.append("username", email);
      params.append("password", password);
      const res = await fetch(`${getBackendUrl()}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      const data = await res.json();
      if (res.ok && data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/");
      } else {
        setError(data.detail || data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <form
        className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 text-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Login
        </h2>
        {error && (
          <div className="mb-4 text-yellow-500 text-center">{error}</div>
        )}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-300">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 py-2 rounded font-semibold hover:bg-yellow-600 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
