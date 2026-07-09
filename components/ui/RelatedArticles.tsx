import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { getPostsByCategory, formatDate } from "@/lib/blog";

type RelatedArticlesProps = {
  /** 表示するカテゴリの日本語名（例: "親子"） */
  category: string;
  title?: string;
  limit?: number;
};

/**
 * 各ハブページの下部に置く「関連する読みもの」。
 * 指定カテゴリのブログ記事へ内部リンクし、回遊性とSEOを高める。
 * 記事が無いカテゴリでは何も表示しない。
 */
export default function RelatedArticles({
  category,
  title = "関連する読みもの",
  limit = 3,
}: RelatedArticlesProps) {
  const posts = getPostsByCategory(category).slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <section className="bg-snow py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-serif text-xl tracking-wide text-ink md:text-2xl">
              {title}
            </h2>
            <Link
              href="/blog"
              className="shrink-0 text-xs tracking-widest text-primary underline-offset-4 hover:underline"
            >
              ブログ一覧へ
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 90}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-white transition-shadow duration-300 hover:shadow-[0_8px_40px_-16px_rgba(15,88,153,0.25)]"
              >
                <SmartImage
                  src={post.image}
                  alt={post.imageAlt}
                  className="aspect-[16/10]"
                  sizes="(min-width: 768px) 30vw, 90vw"
                />
                <div className="flex flex-1 flex-col p-6">
                  <time dateTime={post.date} className="text-xs text-ink/50">
                    {formatDate(post.date)}
                  </time>
                  <p className="mt-2 font-serif text-sm leading-relaxed tracking-wide text-ink">
                    {post.title}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
