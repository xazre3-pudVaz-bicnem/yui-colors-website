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
import {
  experiences,
  bengaraIntro,
  experienceNote,
  timeSlots,
  capacityNote,
  timeSlotNote,
} from "@/data/experiences";

export const metadata: Metadata = createMetadata({
  title: "体験内容｜べんがら染め体験3コース（1,500円〜）",
  description:
    "染 YUI COLORSのべんがら染め体験は3コース。簡単絞り染め（1,500円・5歳〜）、ストール染め、京都の伝統技法に挑戦する傘巻き絞り。作品は当日お持ち帰りいただけます。",
  path: "/experience",
  keywords: [
    "大津市 染め体験",
    "べんがら染め 体験",
    "大津市 体験教室",
    "滋賀 染色体験",
    "大津市 ワークショップ",
  ],
});

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="べんがら染め体験 3コース"
        lead={bengaraIntro}
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "体験内容", href: "/experience" },
        ]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl space-y-20 px-5 md:space-y-28">
          {experiences.map((exp, index) => (
            <Reveal key={exp.slug}>
              <article>
                <div
                  className={`grid items-center gap-10 md:grid-cols-2 md:gap-14 ${
                    index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <SmartImage
                      src={exp.image}
                      alt={exp.imageAlt}
                      className="aspect-[4/3] rounded-3xl"
                      sizes="(min-width: 768px) 45vw, 90vw"
                    />
                    {exp.subImage && exp.subImageAlt && (
                      <div className="mt-4 flex items-center gap-4">
                        <SmartImage
                          src={exp.subImage}
                          alt={exp.subImageAlt}
                          className="aspect-square w-24 shrink-0 rounded-2xl md:w-28"
                          sizes="7rem"
                        />
                        <p className="text-xs leading-relaxed text-ink/50">
                          {exp.subImageAlt}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-primary/60">
                      Course {exp.course}
                    </p>
                    <h2 className="mt-2 font-serif text-xl leading-relaxed tracking-wide text-ink md:text-3xl">
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
                    <dl className="mt-7 space-y-2 rounded-2xl bg-snow p-6 text-sm">
                      <div className="flex gap-5">
                        <dt className="w-20 shrink-0 text-ink/50">対象</dt>
                        <dd className="text-ink/80">{exp.target}</dd>
                      </div>
                      <div className="flex gap-5">
                        <dt className="w-20 shrink-0 text-ink/50">体験料</dt>
                        <dd className="text-ink/80">{exp.price}</dd>
                      </div>
                      <div className="flex gap-5">
                        <dt className="w-20 shrink-0 text-ink/50">所要時間</dt>
                        <dd className="text-ink/80">{exp.duration}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="mt-10 rounded-3xl border border-ink/5 bg-snow p-7 md:p-9">
                  <h3 className="font-serif text-base tracking-wide text-ink md:text-lg">
                    体験のながれ
                  </h3>
                  <ol className="mt-5 space-y-3">
                    {exp.steps.map((step, stepIndex) => (
                      <li
                        key={step}
                        className="flex items-baseline gap-4 text-sm leading-relaxed text-ink/75"
                      >
                        <span className="shrink-0 font-serif text-xs tracking-widest text-primary">
                          {String(stepIndex + 1).padStart(2, "0")}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
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
              eyebrow="Schedule"
              title="開催時間・ご参加人数"
              lead="時間枠は1日4枠。ご予約の際に、ご希望の枠と人数をお知らせください。"
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3">
              {timeSlots.map((slot, index) => (
                <div
                  key={slot}
                  className="flex items-baseline gap-3 rounded-full bg-white px-7 py-3"
                >
                  <span className="font-serif text-xs tracking-widest text-primary/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-lg tracking-widest text-ink">
                    {slot}
                  </span>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-xl text-center text-sm leading-loose text-ink/70">
              {capacityNote}
            </p>
            <p className="mx-auto mt-3 max-w-xl text-center text-xs leading-relaxed text-ink/50">
              {timeSlotNote}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
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
        lead="コース選びに迷ったら、お気軽にお電話ください。人数やご予定に合わせてご案内します。"
      />
    </>
  );
}
