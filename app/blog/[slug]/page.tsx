import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import ContactCta from "@/components/sections/ContactCta";
import { JsonLd, articleJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/meta";
import { blogPosts, getPostBySlug, sortedPosts, formatDate } from "@/data/blog";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogImage: post.image,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <div className="lake-gradient pb-10 pt-32 md:pt-44">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <div className="flex items-center gap-3 text-xs text-ink/50">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="rounded-full bg-white px-3 py-1 text-primary/80">
                {post.category}
              </span>
            </div>
            <h1 className="mt-5 font-serif text-2xl leading-relaxed tracking-wide text-ink md:text-4xl md:leading-relaxed">
              {post.title}
            </h1>
          </Reveal>
        </div>
      </div>
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "お知らせ・ブログ", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <article className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <SmartImage
              src={post.image}
              alt={post.imageAlt}
              className="aspect-[16/9] rounded-3xl"
              sizes="(min-width: 768px) 45rem, 90vw"
            />
          </Reveal>
          <Reveal>
            <p className="mt-10 border-l-2 border-aisora pl-6 text-sm leading-loose text-ink/75 md:text-base">
              {post.lead}
            </p>
          </Reveal>
          {post.sections.map((section) => (
            <Reveal key={section.heading}>
              <section className="mt-12">
                <h2 className="font-serif text-xl leading-relaxed tracking-wide text-ink md:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-5">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 24)}
                      className="text-sm leading-loose text-ink/75 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}

          <Reveal>
            <div className="mt-16 rounded-3xl bg-mist p-8 md:p-10">
              <p className="font-serif text-lg tracking-wide text-ink">
                大津市・真野で染め体験を
              </p>
              <p className="mt-3 text-sm leading-loose text-ink/70">
                染 YUI
                COLORSは、琵琶湖のほとりで楽しむ染め体験教室です。観光の立ち寄りに、親子の時間に、ふたりのデートに。まずは体験内容をご覧ください。
              </p>
              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <Link
                  href="/experience"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  体験内容を見る
                </Link>
                <Link
                  href="/access"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  アクセスを見る
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <section className="bg-snow py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-8 text-center font-serif text-xl tracking-wide text-ink">
            あわせて読みたい
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group overflow-hidden rounded-3xl border border-ink/5 bg-white transition-shadow duration-300 hover:shadow-[0_8px_40px_-16px_rgba(15,88,153,0.25)]"
              >
                <SmartImage
                  src={relatedPost.image}
                  alt={relatedPost.imageAlt}
                  className="aspect-[16/10]"
                  sizes="(min-width: 768px) 30vw, 90vw"
                />
                <div className="p-6">
                  <time
                    dateTime={relatedPost.date}
                    className="text-xs text-ink/50"
                  >
                    {formatDate(relatedPost.date)}
                  </time>
                  <p className="mt-2 font-serif text-sm leading-relaxed tracking-wide text-ink">
                    {relatedPost.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
