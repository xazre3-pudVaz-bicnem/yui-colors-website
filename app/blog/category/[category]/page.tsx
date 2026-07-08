import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BlogPostGrid from "@/components/ui/BlogPostGrid";
import CategoryNav from "@/components/ui/CategoryNav";
import ContactCta from "@/components/sections/ContactCta";
import { createMetadata } from "@/lib/meta";
import {
  categories,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/lib/blog";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const found = getCategoryBySlug(category);
  if (!found) return {};
  return createMetadata({
    title: `${found.name}の記事一覧｜お知らせ・ブログ`,
    description: `染 YUI COLORSのブログから「${found.name}」カテゴリの記事一覧。大津市・琵琶湖周辺の染め体験や観光に役立つ読みものをお届けします。`,
    path: `/blog/category/${found.slug}`,
  });
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const found = getCategoryBySlug(category);
  if (!found) notFound();

  const posts = getPostsByCategory(found.name);

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title={`「${found.name}」の記事`}
        lead={`大津・琵琶湖の旅や染め体験にまつわる読みもののうち、「${found.name}」に関する記事をまとめています。`}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "お知らせ・ブログ", href: "/blog" },
          { name: found.name, href: `/blog/category/${found.slug}` },
        ]}
      />

      <section className="bg-snow py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <CategoryNav current={found.slug} />
          <BlogPostGrid posts={posts} />
        </div>
      </section>

      <ContactCta />
    </>
  );
}
