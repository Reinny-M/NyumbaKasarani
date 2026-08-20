# NyumbaKasarani

Rental property marketplace for the area around Kasarani TVC (Kamulu) — modeled on NyumbaCheck.

## Phase 1 — Database Schema & Seed Data (done)

This phase sets up:
- Full Prisma schema (`prisma/schema.prisma`) covering Users, two-tier Locations, Properties, Comments, Ratings, Favorites, Subscriptions, Payment logs, Notifications, and Suggestions
- Seed script (`prisma/seed.ts`) populating the initial Location ("Kasarani TVC (Kamulu)") and its 8 Sub-Locations

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.example` to `.env` and fill in real values:
```bash
cp .env.example .env
```

You'll need accounts/credentials from:
- **Neon** (neon.tech) → `DATABASE_URL`
- **Google Cloud Console** → `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- **Cloudinary** (cloudinary.com) → `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- **M-Pesa Daraja** (developer.safaricom.co.ke) → `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_PASSKEY`, `MPESA_SHORTCODE`

`NEXTAUTH_SECRET` is one you generate yourself — any long random string works, e.g.:
```bash
openssl rand -base64 32
```

### 3. Push the schema to your database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Seed the initial location data
```bash
npx prisma db seed
```

This creates:
- **Location:** Kasarani TVC (Kamulu)
- **Sub-Locations:** Kamulu Town, Reflector Inn, Around School Gate, Upper Waterfall, Near Waecon Supermarket, Kamulu Field, Sayendri, Near Cooperative Bank

### 5. Verify it worked
```bash
npx prisma studio
```
This opens a browser UI where you can see the seeded Location and SubLocation rows.

## Phase 2 — Account System (done)

Adds:
- Email/password Sign Up (`/signup`) and Login (`/login`), matching NyumbaCheck's confirmed modal fields
- Google OAuth ("Continue with Google") via NextAuth
- Forgot Password flow (`/forgot-password` → emailed link → `/reset-password`)
- NextAuth-required Prisma models (`Account`, `Session`, `VerificationToken`) plus a custom `PasswordResetToken` model

### New setup steps

1. **Re-run install** to pull in the new packages:
   ```bash
   npm install
   ```

2. **Push the updated schema** (adds the auth tables):
   ```bash
   npx prisma migrate dev --name add_auth
   ```
   (Make sure Cloudflare WARP is connected first — `warp-cli connect` — if you hit the same P1001 error as before.)

3. **Fill in more of your `.env`:**
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — from Google Cloud Console (see setup guide from Claude)

4. **Run the dev server:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000/signup` to test account creation, `/login` to test sign-in, `/forgot-password` to test the reset flow (the reset link prints to your terminal console for now — no real email service wired up yet).

### Known placeholder
The Forgot Password flow logs the reset link to the console instead of emailing it — a real email service (e.g. Resend, SendGrid) needs to be wired in before this goes live. Everything else in the flow (token generation, expiry, one-time use) is fully implemented.

## Phase 3 + 4 — Home Page, Search, Property Detail & Gating (done)

Adds:
- Real home page: hero, category grid, featured properties (`app/page.tsx`)
- Properties search/listing page with Category + Max Price filters (`/properties`)
- Property detail page: gallery, price, rating, amenities, comments, and the "Reveal premium details" subscribe CTA (`/properties/[id]`)
- `/api/properties` and `/api/properties/[id]` — both enforce gating **server-side** (`lib/gating.ts`) so locked fields (exact location, caretaker contact) are never sent to the client unless the user has an active subscription

### To test this phase
You'll need at least one **approved** property in the database to see anything besides empty states. Since the Landlord Portal (Phase 7) and Admin approval (Phase 8) aren't built yet, add a test property directly via Prisma Studio:

```bash
npx prisma studio
```
Open the `Property` table → click "Add record" → fill in a title, category, price, pick your seeded `subLocationId`, set `status` to `approved`, and add at least one image URL (any public image URL works for testing, e.g. from Unsplash). Save, then reload `http://localhost:3000`.

## What's next (Phase 5)
Comments, Ratings, Favorites — the logged-in tenant interaction features.

## Notes on the data model
- Comments and Ratings require a logged-in `User` — matches NyumbaCheck's confirmed behavior (public comments show the commenter's name).
- `exactLocation` and `caretakerContact` on `Property` are the gated fields — API routes built in later phases must strip these for any request without an active `Subscription`.
- `Subscription.isBonus` marks loyalty-earned free weeks (every 4 paid subscriptions = 1 free week, non-expiring).
- `PaymentLog.checkoutRequestId` is unique — used to make M-Pesa callback handling idempotent (a duplicate callback won't double-activate a subscription).

## Design update — Desktop layout match

Reworked the home page and added a shared `Navbar` component to match NyumbaCheck's actual desktop layout (confirmed via live screenshots): top nav with Home/All Properties/Map Search/Pricing/Contact Us/How It Works/Landlord Portal/notifications/Sign In, a hero with a location-picker search bar, photo-based category cards, a horizontal-scroll Featured Properties row, and a "Why Choose" section.

**Note:** `/map`, `/contact`, `/how-it-works`, `/landlord`, `/pricing`, `/notifications` are linked in the navbar but their pages aren't built yet — they'll 404 until later phases. This is expected for now; the Home page itself is fully wired to real data.

## Design polish pass

- Fixed font fallback (was rendering as a generic serif because Tailwind base wasn't loading a proper font) — now uses "Baloo 2", the rounded friendly font matching NyumbaCheck's look
- New `components/PropertyCard.tsx` — matches confirmed card layout: FEATURED badge, photo counter (1/N), category badge + location pin, price + "View Details →" button
- `/properties` page rebuilt: Location + Category + Max Price filters (3 fields, matching theirs), plus the "No active filters" / "Update" bar
- New `/api/sub-locations` route feeds the Location filter dropdown
- Added a small gradient mountain-mark icon next to the logo wordmark in the navbar

## Footer + Legal pages

- New `components/Footer.tsx` — global footer (logo, description, designer credit linking to LinkedIn, Facebook/Twitter icons as placeholders, contact info, Terms/Privacy links) — now appears on every page via `app/layout.tsx`
- `/terms` and `/privacy` pages built out with real content
- Contact info: 0798791235 / reinhardcarlton5@gmail.com

### Still placeholder
Facebook and Twitter icons in the footer link to `#` for now — swap in real profile URLs whenever you have them (just the `href="#"` in `components/Footer.tsx`).

## Landlord Portal

- `/landlord` — matches the confirmed two-card layout: "Search for Your House" (disabled, "Search Portal Opening Soon" — matches even NyumbaCheck's own unfinished state) and "Add Property" (gated behind sign-in, same as the real site)
- `/landlord/add` — the actual submission form for logged-in users: title, category, sub-location, price, image URL, amenities, exact location, caretaker contact
- `POST /api/landlord/properties` — creates the property with `status: "pending"` — it will NOT appear publicly until approved (Admin dashboard — next phase — is what flips it to `approved`)

### Known placeholder
The image field is a plain URL input for now, not a real upload. Real Cloudinary photo upload comes once Cloudinary keys are wired in — paste any public image URL to test in the meantime.

### To test
1. Make sure you're logged in (any account works)
2. Go to `http://localhost:3000/landlord` → click "Add Property"
3. Fill in the form, submit
4. It won't show on the site yet (status is `pending`) — verify it saved via `npx prisma studio`, or flip its status manually to `approved` there to see it appear

## How It Works, Pricing, Map Search

- `/how-it-works` — vacancy disclaimer (85% estimate), subscription explanation, 4-step "How to Get Started", FAQ — matches confirmed real-site content
- `/pricing` — Free plan (with strikethrough on gated features), Premium plan (Ksh 250/500/1000, "Most Popular" badge), Bonus loyalty plan, FAQ
- `/map` — real interactive map (Leaflet + OpenStreetMap, free, no API key) plotting your 8 sub-locations, tap a pin to jump to filtered listings

### New dependency — run this before testing
```bash
npm install
```
(adds `leaflet` and `react-leaflet` for the map)

### Known placeholder
Map pin coordinates are **approximate**, not surveyed GPS points — they're placed roughly around Kamulu based on general geography. Swap in real coordinates per sub-location later (either hardcode more accurately in `components/PropertyMap.tsx`, or add `lat`/`lng` columns to `SubLocation` in the schema for a proper long-term fix).

## Notifications page

- `/notifications` — matches confirmed layout: "Recent"/"All" tabs with live count badges, bell-icon empty state ("No recent notifications" / "All caught up!")
- `GET /api/notifications` — returns the logged-in user's notifications from the real `Notification` table (empty for now — nothing in the app creates notifications yet; that'll come naturally once things like subscription confirmations or listing approvals are wired up to insert them)

### Fixed: Neon connection stability
Also fixed in this batch — `lib/prisma.ts` now uses Neon's HTTP fetch mode instead of WebSockets, which was causing repeated "Connection terminated unexpectedly" errors under the WARP tunnel. If you see that error again, restart `npm run dev` fresh with WARP connected.
