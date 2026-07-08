import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WaveDivider from "@/components/ui/WaveDivider";
import Flow from "@/components/sections/Flow";
import ContactCta from "@/components/sections/ContactCta";
import { createMetadata } from "@/lib/meta";
import { experiences, experienceNote } from "@/data/experiences";

export const metadata: Metadata = createMetadata({
  title: "体験内容｜大津市で楽しむ染め体験・ワークショップ",
  description:
    "染 YUI COLORSの体験内容のご案内。ハンカチやトートバッグなど、大津市・琵琶湖のほとりで楽しむ染色体験のメニューと流れをご紹介します。雨の日も屋内でゆっくり楽しめます。",
  path: "/experience",
  keywords: [
    "大津市 染め体験",
    "大津市 体験教室",
    "滋賀 染色体験",
    "大津市 ワークショップ",
    "大津市 雨の日 体験",
  ],
});

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="体験内容"
        lead="白い布に、自分で選んだ色を重ねていく。染 YUI COLORSの染め体験は、初めての方でもひとつずつ丁寧にご案内する、大津市・真野の小さなワークショップです。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "体験内容", href: "/experience" },
        ]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-16 px-5 md:space-y-24">
          {experiences.map((exp, index) => (
            <Reveal key={exp.slug}>
              <article
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-14 ${
                  index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <SmartImage
                  src={exp.image}
                  alt={exp.imageAlt}
                  className="aspect-[4/3] rounded-3xl"
                  sizes="(min-width: 768px) 45vw, 90vw"
                />
                <div>
                  <h2 className="font-serif text-xl leading-relaxed tracking-wide text-ink md:text-3xl">
                    {exp.title}
                  </h2>
                  <p className="mt-5 text-sm leading-loose text-ink/75 md:text-base">
                    {exp.description}
                  </p>
                  <ul className="mt-6 space-y-2">
                    {exp.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-baseline gap-3 text-sm text-ink/70"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-primary/50"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-7 space-y-2 rounded-2xl bg-base p-6 text-sm">
                    <div className="flex gap-5">
                      <dt className="w-20 shrink-0 text-ink/50">所要時間</dt>
                      <dd className="text-ink/80">{exp.duration}</dd>
                    </div>
                    <div className="flex gap-5">
                      <dt className="w-20 shrink-0 text-ink/50">料金</dt>
                      <dd className="text-ink/80">{exp.price}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <p className="mx-auto max-w-2xl text-center text-xs leading-relaxed text-ink/50">
              {experienceNote}
            </p>
          </Reveal>
        </div>
      </section>

      <WaveDivider fill="#eaf5fb" />
      <section className="lake-gradient py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <SectionHeading
              eyebrow="Indoor"
              title="雨の日も、屋内でゆっくり"
              lead="染め体験はすべて屋内で行います。大津市観光の予定が雨で変わった日も、天候を気にせず色と向き合う時間をお楽しみいただけます。夏の暑い日や冬の寒い日の観光の合間にもおすすめです。"
            />
          </Reveal>
        </div>
      </section>
      <WaveDivider fill="#f8fbfc" />

      <Flow />
      <ContactCta
        title="体験のご予約・ご相談"
        lead="メニューの詳細や当日の空き状況は、お電話にてお気軽にお問い合わせください。"
      />
    </>
  );
}
