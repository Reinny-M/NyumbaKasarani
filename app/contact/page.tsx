// app/contact/page.tsx
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm({ fullName: "", email: "", phone: "", message: "" });
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-3xl font-bold text-blue-700">Contact Us</h1>
          <div className="h-1 w-16 bg-brand-gradient rounded-full mt-2 mb-8" />

          <div className="border border-gray-200 rounded-xl p-6 mb-4">
            <p className="font-bold text-blue-600 mb-1">Phone Number:</p>
            <p className="text-gray-700">0798791235</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6 mb-4">
            <p className="font-bold text-blue-600 mb-1">Business Email:</p>
            <p className="text-gray-700">reinhardcarlton5@gmail.com</p>
          </div>

          <div className="border border-gray-200 rounded-xl p-6">
            <p className="font-bold text-blue-600 mb-4">Follow Us</p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-blue-600">Facebook</a>
              <a href="#" className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-blue-600">X</a>
              <a href="https://www.linkedin.com/in/reinhard-babere-a56a833b0/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-blue-600">LinkedIn</a>
              <a href="#" className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-blue-600">Instagram</a>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-blue-700">Contact Form</h1>
          <div className="h-1 w-16 bg-brand-gradient rounded-full mt-2 mb-8" />

          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <p className="font-bold text-green-700">Message sent!</p>
              <p className="text-sm text-green-600 mt-1">We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && <p className="text-red-600 text-sm">{error}</p>}

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Full Name</label>
                <input
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Enter your name"
                  required
                  className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Phone Number</label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Enter your message"
                  required
                  rows={5}
                  className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-brand-gradient text-white rounded-full py-3 font-semibold disabled:opacity-60"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
