// app/(legal)/terms/page.tsx
export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-navy">Terms and Conditions</h1>
        <p className="text-sm text-gray-500 mt-2">Last Updated: August 2026</p>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">1. Acceptance of Terms</h2>
          <p className="text-gray-600 text-sm">
            By accessing or using NyumbaKasarani, you agree to be bound by these Terms and
            Conditions and our Privacy Policy. If you do not agree, please do not use the
            platform.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">2. What We Are</h2>
          <p className="text-gray-600 text-sm">
            NyumbaKasarani is a listing platform that connects tenants with landlords and
            caretakers around Kasarani TVC. We do not own, manage, or guarantee the availability
            of any property listed on the platform. Occupancy changes quickly — always confirm
            directly with the caretaker or landlord before making arrangements or visiting.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">3. Accounts</h2>
          <p className="text-gray-600 text-sm">
            You must provide accurate information when creating an account. You are responsible
            for maintaining the confidentiality of your login credentials and for all activity
            under your account.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">4. Subscriptions and Payments</h2>
          <p className="text-gray-600 text-sm">
            A Premium subscription unlocks caretaker contact details and exact property locations
            for all listings on the platform for the paid duration (7, 14, or 28 days). Payments
            are processed via M-Pesa. Subscriptions are non-transferable and do not renew
            automatically — you must subscribe again after expiry to continue accessing gated
            details.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">5. Landlord Listings</h2>
          <p className="text-gray-600 text-sm">
            Landlords submitting properties confirm that the information provided is accurate and
            that they have the right to list the property. Listings are subject to admin review
            and approval before appearing publicly.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">6. User Content</h2>
          <p className="text-gray-600 text-sm">
            Comments and ratings you submit may be publicly visible alongside your name. Content
            that is abusive, false, or violates these terms may be removed at our discretion.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">7. Limitation of Liability</h2>
          <p className="text-gray-600 text-sm">
            NyumbaKasarani is a listing service only. We are not responsible for the condition,
            legality, or availability of any listed property, or for any dealings between tenants
            and landlords.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">Contact Us</h2>
          <p className="text-gray-600 text-sm">
            Questions about these terms? Email us at{" "}
            <a href="mailto:reinhardcarlton5@gmail.com" className="text-blue-600 underline">
              reinhardcarlton5@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
