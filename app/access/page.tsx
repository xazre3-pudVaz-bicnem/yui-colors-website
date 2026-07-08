import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WaveDivider from "@/components/ui/WaveDivider";
import CtaButton from "@/components/ui/CtaButton";
import ContactCta from "@/components/sections/ContactCta";
import { JsonLd, touristAttractionJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/meta";
import { site } from "@/data/site";

export const metadata: Metadata = createMetadata({
  title: "アクセス｜大津市真野・琵琶湖周辺からの行き方",
  description:
    "染 YUI COLORSへのアクセスのご案内。所在地は滋賀県大津市真野6-29-6。琵琶湖周辺観光や堅田・雄琴方面からの立ち寄りにも便利な、湖西エリアの染め体験教室です。",
  path: "/access",
  keywords: [
    "染 YUI COLORS アクセス",
    "大津市 真野 体験",
    "琵琶湖 観光 立ち寄り",
    "堅田 雄琴 体験",
  ],
});

export default function AccessPage() {
  return (
    <>
      <JsonLd data={touristAttractionJsonLd()} />
      <PageHero
        eyebrow="Access"
        title="アクセス"
        lead="工房は、琵琶湖の西側に広がる大津市真野エリアにあります。堅田・雄琴方面の観光や、湖西の旅の途中に立ち寄りやすい場所です。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "アクセス", href: "/access" },
        ]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <Reveal>
              <h2 className="font-serif text-xl tracking-wide text-ink md:text-2xl">
                店舗情報
              </h2>
              <dl className="mt-8 space-y-5 text-sm md:text-base">
                <div className="flex gap-6 border-b border-ink/5 pb-5">
                  <dt className="w-24 shrink-0 text-ink/50">店舗名</dt>
                  <dd className="text-ink/80">
                    {site.name}（{site.nameReading}）
                  </dd>
                </div>
                <div className="flex gap-6 border-b border-ink/5 pb-5">
                  <dt className="w-24 shrink-0 text-ink/50">所在地</dt>
                  <dd className="text-ink/80">{site.address.full}</dd>
                </div>
                <div className="flex gap-6 border-b border-ink/5 pb-5">
                  <dt className="w-24 shrink-0 text-ink/50">電話番号</dt>
                  <dd>
                    <a
                      href={site.telHref}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {site.tel}
                    </a>
                    <span className="mt-1 block text-xs text-ink/50">
                      スマートフォンからはタップで発信できます
                    </span>
                  </dd>
                </div>
                <div className="flex gap-6 border-b border-ink/5 pb-5">
                  <dt className="w-24 shrink-0 text-ink/50">メール</dt>
                  <dd>
                    <a
                      href={site.emailHref}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-6 border-b border-ink/5 pb-5">
                  <dt className="w-24 shrink-0 text-ink/50">営業時間</dt>
                  <dd className="text-ink/80">{site.hours}</dd>
                </div>
                <div className="flex gap-6 border-b border-ink/5 pb-5">
                  <dt className="w-24 shrink-0 text-ink/50">定休日</dt>
                  <dd className="text-ink/80">{site.closed}</dd>
                </div>
                <div className="flex gap-6 border-b border-ink/5 pb-5">
                  <dt className="w-24 shrink-0 text-ink/50">駐車場</dt>
                  <dd className="text-ink/80">{site.parking}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaButton href={site.telHref} variant="primary">
                  電話で問い合わせる
                </CtaButton>
                <CtaButton href={site.mapUrl} variant="outline">
                  Googleマップで開く
                </CtaButton>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="overflow-hidden rounded-3xl border border-ink/5">
                <iframe
                  src={site.mapEmbedUrl}
                  title={`${site.name}の地図（${site.address.full}）`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-96 w-full md:h-full md:min-h-[480px]"
                />
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
              eyebrow="Area"
              title="琵琶湖周辺観光からの立ち寄りに"
              lead="大津市真野は、湖西エリアの観光と組み合わせやすい場所です。"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "堅田方面から",
                description:
                  "浮御堂をはじめ、湖畔の景色が楽しめる堅田エリアからほど近い立地です。湖岸の散策とあわせた立ち寄りに向いています。",
              },
              {
                title: "雄琴方面から",
                description:
                  "雄琴温泉に宿泊される方の、チェックイン前後の時間の過ごし方としてもご利用いただけます。",
              },
              {
                title: "お車・公共交通で",
                description:
                  "具体的な経路や所要時間は、出発地に合わせてご案内できます。ご来店前にお電話でお気軽にご確認ください。",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <div className="h-full rounded-3xl bg-white p-8">
                  <h3 className="font-serif text-lg tracking-wide text-ink">
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
            <div className="mt-14">
              <SmartImage
                src="/images/access.jpg"
                alt="木の外壁にロゴ看板を掲げた、染 YUI COLORSの入り口"
                className="aspect-[21/9] rounded-3xl"
                sizes="90vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCta
        title="道に迷ったら、お電話ください"
        lead="ご来店の際のご不明点は、お気軽にお問い合わせください。"
      />
    </>
  );
}
