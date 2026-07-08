import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WaveDivider from "@/components/ui/WaveDivider";
import FaqAccordion from "@/components/ui/FaqAccordion";
import ContactCta from "@/components/sections/ContactCta";
import { JsonLd, faqJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/meta";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = createMetadata({
  title: "親子・お子さまと｜大津市で子供と楽しむ染め体験",
  description:
    "大津市で子供と一緒に楽しめる体験をお探しの方へ。染 YUI COLORSの染め体験は、親子で参加できる屋内の体験教室です。色を選び、布を染める時間が、親子の思い出になります。",
  path: "/kids",
  keywords: [
    "大津市 子供 体験",
    "大津市 親子 体験",
    "大津市 体験教室",
    "親子で楽しめる 大津市 体験",
  ],
});

const kidsFaq = faqItems.filter((item) => item.category === "子供・親子");

const kidsPoints = [
  {
    title: "色を選ぶところから、子供の体験",
    description:
      "好きな色をひとつ選ぶ。それだけで、子供の目は輝きます。自分で選んだ色が布に染み込んでいく瞬間は、図工の授業とも遊び場とも違う、静かな驚きに満ちた時間です。",
  },
  {
    title: "正解のないものづくり",
    description:
      "染めもののにじみやむらは、失敗ではなく味わいです。上手にできたかどうかを気にせず、その子だけの一枚を仕上げられます。ものづくりが苦手なお子さまにも安心です。",
  },
  {
    title: "親子で並んで、手を動かす",
    description:
      "隣に並んで、それぞれの布に色を重ねる。手を動かしながら生まれる会話は、日常ではなかなか持てない親子の時間です。仕上がった作品を見比べるのも楽しみのひとつです。",
  },
  {
    title: "屋内だから、天気を選ばない",
    description:
      "体験はすべて屋内で行います。雨の日、暑い日、寒い日でも、大津市で子供と過ごせる行き先として計画しやすいのが染め体験の良いところです。",
  },
];

export default function KidsPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(kidsFaq)} />
      <PageHero
        eyebrow="With Kids"
        title="親子・お子さまと"
        lead="小さな手で色を選び、布を染める。大津市・真野の染め体験は、親子で一緒に楽しめる屋内の体験教室です。持ち帰った一枚が、家に帰ったあとも続く思い出になります。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "親子・お子さまと", href: "/kids" },
        ]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SmartImage
              src="/images/kids.jpg"
              alt="親子で一緒に布を染めている体験の様子"
              className="aspect-[16/9] rounded-3xl md:aspect-[21/9]"
              sizes="(min-width: 768px) 90vw, 100vw"
            />
          </Reveal>
          <div className="mt-16">
            <Reveal>
              <SectionHeading
                eyebrow="Points"
                title="親子の染め体験、4つの楽しみ"
              />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {kidsPoints.map((point, index) => (
                <Reveal key={point.title} delay={index * 90}>
                  <div className="h-full rounded-3xl border border-ink/5 bg-base p-8">
                    <h3 className="font-serif text-lg leading-relaxed tracking-wide text-ink">
                      {point.title}
                    </h3>
                    <p className="mt-3 text-sm leading-loose text-ink/70">
                      {point.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider fill="#eaf5fb" />
      <section className="lake-gradient py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="子供連れの方によくいただく質問"
            />
          </Reveal>
          <Reveal delay={100}>
            <FaqAccordion items={kidsFaq} />
          </Reveal>
        </div>
      </section>

      <ContactCta
        title="親子でのご参加、お待ちしています"
        lead="お子さまの年齢やご希望の日時に合わせてご案内します。まずはお電話でお気軽にご相談ください。"
      />
    </>
  );
}
