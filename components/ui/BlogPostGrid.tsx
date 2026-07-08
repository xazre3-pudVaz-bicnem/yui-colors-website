import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { formatDate, type UnifiedPost } from "@/lib/blog";

/** ブログ一覧・カテゴリページ共通の記事カードグリッド */
export default function BlogPostGrid({ posts }: { posts: UnifiedPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="py-20 text-center text-sm text-ink/50">
        このカテゴリの記事は準備中です。
      </p>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
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
  );
}
