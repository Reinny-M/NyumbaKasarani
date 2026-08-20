// components/PropertyMap.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Fix default marker icons not loading under Next.js bundling
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Approximate pins around Kamulu, Nairobi (Kangundo Road corridor).
// These are placeholder coordinates, not surveyed GPS points — swap in
// real coordinates per sub-location once available.
const PINS: Record<string, [number, number]> = {
  "Kamulu Town": [-1.2833, 37.0333],
  "Reflector Inn": [-1.2818, 37.0355],
  "Around School Gate": [-1.2845, 37.0320],
  "Upper Waterfall": [-1.2795, 37.0370],
  "Near Waecon Supermarket": [-1.2860, 37.0300],
  "Kamulu Field": [-1.2810, 37.0340],
  "Sayendri": [-1.2870, 37.0385],
  "Near Cooperative Bank": [-1.2825, 37.0295],
};

export default function PropertyMap({ subLocations }: { subLocations: any[] }) {
  return (
    <MapContainer center={[-1.2833, 37.0333]} zoom={14} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {subLocations.map((s) => {
        const coords = PINS[s.name];
        if (!coords) return null;
        return (
          <Marker key={s.id} position={coords} icon={icon}>
            <Popup>
              <p className="font-bold">{s.name}</p>
              <Link href={`/properties?subLocationId=${s.id}`} className="text-blue-600 underline text-sm">
                View listings here →
              </Link>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
