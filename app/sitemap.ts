import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllPosts, getActiveCategories } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { path: "/", priority: 1.0 },
    { path: "/experience", priority: 0.9 },
    { path: "/kids", priority: 0.8 },
    { path: "/date", priority: 0.8 },
    { path: "/otsu-tourism", priority: 0.8 },
    { path: "/beginner", priority: 0.7 },
    { path: "/access", priority: 0.8 },
    { path: "/faq", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
  ].map(({ path, priority }) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const categoryPages: MetadataRoute.Sitemap = getActiveCategories().map(
    (category) => ({
      url: `${site.url}/blog/category/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })
  );

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...blogPages];
}
