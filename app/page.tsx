// app/page.tsx — redesigned to match NyumbaCheck's confirmed desktop layout
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { hasActiveSubscription, applyGating } from "@/lib/gating";
import PropertyCard from "@/components/PropertyCard";

const CATEGORIES = [
  { value: "single", label: "Singles", image: "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=400&h=300&fit=crop" },
  { value: "bedsitter", label: "Bedsitters", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop" },
  { value: "one_bedroom", label: "One Bedroom", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop" },
  { value: "two_bedroom", label: "Two Bedroom", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop" },
  { value: "shop", label: "Shops", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop" },
  { value: "office", label: "Offices", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop" },
];

const WHY_CHOOSE = [
  { icon: "🏠", title: "Verified Houses", body: "All properties are verified by our team to ensure quality and authenticity" },
  { icon: "📍", title: "Exact Location", body: "Get precise location details after subscription for easy navigation" },
  { icon: "📇", title: "Caretaker Contact", body: "Direct contact with caretakers after subscription for quick viewing" },
  { icon: "✅", title: "Properties", body: "Wide selection of properties from singles to offices around Kasarani TVC" },
];

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;
  const unlocked = await hasActiveSubscription(userId);

  const subLocations = await prisma.subLocation.findMany({ orderBy: { name: "asc" } });

  const featured = await prisma.property.findMany({
    where: { status: "approved" },
    include: { subLocation: true },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
    take: 8,
  });
  const gatedFeatured = featured.map((p) => applyGating(p, unlocked));

  return (
    <main className="bg-gray-50">
      {/* Hero */}
      <section className="relative bg-navy text-white text-center px-6 py-20">
        <h1 className="text-4xl font-bold">Find Rental Houses around Kasarani TVC</h1>
        <p className="text-gray-300 mt-3">Verified rentals for students and professionals</p>

        <form action="/properties" className="mt-8 max-w-xl mx-auto bg-white rounded-full flex items-center p-2 shadow-lg">
          <select
            name="subLocationId"
            className="flex-1 text-navy px-4 py-2 rounded-full bg-transparent focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>Select a Location</option>
            {subLocations.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button type="submit" className="bg-brand-gradient text-white rounded-full px-6 py-2 font-semibold">
            Search
          </button>
        </form>
      </section>

      {/* Category grid with photos */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-navy text-center mb-8">What Are You Looking For?</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.value} href={`/properties?category=${cat.value}`} className="group">
              <div className="rounded-xl overflow-hidden shadow-sm">
                <img src={cat.image} alt={cat.label} className="w-full h-28 object-cover group-hover:scale-105 transition" />
              </div>
              <p className="text-center mt-2 font-medium text-navy text-sm">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured properties — horizontal scroll */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-2xl font-bold text-navy">Featured Properties</h2>
          <Link href="/properties" className="text-sm font-semibold bg-brand-gradient text-white rounded-full px-4 py-2">
            View All →
          </Link>
        </div>
        <p className="text-gray-500 text-sm mb-6">Hand-picked rental properties around Kasarani TVC</p>

        {gatedFeatured.length === 0 ? (
          <p className="text-gray-400 text-sm">No properties yet — check back soon.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {gatedFeatured.map((p) => (
              <div key={p.id} className="min-w-[260px]">
                <PropertyCard property={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-navy text-center">Why Choose NyumbaKasarani</h2>
        <p className="text-gray-500 text-center mb-8">We make finding your next home simple and reliable</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {WHY_CHOOSE.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className="font-bold text-navy">{f.title}</p>
              <p className="text-sm text-gray-500 mt-1">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-gradient text-white text-center px-6 py-16">
        <h2 className="text-2xl font-bold">Ready to Find Your Perfect Home?</h2>
        <p className="mt-2 text-white/90">Start your search today around Kasarani TVC</p>
        <Link href="/properties" className="inline-block mt-6 bg-white text-navy rounded-full px-6 py-3 font-semibold">
          Start Searching →
        </Link>
      </section>
    </main>
  );
}
