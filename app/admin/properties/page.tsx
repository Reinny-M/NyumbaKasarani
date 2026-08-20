// app/admin/properties/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPropertiesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingOn, setActingOn] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    const role = (session?.user as any)?.role;
    if (!session || role !== "admin") {
      router.push("/");
      return;
    }
    fetchPending();
  }, [session, status]);

  async function fetchPending() {
    setLoading(true);
    const res = await fetch("/api/admin/properties");
    const data = await res.json();
    setProperties(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function handleAction(id: string, newStatus: "approved" | "rejected") {
    setActingOn(id);
    await fetch(`/api/admin/properties/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setProperties((prev) => prev.filter((p) => p.id !== id));
    setActingOn(null);
  }

  if (status === "loading" || loading) {
    return <p className="p-6 text-gray-400">Loading...</p>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-navy mb-1">Pending Properties</h1>
        <p className="text-gray-500 text-sm mb-6">
          {properties.length} listing{properties.length !== 1 ? "s" : ""} awaiting review.
        </p>

        {properties.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-400">
            No pending properties right now.
          </div>
        ) : (
          <div className="space-y-4">
            {properties.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm p-6 flex gap-4">
                {p.images?.[0] && (
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-32 h-24 object-cover rounded-xl shrink-0"
                  />
                )}
                <div className="flex-1">
                  <h2 className="font-bold text-navy">{p.title}</h2>
                  <p className="text-sm text-gray-500">
                    {p.category} · Ksh {p.price?.toLocaleString()}/month
                  </p>
                  <p className="text-sm text-gray-500">
                    {p.subLocation?.name}, {p.subLocation?.location?.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Landlord: {p.landlord?.name} ({p.landlord?.email})
                  </p>
                  <p className="text-xs text-gray-400">
                    📍 {p.exactLocation} · 📞 {p.caretakerContact}
                  </p>
                  {p.amenities?.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      {p.amenities.join(", ")}
                    </p>
                  )}

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleAction(p.id, "approved")}
                      disabled={actingOn === p.id}
                      className="bg-[#14b8a6] text-white rounded-full px-5 py-2 text-sm font-semibold disabled:opacity-60"
                    >
                      {actingOn === p.id ? "..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleAction(p.id, "rejected")}
                      disabled={actingOn === p.id}
                      className="bg-red-100 text-red-700 rounded-full px-5 py-2 text-sm font-semibold disabled:opacity-60"
                    >
                      {actingOn === p.id ? "..." : "Reject"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
