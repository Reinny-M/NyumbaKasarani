// app/(legal)/privacy/page.tsx
export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-navy">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mt-2">Last Updated: August 2026</p>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">1. Introduction</h2>
          <p className="text-gray-600 text-sm">
            NyumbaKasarani ("we," "us," or "our") is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you use our rental property listing platform. By accessing or using our
            services, you agree to the collection and use of information in accordance with this
            policy.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">2. Information We Collect</h2>
          <h3 className="font-semibold text-navy mt-4">2.1 Personal Information You Provide</h3>
          <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
            <li><strong>Account Information:</strong> Name, email address, password (encrypted)</li>
            <li><strong>Authentication Data:</strong> Google account information when you sign in with Google</li>
            <li><strong>Payment Information:</strong> M-Pesa transaction details, payment amounts, and dates (we do not store full payment credentials)</li>
            <li><strong>User Content:</strong> Property reviews, ratings, comments, and anything else you submit to the platform</li>
            <li><strong>Property Listings:</strong> If you are a landlord, the property details, images, location, and contact information you provide</li>
            <li><strong>Communications:</strong> Information you provide when contacting us for support</li>
          </ul>

          <h3 className="font-semibold text-navy mt-4">2.2 Information Collected Automatically</h3>
          <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
            <li>Device information (browser type, operating system)</li>
            <li>Usage data (pages visited, features used)</li>
            <li>Approximate location based on IP address</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">3. How We Use Your Information</h2>
          <p className="text-gray-600 text-sm">
            We use your information to provide and improve our platform, manage your account and
            subscription, process payments, communicate important updates, and moderate
            user-submitted content.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">4. How We Share Your Information</h2>
          <ul className="list-disc list-inside text-gray-600 text-sm mt-2 space-y-1">
            <li>With your explicit consent</li>
            <li>With service providers who support the platform (M-Pesa, Google, hosting, analytics)</li>
            <li>
              <strong>Public Content:</strong> Reviews and ratings you submit may be publicly
              visible to other users, with your name displayed alongside them
            </li>
            <li>When required by law or to protect our rights and the safety of our users</li>
          </ul>
          <p className="text-gray-600 text-sm mt-3">
            We do not share your personal contact information directly with landlords unless you
            choose to contact them independently.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">5. Data Retention</h2>
          <p className="text-gray-600 text-sm">
            We retain your personal information for as long as your account is active or as
            needed to provide you with our services, and as required to comply with legal
            obligations.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold text-navy mb-2">Contact Us</h2>
          <p className="text-gray-600 text-sm">
            Questions about this policy? Email us at{" "}
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
