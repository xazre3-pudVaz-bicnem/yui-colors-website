import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BlogPostGrid from "@/components/ui/BlogPostGrid";
import CategoryNav from "@/components/ui/CategoryNav";
import ContactCta from "@/components/sections/ContactCta";
import { createMetadata } from "@/lib/meta";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = createMetadata({
  title: "お知らせ・ブログ｜大津市の体験・観光コラム",
  description:
    "染 YUI COLORSのお知らせとブログ。大津市観光と染め体験の楽しみ方、親子で楽しめる体験教室、雨の日の屋内体験など、琵琶湖周辺の旅に役立つ読みものをお届けします。",
  path: "/blog",
  keywords: [
    "大津市 観光 ブログ",
    "大津市 体験 コラム",
    "琵琶湖 観光 体験",
  ],
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="お知らせ・ブログ"
        lead="工房からのお知らせと、大津・琵琶湖の旅や染め体験にまつわる読みものをお届けします。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "お知らせ・ブログ", href: "/blog" },
        ]}
      />

      <section className="bg-snow py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <CategoryNav />
          <BlogPostGrid posts={posts} />
        </div>
      </section>

      <ContactCta />
    </>
  );
}
