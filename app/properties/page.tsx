// app/properties/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";

const CATEGORIES = [
  { value: "", label: "All Categories" },
  { value: "single", label: "Singles" },
  { value: "bedsitter", label: "Bedsitters" },
  { value: "one_bedroom", label: "One Bedroom" },
  { value: "two_bedroom", label: "Two Bedroom" },
  { value: "shop", label: "Shops" },
  { value: "office", label: "Offices" },
];

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [subLocationId, setSubLocationId] = useState(searchParams.get("subLocationId") || "");
  const [maxPrice, setMaxPrice] = useState("");
  const [subLocations, setSubLocations] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/api/sub-locations")
      .then((res) => res.json())
      .then(setSubLocations);
  }, []);

  async function fetchProperties(overrides?: { category?: string; subLocationId?: string; maxPrice?: string }) {
    setLoading(true);
    const params = new URLSearchParams();
    const c = overrides?.category ?? category;
    const s = overrides?.subLocationId ?? subLocationId;
    const m = overrides?.maxPrice ?? maxPrice;
    if (c) params.set("category", c);
    if (s) params.set("subLocationId", s);
    if (m) params.set("maxPrice", m);

    const res = await fetch(`/api/properties?${params.toString()}`);
    const data = await res.json();
    setProperties(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyFilters() {
    setShowModal(false);
    fetchProperties();
  }

  function clearFilters() {
    setCategory("");
    setSubLocationId("");
    setMaxPrice("");
    setShowModal(false);
    fetchProperties({ category: "", subLocationId: "", maxPrice: "" });
  }

  const activeFilterCount = [category, subLocationId, maxPrice].filter(Boolean).length;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-3xl font-bold text-navy text-center mb-6">All Properties</h1>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-navy block mb-1">Location</label>
            <select
              value={subLocationId}
              onChange={(e) => setSubLocationId(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-2"
            >
              <option value="">All Locations</option>
              {subLocations.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-navy block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-2"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-navy block mb-1">Max Price (Ksh)</label>
            <input
              type="number"
              placeholder="Any price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-2"
            />
          </div>
        </div>
        <button
          onClick={() => fetchProperties()}
          className="w-full mt-4 bg-brand-gradient text-white rounded-full py-3 font-semibold"
        >
          🔍 Search Properties
        </button>
      </div>

      <div className="max-w-4xl mx-auto flex items-center justify-between mb-6 text-sm text-gray-500">
        <span>🔽 {activeFilterCount === 0 ? "No active filters" : `${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} active`}</span>
        <button
          onClick={() => setShowModal(true)}
          className="bg-brand-gradient text-white rounded-full px-4 py-1.5 font-semibold"
        >
          ☰ Update
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-navy">Update Filters</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 text-xl">✕</button>
            </div>

            <label className="text-sm font-medium text-navy block mb-1">Location</label>
            <select
              value={subLocationId}
              onChange={(e) => setSubLocationId(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-2 mb-4"
            >
              <option value="">All Locations</option>
              {subLocations.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <label className="text-sm font-medium text-navy block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-2 mb-4"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            <label className="text-sm font-medium text-navy block mb-1">Max Price (Ksh)</label>
            <input
              type="number"
              placeholder="Any price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-4 py-2 mb-6"
            />

            <div className="flex gap-3">
              <button
                onClick={applyFilters}
                className="flex-1 bg-brand-gradient text-white rounded-full py-3 font-semibold"
              >
                Apply Filters
              </button>
              <button
                onClick={clearFilters}
                className="flex-1 border border-red-300 text-red-600 rounded-full py-3 font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : properties.length === 0 ? (
          <div className="text-center bg-white rounded-2xl p-8">
            <p className="text-gray-500">No properties match your search criteria. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
