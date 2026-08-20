// app/(auth)/forgot-password/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Reset Password</h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {message && <p className="text-sm text-gray-700 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-full border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-gradient text-white font-semibold py-3 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          <Link href="/login" className="text-blue-600 font-semibold">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}
