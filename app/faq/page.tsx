import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion from "@/components/ui/FaqAccordion";
import ContactCta from "@/components/sections/ContactCta";
import { JsonLd, faqJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/meta";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = createMetadata({
  title: "よくある質問｜予約・当日の体験・子供連れ・アクセス",
  description:
    "染 YUI COLORSによくいただく質問をまとめました。予約の方法、所要時間、子供の参加年齢、雨の日の体験、駐車場など、大津市の染め体験に関する疑問にお答えします。",
  path: "/faq",
  keywords: [
    "染め体験 よくある質問",
    "大津市 体験 予約",
    "大津市 染め体験",
  ],
});

const categories = ["予約・料金", "当日の体験", "子供・親子", "アクセス"] as const;

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      <PageHero
        eyebrow="FAQ"
        title="よくある質問"
        lead="ご予約から当日の体験まで、よくいただくご質問をまとめました。ここにない疑問は、お電話でお気軽にお尋ねください。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "よくある質問", href: "/faq" },
        ]}
      />

      <section className="bg-snow py-16 md:py-24">
        <div className="mx-auto max-w-3xl space-y-14 px-5">
          {categories.map((category) => (
            <Reveal key={category}>
              <h2 className="mb-6 font-serif text-xl tracking-wide text-ink">
                {category}
              </h2>
              <FaqAccordion
                items={faqItems.filter((item) => item.category === category)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCta
        title="疑問が解けないときは"
        lead="どんな小さなことでも、お電話でお答えします。安心してご参加ください。"
      />
    </>
  );
}
