// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-100">
      <Link href="/" className="flex items-center gap-2 font-bold text-navy text-lg">
        <svg width="28" height="24" viewBox="0 0 28 24" fill="none">
          <path d="M2 20L10 6L15 14L18 9L26 20H2Z" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinejoin="round" fill="none" />
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="0">
              <stop stopColor="#2563eb" />
              <stop offset="1" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
        </svg>
        NyumbaKasarani
      </Link>

      <nav className="hidden md:flex items-center gap-2">
        <Link href="/" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
          Home
        </Link>
        <Link href="/properties" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
          All Properties
        </Link>
        <Link href="/map" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
          Map Search
        </Link>
        <Link href="/pricing" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
          Pricing
        </Link>
        <Link href="/contact" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
          Contact Us
        </Link>
        <Link href="/how-it-works" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
          How It Works
        </Link>
        <Link
          href="/landlord"
          className="px-4 py-2 rounded-full text-sm font-semibold text-white bg-brand-gradient"
        >
          Landlord Portal
        </Link>
      </nav>

      <div className="flex items-center gap-3">
        <Link href="/notifications" aria-label="Notifications" className="text-xl">
          🔔
        </Link>
        {session ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-5 py-2 rounded-full bg-navy text-white text-sm font-semibold"
          >
            Sign Out
          </button>
        ) : (
          <Link
            href="/login"
            className="px-5 py-2 rounded-full bg-navy text-white text-sm font-semibold"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
