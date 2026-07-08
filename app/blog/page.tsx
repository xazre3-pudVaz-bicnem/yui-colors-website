import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import ContactCta from "@/components/sections/ContactCta";
import { createMetadata } from "@/lib/meta";
import { sortedPosts, formatDate } from "@/data/blog";

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
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedPosts.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 90}>
              <article className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white transition-shadow duration-300 hover:shadow-[0_8px_40px_-16px_rgba(15,88,153,0.25)]"
                >
                  <div className="overflow-hidden">
                    <SmartImage
                      src={post.image}
                      alt={post.imageAlt}
                      className="aspect-[16/10] transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3 text-xs text-ink/50">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="rounded-full bg-mist px-3 py-1 text-primary/80">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="mt-4 font-serif text-lg leading-relaxed tracking-wide text-ink">
                      {post.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-loose text-ink/60">
                      {post.description}
                    </p>
                    <p className="mt-auto pt-5 text-xs tracking-widest text-primary">
                      続きを読む
                    </p>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}
