// app/pricing/page.tsx
import Link from "next/link";

const FREE_FEATURES = [
  { label: "Browse all properties", included: true },
  { label: "Search by category", included: true },
  { label: "Search by location", included: true },
  { label: "View property images", included: true },
  { label: "Comment on properties", included: true },
  { label: "Rate properties", included: true },
  { label: "Save favorites", included: true },
  { label: "Caretaker contacts (ALL properties)", included: false },
  { label: "Exact house locations (ALL properties)", included: false },
  { label: "View house name/details", included: false },
  { label: "Priority property alerts", included: false },
];

const PREMIUM_FEATURES = [
  "All caretaker contacts for ALL properties",
  "Exact house locations for ALL properties",
  "View full house name/details",
  "Priority property alerts",
];

const FAQS = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes! You can start with the Free plan and upgrade to Premium whenever you're ready. Your premium access begins immediately after payment.",
  },
  {
    q: "How long does Premium last?",
    a: "One payment of Ksh 250 unlocks ALL caretaker contacts and ALL exact house locations for one week (7 days). You can buy multiple weeks at a time.",
  },
  {
    q: "How do I earn a free week?",
    a: "After every 4 successful payments, you automatically earn 1 free week of Premium access. You can redeem it anytime — it never expires.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-navy text-white text-center px-6 py-14">
        <h1 className="text-3xl font-bold">Choose Your Plan</h1>
        <p className="text-gray-300 mt-2 max-w-xl mx-auto">
          One payment unlocks ALL caretaker contacts and ALL exact house locations for one week.
          No per-property fees.
        </p>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-8 grid md:grid-cols-2 gap-6 pb-16">
        {/* Free */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-navy">Free Plan</h2>
          <p className="text-gray-500 text-sm mt-1">Get started with basic access</p>
          <p className="text-3xl font-bold text-navy mt-4">
            Ksh 0 <span className="text-sm font-normal text-gray-400">/forever</span>
          </p>

          <p className="text-xs font-bold text-gray-400 mt-6 mb-2">WHAT'S INCLUDED</p>
          <ul className="space-y-2 text-sm">
            {FREE_FEATURES.map((f) => (
              <li key={f.label} className={f.included ? "text-gray-700" : "text-gray-300 line-through"}>
                {f.included ? "✓" : "✗"} {f.label}
              </li>
            ))}
          </ul>

          <Link
            href="/properties"
            className="block text-center mt-6 border border-navy text-navy rounded-full py-3 font-semibold"
          >
            Browse Properties →
          </Link>
        </div>

        {/* Premium */}
        <div className="relative bg-white rounded-2xl shadow-lg p-8 border-2 border-teal-400">
          <span className="absolute -top-3 right-6 bg-orange-500 text-white text-xs font-bold rounded-full px-3 py-1">
            Most Popular
          </span>
          <h2 className="text-xl font-bold text-navy">Premium Plan</h2>
          <p className="text-gray-500 text-sm mt-1">All caretaker contacts, all locations — one week</p>
          <p className="text-3xl font-bold text-navy mt-4">
            Ksh 250 <span className="text-sm font-normal text-gray-400">/week</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">2 weeks: Ksh 500 · 4 weeks: Ksh 1000</p>

          <p className="text-xs font-bold text-gray-400 mt-6 mb-2">EVERYTHING IN FREE, PLUS</p>
          <ul className="space-y-2 text-sm text-gray-700">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>

          <p className="text-xs text-teal-600 font-semibold mt-4">
            One subscription covers ALL properties — not just one.
          </p>

          <button className="w-full mt-6 bg-brand-gradient text-white rounded-full py-3 font-semibold">
            Get Premium →
          </button>
        </div>
      </div>

      {/* Bonus */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-8 text-center">
          <div className="text-3xl mb-2">🎁</div>
          <h2 className="text-xl font-bold text-navy">Bonus Plan – Earn a Free Week!</h2>
          <p className="text-gray-600 text-sm mt-2 max-w-lg mx-auto">
            Make 4 payments and get 1 week free of Premium access. Redeem it anytime you want — it
            never expires!
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <div key={f.q} className="bg-white rounded-2xl shadow-sm p-5">
              <p className="font-bold text-navy">{f.q}</p>
              <p className="text-gray-600 text-sm mt-1">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
