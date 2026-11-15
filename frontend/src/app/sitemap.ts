import { MetadataRoute } from "next";
import { getProducts } from "@/services/products.service";
import { getCategories } from "@/services/categories.service";
import { BLOG_POSTS } from "@/data/blog";
import { COLLECTIONS_DATA } from "@/data/collections";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bridesberry.com";
  const now = new Date();

  // Static essential marketing & policy routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/return-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // High-Intent Collection Landing Routes (Phase 3)
  const collectionRoutes: MetadataRoute.Sitemap = Object.keys(COLLECTIONS_DATA).map((slug) => ({
    url: `${baseUrl}/collections/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic Product routes
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productRoutes = products
      .filter((p) => p.slug && p.id !== "SKU-005")
      .map((p) => ({
        url: `${baseUrl}/product/${p.slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch (err) {
    console.error("Error generating product sitemap entries:", err);
  }

  // Dynamic Category routes
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await getCategories();
    categoryRoutes = categories
      .filter((c) => c.slug)
      .map((c) => ({
        url: `${baseUrl}/shop?category=${encodeURIComponent(c.slug)}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
  } catch (err) {
    console.error("Error generating category sitemap entries:", err);
  }

  // Dynamic Blog routes
  const blogRoutes: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt || now),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...collectionRoutes, ...categoryRoutes, ...productRoutes, ...blogRoutes];
}

