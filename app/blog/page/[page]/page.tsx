import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BlogPostGrid from "@/components/ui/BlogPostGrid";
import CategoryNav from "@/components/ui/CategoryNav";
import Pagination from "@/components/ui/Pagination";
import ContactCta from "@/components/sections/ContactCta";
import { createMetadata } from "@/lib/meta";
import { getPaginatedPosts, getBlogPageNumbers } from "@/lib/blog";

type Props = {
  params: Promise<{ page: string }>;
};

export function generateStaticParams() {
  return getBlogPageNumbers().map((page) => ({ page: String(page) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const pageNumber = Number(page);
  if (!Number.isInteger(pageNumber) || pageNumber < 2) return {};

  return createMetadata({
    title: `お知らせ・ブログ（${pageNumber}ページ目）｜大津市の体験・観光コラム`,
    description: `染 YUI COLORSのお知らせとブログ ${pageNumber}ページ目。大津市観光と染め体験の楽しみ方、親子で楽しめる体験、雨の日の屋内体験など、琵琶湖周辺の旅に役立つ読みものをお届けします。`,
    path: `/blog/page/${pageNumber}`,
  });
}

export default async function BlogPagedPage({ params }: Props) {
  const { page } = await params;
  const pageNumber = Number(page);
  if (!Number.isInteger(pageNumber) || pageNumber < 2) notFound();

  const { posts, currentPage, totalPages } = getPaginatedPosts(pageNumber);
  if (pageNumber > totalPages) notFound();

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
          { name: `${pageNumber}ページ目`, href: `/blog/page/${pageNumber}` },
        ]}
      />

      <section className="bg-snow py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <CategoryNav />
          <BlogPostGrid posts={posts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
          />
        </div>
      </section>

      <ContactCta />
    </>
  );
}
