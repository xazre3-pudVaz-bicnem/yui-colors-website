import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WaveDivider from "@/components/ui/WaveDivider";
import ContactCta from "@/components/sections/ContactCta";
import { createMetadata } from "@/lib/meta";

export const metadata: Metadata = createMetadata({
  title: "大津市観光と一緒に｜琵琶湖観光の立ち寄り染め体験",
  description:
    "大津市観光・琵琶湖観光と一緒に楽しめる染め体験のご案内。真野・堅田・雄琴エリアの観光と組み合わせやすい立地で、旅の途中に形に残る思い出を作れます。",
  path: "/otsu-tourism",
  keywords: [
    "大津市 観光",
    "大津市 観光 体験",
    "琵琶湖 観光 体験",
    "琵琶湖 体験",
    "滋賀 観光 ワークショップ",
  ],
});

const combinations = [
  {
    title: "堅田・雄琴の観光とあわせて",
    description:
      "浮御堂のある堅田も、雄琴温泉も、工房から車で10分ほどの同じエリアです。湖畔の散策や温泉の前後に組み込めば、見る時間と作る時間のバランスがとれた一日になります。",
  },
  {
    title: "高島方面への旅の途中に",
    description:
      "メタセコイア並木や白鬚神社で人気の高島市と、京都・大阪方面のちょうどあいだに真野はあります。湖西を北上する旅の途中の立ち寄り先として便利です。",
  },
  {
    title: "琵琶湖大橋を渡って、湖東からも",
    description:
      "対岸の守山市（琵琶湖マリオットホテル・ヤンマーサンセットマリーナ周辺）からは、琵琶湖大橋を渡って車で15分以内。メロディーロードとして知られる橋そのものも、旅の見どころです。",
  },
  {
    title: "雨で予定が変わった日の行き先に",
    description:
      "屋外の観光が難しくなった日こそ、屋内でゆっくり楽しめる染め体験の出番です。当日の空き状況によりご案内できる場合がありますので、お電話でご相談ください。",
  },
];

export default function OtsuTourismPage() {
  return (
    <>
      <PageHero
        eyebrow="With Sightseeing"
        title="大津市観光と一緒に"
        lead="琵琶湖、比叡山、湖畔の町並み。大津の観光は、静かに楽しむ時間が魅力です。その旅程のひとつに、湖のそばで色を結ぶ染め体験を加えてみませんか。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "大津市観光と一緒に", href: "/otsu-tourism" },
        ]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SmartImage
              src="/images/lake.jpg"
              alt="夕暮れに染まる琵琶湖と対岸の山なみ"
              className="aspect-[16/9] rounded-3xl md:aspect-[21/9]"
              sizes="(min-width: 768px) 90vw, 100vw"
            />
          </Reveal>

          <div className="mx-auto mt-16 max-w-3xl">
            <Reveal>
              <SectionHeading
                eyebrow="Story"
                title="見る観光に、つくる時間をひとつ"
                align="left"
              />
              <div className="space-y-5 text-sm leading-loose text-ink/75 md:text-base">
                <p>
                  名所をめぐり、景色を眺め、写真を撮る。旅の楽しみ方はいろいろありますが、「自分の手で何かを作って持ち帰る」時間には、写真とは違う記憶の残り方があります。
                </p>
                <p>
                  染め体験で持ち帰る一枚の布は、旅から帰ったあとも日常の中で使い続けられる思い出です。ストールを身につけるたび、バッグを持って出かけるたびに、湖のそばで過ごした時間がよみがえります。
                </p>
                <p>
                  大津市真野の工房は、琵琶湖大橋のすぐそば。湖西の観光はもちろん、橋を渡れば湖東側からも立ち寄りやすい場所です。旅程のすき間の数時間を、旅のハイライトに変えてください。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <WaveDivider fill="#eaf5fb" />
      <section className="lake-gradient py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionHeading
              eyebrow="Combinations"
              title="観光との組み合わせ方"
              lead="真野・堅田・雄琴エリアを中心に、大津観光と染め体験を組み合わせる例をご紹介します。"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {combinations.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <div className="h-full rounded-3xl bg-white p-8">
                  <h3 className="font-serif text-lg leading-relaxed tracking-wide text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-loose text-ink/70">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 text-center text-sm text-ink/60">
              アクセスの詳細は
              <Link
                href="/access"
                className="mx-1 text-primary underline-offset-4 hover:underline"
              >
                アクセスページ
              </Link>
              をご覧ください。
            </p>
          </Reveal>
        </div>
      </section>

      <ContactCta
        title="旅程に合わせて、ご案内します"
        lead="観光のご予定やご宿泊先に合わせた立ち寄り方をご提案できます。お気軽にお電話ください。"
      />
    </>
  );
}
