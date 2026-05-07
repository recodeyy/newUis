import { client } from '../sanity/lib/client';

export default async function sitemap() {
  const baseUrl = "https://recodey.com";

  // Fetch all blog post slugs from Sanity
  let blogEntries = [];
  try {
    const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);
    blogEntries = posts.map((post) => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: post._updatedAt ? new Date(post._updatedAt) : new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching posts for sitemap:", error);
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
