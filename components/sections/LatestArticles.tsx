import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { getAllPosts, formatDate } from "@/lib/blog";

/**
 * トップページ下部の「最新の読みもの」。
 * サイトで最も評価の集まるトップページからブログへ内部リンクを渡す。
 */
export default function LatestArticles({ limit = 3 }: { limit?: number }) {
  const posts = getAllPosts().slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            eyebrow="Journal"
            title="最新の読みもの"
            lead="大津・琵琶湖の旅や、染め体験の楽しみ方にまつわる読みものをお届けしています。"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 90}>
              <article className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink/5 bg-snow transition-shadow duration-300 hover:shadow-[0_8px_40px_-16px_rgba(15,88,153,0.25)]"
                >
                  <div className="overflow-hidden">
                    <SmartImage
                      src={post.image}
                      alt={post.imageAlt}
                      className="aspect-[16/10] transition-transform duration-700 group-hover:scale-105"
                      sizes="(min-width: 768px) 30vw, 90vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3 text-xs text-ink/50">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="rounded-full bg-mist px-3 py-1 text-primary/80">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="mt-3 font-serif text-base leading-relaxed tracking-wide text-ink">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-white px-8 py-3.5 text-sm tracking-wider text-primary transition-colors duration-300 hover:border-primary hover:bg-mist"
            >
              読みものを一覧で見る
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
