// app/properties/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeMsg, setSubscribeMsg] = useState("");

  async function handleSubscribe() {
    if (!session) {
      window.location.href = `/login?callbackUrl=/properties/${id}`;
      return;
    }
    if (!/^254\d{9}$/.test(phoneNumber)) {
      setSubscribeMsg("Enter phone as 2547XXXXXXXX (e.g. 254712345678).");
      return;
    }
    setSubscribing(true);
    setSubscribeMsg("");

    const res = await fetch("/api/mpesa/stkpush", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });
    const data = await res.json();
    setSubscribing(false);

    if (!res.ok) {
      setSubscribeMsg(data.error || "Something went wrong.");
      return;
    }
    setSubscribeMsg("Check your phone and enter your M-Pesa PIN to complete payment.");
  }

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      });
  }, [id]);

  async function handleClaim() {
    if (!session) {
      window.location.href = `/login?callbackUrl=/properties/${id}`;
      return;
    }
    setClaiming(true);
    const res = await fetch(`/api/properties/${id}/claim`, { method: "POST" });
    setClaiming(false);
    if (res.ok) setClaimed(true);
  }

  if (loading) return <p className="p-6 text-gray-400">Loading...</p>;
  if (!property || property.error) return <p className="p-6 text-red-600">Property not found.</p>;

  const isLocked = !property.exactLocation;
  const avgRating =
    property.ratings.length > 0
      ? (
          property.ratings.reduce((sum: number, r: any) => sum + r.stars, 0) /
          property.ratings.length
        ).toFixed(1)
      : "0";

  const images: string[] = property.images?.length > 0 ? property.images : [];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Photo gallery */}
      {images.length > 0 && (
        <div>
          <div className="relative w-full h-72 bg-gray-200">
            <img
              src={images[activeImage]}
              alt={`${property.title} photo ${activeImage + 1}`}
              className="w-full h-72 object-cover"
            />
            {images.length > 1 && (
              <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs rounded-full px-2 py-1">
                {activeImage + 1}/{images.length}
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 px-6 py-3 overflow-x-auto bg-white">
              {images.map((url, i) => (
                <button
                  key={url}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 rounded-lg overflow-hidden border-2 transition ${
                    i === activeImage ? "border-teal-500" : "border-transparent"
                  }`}
                >
                  <img
                    src={url}
                    alt={`${property.title} thumbnail ${i + 1}`}
                    className="w-20 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-teal-600">
            Ksh {property.price.toLocaleString()} <span className="text-sm text-gray-500">/month</span>
          </p>
          <span className="text-xs bg-blue-100 text-blue-700 rounded-full px-2 py-1">
            {property.category}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          ⭐ {avgRating} ({property.ratings.length})
        </p>
        {property.amenities?.length > 0 && (
          <div className="mt-6">
            <h2 className="font-bold text-navy mb-2">Amenities</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              {property.amenities.map((a: string) => (
                <p key={a}>{a}</p>
              ))}
            </div>
          </div>
        )}
        {isLocked ? (
          <div className="mt-6 bg-white rounded-2xl shadow-sm p-6 text-center">
            <p className="font-bold text-navy mb-1">Reveal premium details.</p>
            <p className="text-sm text-gray-500 mb-4">
              Reveal Everything for Just Ksh. 250 for 7 days.
            </p>
            {session ? (
              <>
                <input
                  type="tel"
                  placeholder="254712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-full border border-gray-300 px-5 py-3 mb-3 text-center"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={subscribing}
                  className="w-full bg-brand-gradient text-white rounded-full py-3 font-semibold disabled:opacity-60"
                >
                  {subscribing ? "Sending prompt..." : "Subscribe Now"}
                </button>
                {subscribeMsg && (
                  <p className="text-xs text-gray-500 mt-2">{subscribeMsg}</p>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={() => (window.location.href = `/login?callbackUrl=/properties/${id}`)}
                  className="w-full bg-brand-gradient text-white rounded-full py-3 font-semibold"
                >
                  Subscribe Now
                </button>
                <p className="text-xs text-gray-400 mt-2">You need to be logged in to subscribe.</p>
              </>
            )}
          </div>
        ) : (
          <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-navy mb-2">Contact Details</h2>
            <p className="text-sm text-gray-700">📍 {property.exactLocation}</p>
            <p className="text-sm text-gray-700">📞 {property.caretakerContact}</p>

            <div className="mt-4 pt-4 border-t border-gray-100">
              {claimed || property.pendingConfirmation ? (
                <p className="text-sm text-teal-600 font-medium text-center">
                  ✓ Landlord notified — awaiting their confirmation.
                </p>
              ) : (
                <button
                  onClick={handleClaim}
                  disabled={claiming}
                  className="w-full bg-white border border-teal-500 text-teal-600 rounded-full py-2.5 text-sm font-semibold disabled:opacity-60"
                >
                  {claiming ? "Notifying landlord..." : "✋ I've taken this house"}
                </button>
              )}
            </div>
          </div>
        )}
        <div className="mt-8">
          <h2 className="font-bold text-navy mb-2">Reviews & Comments</h2>
          <p className="text-sm text-gray-500 mb-4">Comments ({property.comments?.length || 0})</p>
          {(!property.comments || property.comments.length === 0) && (
            <p className="text-sm text-gray-400">No comments yet. Be the first to leave a comment!</p>
          )}
          {property.comments?.map((c: any) => (
            <div key={c.id} className="border-b border-gray-100 py-3">
              <p className="text-sm font-medium text-navy">{c.user.name}</p>
              <p className="text-sm text-gray-600">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
