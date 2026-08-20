// app/(auth)/signup/page.tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong.");
      setLoading(false);
      return;
    }

    // Auto sign-in right after account creation
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (signInResult?.ok) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-navy mb-6">Sign Up</h1>

        {error && (
          <p className="text-red-600 text-sm mb-4" role="alert">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-full border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-full border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-full border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-brand-gradient text-white font-semibold py-3 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 rounded-full border border-gray-300 py-3 font-medium hover:bg-gray-50"
        >
          Continue with Google
        </button>

        <p className="text-xs text-gray-500 mt-6 text-center">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="text-blue-600 underline">
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-blue-600 underline">
            Privacy Policy
          </Link>
          .
        </p>

        <p className="text-center mt-4 text-sm">
          Already have an Account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}
