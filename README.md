# Recody — Next.js Landing Page

Premium landing page built with **Next.js 14 App Router** + **Firebase Firestore** waitlist.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run in development
npm run dev

# 3. Open in browser
# http://localhost:3000
```

## Deploy to Vercel (Free, 2 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts — it auto-detects Next.js
```

Your site will be live at a `.vercel.app` URL instantly.
Then add your custom domain `recody.in` in the Vercel dashboard.

## File Structure

```
recody/
├── app/
│   ├── layout.js         ← SEO metadata (title, OG, Twitter, JSON-LD)
│   ├── page.js           ← Home route  /
│   └── globals.css       ← Animations & global styles
├── components/
│   └── RecodyLanding.jsx ← All UI components
├── lib/
│   └── firebase.js       ← Firebase config + saveWaitlistEmail()
├── public/
│   ├── robots.txt        ← Google crawler rules
│   ├── sitemap.xml       ← Sitemap for indexing
│   └── og-image.jpg      ← Add this! (1200×630px social preview image)
├── jsconfig.json         ← @ path alias
├── next.config.js
└── package.json
```

## After Deploying — SEO Checklist

1. **Add OG image** — Place a `1200×630px` image at `public/og-image.jpg`

2. **Update your domain** in `app/layout.js`:
   ```js
   metadataBase: new URL("https://recody.in"),
   ```

3. **Submit to Google Search Console**
   - Go to https://search.google.com/search-console
   - Add property → enter `recody.in`
   - Verify via DNS TXT record
   - Submit sitemap: `https://recody.in/sitemap.xml`

4. **Restrict your Firebase API key** (important!)
   - Go to https://console.cloud.google.com
   - APIs & Services → Credentials → click your API key
   - Under "Application restrictions" → select "HTTP referrers"
   - Add: `recody.in/*` and `www.recody.in/*`
   - Save

## Firebase — View Waitlist Emails

1. Go to https://console.firebase.google.com
2. Select project `blogo-583c6`
3. Firestore Database → `waitlist` collection
4. All submitted emails are there with timestamp

## Firebase Security Rules

In Firebase Console → Firestore → Rules, set this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /waitlist/{doc} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

This lets anyone submit their email but only you can view them via the console.
