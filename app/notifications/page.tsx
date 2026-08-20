// app/notifications/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [tab, setTab] = useState<"recent" | "all">("recent");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      });
  }, []);

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const recent = notifications.filter((n) => new Date(n.createdAt) > oneDayAgo);
  const list = tab === "recent" ? recent : notifications;

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-navy">Notifications</h1>
        <p className="text-gray-500 mt-1">Stay updated with NyumbaKasarani</p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setTab("recent")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm ${
              tab === "recent" ? "bg-brand-gradient text-white" : "bg-white text-navy border border-gray-200"
            }`}
          >
            Recent ({recent.length})
          </button>
          <button
            onClick={() => setTab("all")}
            className={`px-6 py-2.5 rounded-full font-semibold text-sm ${
              tab === "all" ? "bg-brand-gradient text-white" : "bg-white text-navy border border-gray-200"
            }`}
          >
            All ({notifications.length})
          </button>
        </div>

        {!loading && list.length === 0 && (
          <div className="bg-white rounded-full px-5 py-3 mt-6 flex items-center gap-2 text-navy font-medium w-fit">
            🔔 {tab === "recent" ? "All caught up!" : "Nothing here yet"}
          </div>
        )}

        <div className="mt-16 flex flex-col items-center">
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : list.length === 0 ? (
            <>
              <div className="text-5xl text-gray-300">🔔</div>
              <p className="text-gray-400 mt-4">
                {tab === "recent" ? "No recent notifications" : "No notifications yet"}
              </p>
            </>
          ) : (
            <div className="w-full space-y-3">
              {list.map((n) => (
                <div key={n.id} className="bg-white rounded-2xl shadow-sm p-4">
                  <p className="text-sm text-navy">{n.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
