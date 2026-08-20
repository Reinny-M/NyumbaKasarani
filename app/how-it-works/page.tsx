// app/how-it-works/page.tsx
import Link from "next/link";

const STEPS = [
  { num: 1, title: "Search", body: "Browse properties by location, category, or price around Kasarani TVC." },
  { num: 2, title: "Subscribe", body: "Pay Ksh 250 to unlock contact details and exact locations for one week." },
  { num: 3, title: "Contact", body: "Reach out to caretakers and schedule viewings directly." },
  { num: 4, title: "Move In", body: "Complete the process and move into your new home." },
];

const FAQS = [
  {
    q: "Do you own any of the listed houses?",
    a: "No. NyumbaKasarani is a listing platform that connects tenants with landlords and caretakers. We do not own any properties.",
  },
  {
    q: "Does one subscription unlock only one house?",
    a: "No. One payment unlocks all properties on the platform for one week. You can view as many as you like.",
  },
  {
    q: "How long does the subscription last?",
    a: "Each subscription lasts one week (7 days) from the time of payment. After that, you can subscribe again.",
  },
  {
    q: "What if a house is already occupied?",
    a: "Vacancy changes quickly. Contact the caretaker directly to confirm availability before visiting.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-navy text-center">How NyumbaKasarani Works</h1>
        <p className="text-gray-500 text-center mt-2">
          Your guide to finding the perfect rental home around Kasarani TVC
        </p>

        {/* Vacancy */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-10">
          <h2 className="text-xl font-bold text-navy mb-2">Vacancy & Availability</h2>
          <p className="text-gray-600 text-sm">
            We cannot guarantee that every listing on our platform is currently vacant. Occupancy
            changes faster than we can track — a house listed today may be taken tomorrow.
          </p>
          <p className="font-bold text-navy mt-3">Current estimated vacancy rate: 85%</p>
          <p className="text-gray-600 text-sm mt-2">
            Always confirm availability directly with the caretaker or landlord before making any
            arrangements.
          </p>
        </section>

        {/* Subscriptions */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
          <h2 className="text-xl font-bold text-navy mb-2">Subscriptions Explained</h2>
          <p className="text-gray-600 text-sm">
            A single subscription payment of <strong>Ksh 250</strong> gives you access to all
            properties on NyumbaKasarani for <strong>one week</strong>.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-gray-600">
            <li>✓ Unlock ALL caretaker phone numbers, ALL locations, and ALL property names</li>
            <li>✓ Contact landlords directly — no middleman fees</li>
            <li>✓ Browse unlimited properties during your subscription period</li>
          </ul>
          <Link
            href="/pricing"
            className="inline-block mt-5 bg-brand-gradient text-white rounded-full px-6 py-2.5 font-semibold"
          >
            View Pricing
          </Link>
        </section>

        {/* Steps */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-navy text-center mb-6">How to Get Started</h2>
          <div className="space-y-4">
            {STEPS.map((s) => (
              <div key={s.num} className="bg-white rounded-2xl shadow-sm p-6 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-brand-gradient text-white flex items-center justify-center font-bold">
                  {s.num}
                </div>
                <h3 className="font-bold text-navy mt-3">{s.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold text-navy mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <div key={f.q} className="bg-white rounded-2xl shadow-sm p-5">
                <p className="font-bold text-navy">{f.q}</p>
                <p className="text-gray-600 text-sm mt-1">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
