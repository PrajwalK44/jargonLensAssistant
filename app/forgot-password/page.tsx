"use client";
import { getBackendUrl } from "../../lib/api";


import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(
        `${getBackendUrl()}/api/v1/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setSuccess("Password reset link sent to your email.");
      } else {
        setError(data.message || "Failed to send reset link");
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
        onSubmit={handleForgot}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Forgot Password
        </h2>
        {error && (
          <div className="mb-4 text-yellow-500 text-center">{error}</div>
        )}
        {success && (
          <div className="mb-4 text-green-400 text-center">{success}</div>
        )}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-300">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-700 rounded bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-gray-900 py-2 rounded font-semibold hover:bg-yellow-600 transition"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
