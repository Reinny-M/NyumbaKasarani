// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-300 px-6 py-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-12">
        {/* Left: logo + description */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <svg width="56" height="48" viewBox="0 0 40 34" fill="none">
              <path
                d="M2 30L14 6L20 18L24 10L38 30H2Z"
                stroke="url(#footer-logo-grad)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                fill="none"
                style={{ filter: "drop-shadow(0 0 4px rgba(20,184,166,0.6))" }}
              />
              <defs>
                <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="40" y2="0">
                  <stop stopColor="#2dd4bf" />
                  <stop offset="1" stopColor="#4ade80" />
                </linearGradient>
              </defs>
            </svg>
            <p className="font-extrabold text-3xl tracking-wide">
              <span className="text-teal-400">NYUMBA</span>
              <span className="text-green-400">CHECK</span>
            </p>
          </div>
          <p className="text-sm text-gray-400 max-w-md leading-relaxed">
            At NyumbaCheck, we are committed to delivering the highest quality rental services.
            Our team works tirelessly to ensure your experience is seamless and satisfactory.
          </p>
        </div>

        {/* Right: get in touch */}
        <div>
          <p className="text-white font-bold tracking-wide">GET IN TOUCH</p>
          <div className="h-1 w-16 bg-brand-gradient rounded-full mt-2 mb-5" />

          <div className="flex items-center gap-3 text-sm mb-3">
            <span>📞</span>
            <span>+254 714 115 838</span>
          </div>
          <div className="flex items-center gap-3 text-sm mb-6">
            <span>✉️</span>
            <span>info@nyumbacheck.co.ke</span>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/reinhard-babere-a56a833b0/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.06c.53-1 1.83-2.06 3.76-2.06 4 0 4.75 2.6 4.75 6V23h-4v-6.7c0-1.6 0-3.7-2.25-3.7s-2.6 1.75-2.6 3.6V23h-4V8.5z"/></svg>
            </a>
            <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.6-2.4.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.7 11.7 0 0 1 3.4 4.7a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.8 2.9A8.3 8.3 0 0 1 2 18.6a11.7 11.7 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Terms / Privacy pill buttons */}
      <div className="flex items-center justify-center gap-4 mt-10">
        <Link
          href="/terms"
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-full px-5 py-2.5 text-sm font-medium text-gray-300 transition"
        >
          📄 Terms and Conditions
        </Link>
        <span className="text-gray-600">|</span>
        <Link
          href="/privacy"
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-full px-5 py-2.5 text-sm font-medium text-gray-300 transition"
        >
          🛡️ Privacy Policy
        </Link>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
        <span>Copyright © 2026 NyumbaCheck. All rights reserved.</span>
        <span className="flex items-center gap-3">
          Designed and Developed by{" "}
          <a
            href="https://www.linkedin.com/in/reinhard-babere-a56a833b0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-400 hover:underline font-medium"
          >
            Reinhard
          </a>
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-white"
            style={{ background: "linear-gradient(135deg, #2dd4bf, #4ade80)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 5.94 2 10.8c0 2.76 1.44 5.22 3.7 6.83-.12.98-.5 2.66-1.62 4.17 0 0 2.4-.24 4.44-1.98a11.6 11.6 0 0 0 3.48.53c5.52 0 10-3.94 10-8.8S17.52 2 12 2z" />
            </svg>
          </span>
        </span>
      </div>
    </footer>
  );
}