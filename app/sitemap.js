export default function sitemap() {
  const baseUrl = "https://recodey.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add additional routes here later as needed (e.g. /login, /register)
  ];
}
