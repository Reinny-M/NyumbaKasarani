// app/landlord/add/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CATEGORIES = [
  { value: "single", label: "Singles" },
  { value: "bedsitter", label: "Bedsitters" },
  { value: "one_bedroom", label: "One Bedroom" },
  { value: "two_bedroom", label: "Two Bedroom" },
  { value: "shop", label: "Shops" },
  { value: "office", label: "Offices" },
];

const AMENITY_OPTIONS = [
  "Security Guard",
  "Water Inclusive",
  "WiFi",
  "Electricity (Tokens)",
  "Parking",
  "Furnished",
];

export default function AddPropertyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [subLocations, setSubLocations] = useState<any[]>([]);
  const [form, setForm] = useState({
    title: "",
    category: "bedsitter",
    subLocationId: "",
    price: "",
    exactLocation: "",
    caretakerContact: "",
  });
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [otherAmenities, setOtherAmenities] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/sub-locations").then((res) => res.json()).then(setSubLocations);
  }, []);

  if (status === "loading") return <p className="p-6 text-gray-400">Loading...</p>;
  if (!session) {
    router.push("/login?callbackUrl=/landlord/add");
    return null;
  }

  function update(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleAmenity(item: string) {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError("");

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      const cloudForm = new FormData();
      cloudForm.append("file", file);
      cloudForm.append("upload_preset", uploadPreset!);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: cloudForm }
        );
        const data = await res.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          setError("Some images failed to upload. Please try again.");
        }
      } catch (err) {
        console.error("Cloudinary upload error:", err);
        setError("Upload failed. Check your connection and try again.");
      }
    }

    setImages((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
    e.target.value = "";
  }

  function removeImage(url: string) {
    setImages((prev) => prev.filter((img) => img !== url));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const otherList = otherAmenities.split(",").map((a) => a.trim()).filter(Boolean);

    const res = await fetch("/api/landlord/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        category: form.category,
        subLocationId: form.subLocationId,
        price: parseInt(form.price, 10),
        images,
        amenities: [...selectedAmenities, ...otherList],
        exactLocation: form.exactLocation,
        caretakerContact: form.caretakerContact,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong.");
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-md">
          <div className="text-4xl mb-4">✅</div>
          <h1 className="text-xl font-bold text-navy">Property Submitted!</h1>
          <p className="text-gray-500 text-sm mt-2">
            Your listing has been sent for review. It will appear publicly once approved by an admin.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-navy mb-1">Add Property</h1>
        <p className="text-gray-500 text-sm mb-6">
          Fill in the details below. Your listing will be reviewed before it goes live.
        </p>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Title (e.g. Cozy Bedsitter near School Gate)"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
            className="w-full rounded-full border border-gray-300 px-5 py-3"
          />

          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="w-full rounded-full border border-gray-300 px-5 py-3"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>

          <select
            value={form.subLocationId}
            onChange={(e) => update("subLocationId", e.target.value)}
            required
            className="w-full rounded-full border border-gray-300 px-5 py-3"
          >
            <option value="" disabled>Select Sub-Location</option>
            {subLocations.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Price (Ksh/month)"
            value={form.price}
            onChange={(e) => update("price", e.target.value)}
            required
            className="w-full rounded-full border border-gray-300 px-5 py-3"
          />

          {/* Image upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 px-1">
              Property Photos
            </label>
            <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-2xl py-8 cursor-pointer hover:border-teal-400 transition">
              <span className="text-3xl mb-2">📷</span>
              <span className="text-sm text-gray-500">
                {uploading ? "Uploading..." : "Tap to choose photos from your device"}
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
                className="hidden"
              />
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {images.map((url) => (
                  <div key={url} className="relative">
                    <img
                      src={url}
                      alt="Property"
                      className="w-full h-24 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(url)}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 px-1">
              Amenities
            </label>
            <div className="flex flex-wrap gap-2">
              {AMENITY_OPTIONS.map((item) => {
                const active = selectedAmenities.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleAmenity(item)}
                    className={`rounded-full px-4 py-2 text-sm font-medium border transition ${
                      active
                        ? "bg-brand-gradient text-white border-transparent"
                        : "bg-white text-gray-600 border-gray-300 hover:border-teal-400"
                    }`}
                  >
                    {active ? "✓ " : ""}
                    {item}
                  </button>
                );
              })}
            </div>
            <input
              placeholder="Other amenities, comma separated (optional)"
              value={otherAmenities}
              onChange={(e) => setOtherAmenities(e.target.value)}
              className="w-full rounded-full border border-gray-300 px-5 py-3"
            />
          </div>

          <input
            placeholder="Exact Location (shown only to subscribed tenants)"
            value={form.exactLocation}
            onChange={(e) => update("exactLocation", e.target.value)}
            required
            className="w-full rounded-full border border-gray-300 px-5 py-3"
          />

          <input
            placeholder="Caretaker Contact (shown only to subscribed tenants)"
            value={form.caretakerContact}
            onChange={(e) => update("caretakerContact", e.target.value)}
            required
            className="w-full rounded-full border border-gray-300 px-5 py-3"
          />

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-brand-gradient text-white rounded-full py-3 font-semibold disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit for Review"}
          </button>
        </form>
      </div>
    </main>
  );
}