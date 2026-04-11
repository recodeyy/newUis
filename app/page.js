// app/page.js
// This is the home page route ( / ).
// It's a Server Component by default in Next.js App Router,
// but we import the client component which handles all interactivity.

import RecodyLanding from "@/components/RecodyLanding";

export default function HomePage() {
  return <RecodyLanding />;
}
