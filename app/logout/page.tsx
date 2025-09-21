"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    localStorage.removeItem("token");
    router.push("/login");
  }, [router]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="bg-gray-800/60 backdrop-blur-xl border border-gray-700/50 text-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-yellow-400">
          Logging out...
        </h2>
        <p className="text-gray-300">You are being redirected to login.</p>
      </div>
    </div>
  );
}
