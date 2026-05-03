export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // Prevent crawling of internal APIs if any
    },
    sitemap: "https://recodey.com/sitemap.xml",
  };
}
