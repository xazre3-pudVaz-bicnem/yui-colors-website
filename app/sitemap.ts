import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllPosts, getActiveCategories, getBlogPageNumbers } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticPages: MetadataRoute.Sitemap = [
    { path: "/", priority: 1.0, image: "/images/hero.jpg" },
    { path: "/experience", priority: 0.9, image: "/images/workshop-02.jpg" },
    { path: "/kids", priority: 0.8, image: "/images/kids.jpg" },
    { path: "/date", priority: 0.8, image: "/images/date.jpg" },
    { path: "/otsu-tourism", priority: 0.8, image: "/images/lake.jpg" },
    { path: "/beginner", priority: 0.7, image: "/images/workshop-01.jpg" },
    { path: "/access", priority: 0.8, image: "/images/access.jpg" },
    { path: "/faq", priority: 0.7 },
    { path: "/blog", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
  ].map(({ path, priority, image }) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority,
    ...(image ? { images: [`${base}${image}`] } : {}),
  }));

  const blogPagedPages: MetadataRoute.Sitemap = getBlogPageNumbers().map(
    (page) => ({
      url: `${base}/blog/page/${page}`,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })
  );

  const categoryPages: MetadataRoute.Sitemap = getActiveCategories().map(
    (category) => ({
      url: `${base}/blog/category/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })
  );

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T09:00:00+09:00`),
    changeFrequency: "yearly" as const,
    priority: 0.6,
    images: [`${base}${post.image}`],
  }));

  return [...staticPages, ...blogPagedPages, ...categoryPages, ...blogPages];
}
