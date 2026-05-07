// app/layout.js
import { Space_Grotesk, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import PortraitWarning from "@/components/PortraitWarning";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://recodey.com"),
  title: {
    default: "Recodey | Architectural Tech Studio — Engineering. Design. AI.",
    template: "%s | Recodey",
  },
  description: "Recodey is an architectural tech studio forging deep-state software and cinematic identity for the next industrial era. Web platforms, brand identity, and AI integration.",
  keywords: ["tech studio", "web development", "AI integration", "brand identity", "software engineering", "digital agency", "Recodey"],
  authors: [{ name: "Recodey" }],
  creator: "Recodey",
  openGraph: {
    title: "Recodey | Architectural Tech Studio",
    description: "Recodey is an architectural tech studio forging deep-state software and cinematic identity for the next industrial era.",
    url: "https://recodey.com",
    siteName: "Recodey",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recodey | Architectural Tech Studio",
    description: "Engineering digital infrastructure, cinematic brand identity, and AI-powered solutions for the next industrial era.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Recodey",
  url: "https://recodey.com",
  description: "Architectural tech studio specializing in web platforms, brand identity, and AI integration.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "recodeyy@gmail.com",
    contactType: "customer service",
  },
  sameAs: [
    "https://instagram.com/recodeyy",
    "https://x.com/recodeyy",
    "https://linkedin.com/company/recodey",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrains.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <PageTransition>
          {children}
        </PageTransition>
        <PortraitWarning />
      </body>
    </html>
  );
}
