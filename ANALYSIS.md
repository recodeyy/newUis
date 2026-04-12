# Recody Project Analysis

Date: 2026-04-12

## Overview
- Single-page marketing site built on Next.js 14 App Router.
- UI is organized into feature sections assembled in a single client component.
- Tailwind CSS v4 for styling, Framer Motion for animation, Firebase for waitlist storage.

## Tech Stack
- Framework: Next.js 14 (App Router)
- UI: React 18, Tailwind CSS v4, Framer Motion
- Icons: lucide-react
- Data: Firebase Firestore (waitlist)

## Runtime Structure
- Entry: app/page.js renders components/RecodyLanding.jsx.
- Layout: app/layout.js provides HTML shell, global font, and app/globals.css.
- Styling: global reset + Tailwind via @import in app/globals.css.
- Content: sections are pure React components with Tailwind classes.

## File Map and Responsibilities
### App
- app/layout.js
  - Defines HTML shell, metadata, and Google Fonts import.
- app/page.js
  - Home route only; mounts RecodyLanding.
- app/globals.css
  - CSS reset, base body styles, scrollbar styling, selection color.

### Components
- components/RecodyLanding.jsx
  - Top-level client component and single-page composition.
  - Owns loading state, scroll tracking, and cursor effects.
  - Includes Navbar, Hero, Stats, Products, Platform, CTA, Contact, Footer.

### Sections
- components/sections/Hero.jsx
  - Primary headline, subheading, CTA button.
  - Attempts to submit email to Firebase waitlist (no input field).
- components/sections/Stats.jsx
  - Four stat cards; reveal animations on scroll.
- components/sections/Products.jsx
  - Services cards; uses PuffyEye decorative component.
- components/sections/Platform.jsx
  - Three-step process cards.
- components/sections/CTA.jsx
  - Reviews grid and FAQ accordion.
- components/sections/Contact.jsx
  - Contact info and static contact form; newsletter subscription UI.
- components/sections/Footer.jsx
  - Footer links and credits.
- components/sections/Navbar.jsx
  - Fixed navbar with desktop pill menu and mobile overlay.

### UI Components
- components/ui/CustomCursor.jsx
  - Motion-based cursor and hover glow effect.
- components/ui/LoadingScreen.jsx
  - Full-screen loading overlay driven by parent state.
- components/ui/GlitchText.jsx
  - Hover scramble animation; currently unused.
- components/ui/FloatingElement.jsx
  - Scroll-parallax wrapper; currently unused.
- components/ui/PuffyEye.jsx
  - Interactive eye that follows cursor; used in Products.

### Hooks
- components/hooks/useParallax.js
  - Tracks mouse position for parallax effects.
- components/hooks/useScrollReveal.js
  - IntersectionObserver-based reveal control.

### Data
- lib/firebase.js
  - Firebase initialization and Firestore write helper.
  - saveWaitlistEmail() stores email + source + timestamp.

### Config and Metadata
- package.json
  - Scripts for dev/build/start/lint; Tailwind and Firebase dependencies.
- tailwind.config.js
  - Content scanning for app/ and components/ only.
- postcss.config.js
  - Tailwind v4 PostCSS plugin.
- jsconfig.json
  - Path alias @/* to project root.
- public/robots.txt and public/sitemap.xml
  - SEO crawl + sitemap.

## UI Flow and Data Flow
- Page loads -> LoadingScreen for 2 seconds -> main UI visible.
- Navbar appearance changes after scrollY > 20.
- Scroll-triggered sections reveal using useScrollReveal().
- Hero CTA calls saveWaitlistEmail(), which writes to Firestore.

## Observations and Potential Issues
- Hero CTA has no email input, so saveWaitlistEmail() never runs.
- Navbar links include team, pricing, FAQ (uppercase) but sections for team/pricing do not exist and FAQ id is lowercase in CTA.
- RecodyLanding applies font-['DM_Sans'] but only Inter is loaded in layout.
- LoadingScreen uses custom animation class names but no @keyframes are defined in globals.css.
- Some components (GlitchText, FloatingElement) are unused.

## Suggested Next Improvements
- Add an email input to Hero or repurpose CTA to a simple contact button.
- Align navbar anchors to existing section ids and normalize casing.
- Add missing keyframes for loading animations or replace with built-in motion.
- Load DM Sans if it is intended, or remove the font override.
- Decide whether unused UI components are needed, or remove to reduce bundle size.

## How to Run
- npm install
- npm run dev

## Deployment Notes
- README mentions adding public/og-image.jpg and updating metadataBase in app/layout.js.
- Firebase Firestore rules should allow create-only for waitlist collection.

## Recent Modifications
- Overhauled the Tailwind CSS implementation to support v4 properly via `@import "tailwindcss";` in `globals.css` and removed outdated directives.
- Transformed the monolithic aesthetic into the requested clean minimalist "Halo AI" theme involving dark/pill-shaped components, pure black backgrounds, and subtle blue glows.
- Switched the hero typography to standard Inter removing the Glitch effect.
- Created `Contact.jsx` for the Newsletter and Contacts sections, mirroring the supplied wireframes.
- Integrated an interactive 3D Spline background into `Hero.jsx` using `@splinetool/react-spline/next` and `@splinetool/runtime`, maintaining interactive layers by manipulating `pointer-events`.

## Uncommitted Change Map (Line-by-line)
Scope: local uncommitted changes in the current workspace.

- README.md
  - Line 1: "Recody" -> "Recodey" in the title.
- app/layout.js
  - Line 5: metadata title updated to "Recodey".
- components/sections/CTA.jsx
  - Lines 8-10: review copy updated to "Recodey".
  - Line 15: FAQ question updated to "Recodey".
- components/sections/Contact.jsx
  - Line 10: form state adds `subject` field.
  - Line 12: `loading` state added.
  - Lines 14-38: `handleSend` now async, posts to `/api/contact`, toggles loading, and handles failure fallback.
  - Line 95: subject input now bound to form state.
  - Line 105: submit button disabled when loading.
  - Line 107: submit button hover style added.
  - Line 110: submit button label toggles to "Sending..." while loading.
- components/sections/Footer.jsx
  - Line 13: brand text updated to "Recodey".
  - Lines 36-40: footer credits replaced with Contact email link.
- components/sections/Hero.jsx
  - Line 6: added `AnimatedText` import.
  - Lines 54-59: headline replaced with `AnimatedText` component.
  - Line 63: hero paragraph size now responsive.
  - Line 65: hero copy updated.
- components/sections/Navbar.jsx
  - Line 47: brand text updated to "Recodey".
- components/ui/team-showcase.jsx
  - Line 70: heading updated to "Recodey".
- components/ui/animated-underline-text-one.jsx (new)
  - Lines 1-90: animated underline text component using Framer Motion.
- app/api/contact/route.js (new)
  - Lines 1-50: Nodemailer POST route that sends contact form emails.
- package.json
  - Line 21: added `nodemailer` dependency.
- package-lock.json
  - Line 20: added `nodemailer` to dependencies list.
  - Lines 5271-5279: added `nodemailer` package metadata.
