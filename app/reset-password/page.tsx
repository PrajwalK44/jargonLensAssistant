"use client";
import { getBackendUrl } from "../../lib/api";


import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${getBackendUrl()}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Password reset successful! Please login.");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setError(data.message || "Password reset failed");
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
        onSubmit={handleReset}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Reset Password
        </h2>
        {error && (
          <div className="mb-4 text-yellow-500 text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-400 text-center">{success}</div>
        )}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-300">
            New Password
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
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
