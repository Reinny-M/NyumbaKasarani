// app/map/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(() => import("@/components/PropertyMap"), { ssr: false });

export default function MapSearchPage() {
  const [subLocations, setSubLocations] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/sub-locations").then((res) => res.json()).then(setSubLocations);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white text-center px-6 py-10">
        <h1 className="text-2xl font-bold">Map Search</h1>
        <p className="text-gray-300 mt-1">
          Browse rental areas around Kasarani TVC on the map
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-xs text-gray-400 mb-3">
          Pins show approximate sub-location areas — tap a pin to view listings there.
        </p>
        {subLocations.length > 0 ? (
          <div className="rounded-2xl overflow-hidden shadow-sm">
            <PropertyMap subLocations={subLocations} />
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Loading map...</p>
        )}
      </div>
    </main>
  );
}
