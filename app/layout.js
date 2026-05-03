// app/layout.js
import { Bricolage_Grotesque, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
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
  title: "Recodey | Architectural Tech Studio",
  description: "Recodey is an architectural tech studio forging deep-state software and cinematic identity for the next industrial era.",
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
    description: "Recodey is an architectural tech studio forging deep-state software and cinematic identity for the next industrial era.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable} ${jakarta.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
