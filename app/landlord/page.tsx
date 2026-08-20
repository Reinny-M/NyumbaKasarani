// app/landlord/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function LandlordPortalPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-brand-gradient text-white text-center px-6 py-14">
        <h1 className="text-3xl font-bold">Landlord Portal</h1>
        <p className="text-white/90 mt-2">Manage your properties or search for a house</p>
      </section>

      <div className="max-w-2xl mx-auto px-6 -mt-8 space-y-6 pb-16">
        {/* Search for Your House */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h2 className="text-xl font-bold text-navy">Search for Your House</h2>
          <p className="text-gray-500 text-sm mt-2">
            Find a property by name and verify your ownership using your phone number.
          </p>
          <button
            disabled
            className="w-full mt-6 bg-gray-100 text-gray-400 rounded-full py-3 font-semibold cursor-not-allowed"
          >
            ⏱ Search Portal Opening Soon
          </button>
        </div>

        {/* Add Property */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-4xl mb-4">➕</div>
          <h2 className="text-xl font-bold text-navy">Add Property</h2>
          <p className="text-gray-500 text-sm mt-2">
            List a new property for rent. Get your property seen by potential tenants.
          </p>
          {session ? (
            <Link
              href="/landlord/add"
              className="block w-full mt-6 bg-brand-gradient text-white rounded-full py-3 font-semibold"
            >
              Add Property
            </Link>
          ) : (
            <Link
              href="/login?callbackUrl=/landlord"
              className="block w-full mt-6 bg-brand-gradient text-white rounded-full py-3 font-semibold"
            >
              Sign In to Add Property
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
