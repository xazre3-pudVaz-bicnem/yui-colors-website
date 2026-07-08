import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WaveDivider from "@/components/ui/WaveDivider";
import ContactCta from "@/components/sections/ContactCta";
import { createMetadata } from "@/lib/meta";

export const metadata: Metadata = createMetadata({
  title: "デート・おふたりで｜大津市の落ち着いた体験デート",
  description:
    "大津市でデートにぴったりの体験をお探しのおふたりへ。染 YUI COLORSの染め体験は、静かな工房でふたりの色を残す、落ち着いた大人のデートです。雨の日デートにも。",
  path: "/date",
  keywords: [
    "大津市 デート 体験",
    "カップル 大津市 体験",
    "大津市 デート 雨の日",
    "滋賀 デート 体験",
  ],
});

const datePoints = [
  {
    title: "会話が自然と生まれる",
    description:
      "色の選び方、仕上がりの予想、染料がにじんでいく様子。手を動かすデートには話題が尽きません。沈黙が気にならない心地よさは、体験デートならではです。",
  },
  {
    title: "ふたりの色が、形に残る",
    description:
      "同じ日に染めても、ふたりの作品は少しずつ違う色になります。その違いこそが記念品。染めた布を日常で使うたびに、大津で過ごした一日を思い出せます。",
  },
  {
    title: "静かで、落ち着いた時間",
    description:
      "にぎやかな観光地を歩き回るのとは違う、密度の高いふたりの時間。人混みが苦手なおふたりや、ゆっくり話したい日のデートに向いています。",
  },
  {
    title: "雨の日でも計画が崩れない",
    description:
      "屋内の体験なので、天気予報を気にせずデートの計画を立てられます。雨の大津も、ふたりで色を選ぶ日と決めてしまえば、楽しみな一日に変わります。",
  },
];

const datePlan = [
  {
    time: "午前",
    title: "琵琶湖のほとりを散策",
    description:
      "湖岸をゆっくり歩いたり、カフェでひと息ついたり。湖の色を眺めておくと、あとの色選びが少し楽しくなります。",
  },
  {
    time: "午後",
    title: "染め体験で、ふたりの色を作る",
    description:
      "工房で色を選び、それぞれの一枚を染め上げます。仕上がりを見せ合う瞬間が、この日いちばんの盛り上がりです。",
  },
  {
    time: "夕方",
    title: "湖畔で夕景を眺めて",
    description:
      "体験のあとは、琵琶湖の夕暮れを見ながら一日をふりかえる時間を。作った作品が、この日の記念品になります。",
  },
];

export default function DatePage() {
  return (
    <>
      <PageHero
        eyebrow="For Couples"
        title="デート・おふたりで"
        lead="静かな工房で、ふたりでひとつずつ色を選ぶ。染 YUI COLORSの染め体験は、大津市で過ごす落ち着いたデートの選択肢です。ふたりで残す体験が、何年たっても色あせない思い出になります。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "デート・おふたりで", href: "/date" },
        ]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SmartImage
              src="/images/date.jpg"
              alt="琵琶湖を望む窓辺で、ふたり並んで絞りの作業をする様子"
              className="aspect-[16/9] rounded-3xl md:aspect-[21/9]"
              sizes="(min-width: 768px) 90vw, 100vw"
            />
          </Reveal>
          <div className="mt-16">
            <Reveal>
              <SectionHeading
                eyebrow="Points"
                title="体験デートが選ばれる理由"
              />
            </Reveal>
            <div className="grid gap-6 md:grid-cols-2">
              {datePoints.map((point, index) => (
                <Reveal key={point.title} delay={index * 90}>
                  <div className="h-full rounded-3xl border border-ink/5 bg-snow p-8">
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
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <SectionHeading
              eyebrow="Plan"
              title="大津デート、一日の過ごし方"
              lead="琵琶湖周辺の散策と組み合わせた、ゆったりとした一日のプラン例です。"
            />
          </Reveal>
          <div className="space-y-6">
            {datePlan.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <div className="flex gap-6 rounded-3xl bg-white p-7 md:gap-10 md:p-9">
                  <p className="w-12 shrink-0 pt-1 font-serif text-sm tracking-widest text-primary md:w-16">
                    {item.time}
                  </p>
                  <div>
                    <h3 className="font-serif text-lg tracking-wide text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-loose text-ink/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta
        title="おふたりのご予約、お待ちしています"
        lead="記念日のご利用や、旅程に合わせたご参加のご相談も承ります。お電話でお気軽にどうぞ。"
      />
    </>
  );
}
