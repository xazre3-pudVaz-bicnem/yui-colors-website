import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WaveDivider from "@/components/ui/WaveDivider";
import Flow from "@/components/sections/Flow";
import ContactCta from "@/components/sections/ContactCta";
import { createMetadata } from "@/lib/meta";

export const metadata: Metadata = createMetadata({
  title: "初めての方へ｜染め体験の楽しみ方と当日の流れ",
  description:
    "染め体験が初めての方へ。不器用でも大丈夫な理由、服装や持ちもの、当日の流れなど、大津市の染め体験教室 染 YUI COLORSを安心して楽しむための案内です。",
  path: "/beginner",
  keywords: [
    "染め体験 初めて",
    "大津市 体験教室",
    "染色体験 服装",
    "大津市 染め体験",
  ],
});

const worries = [
  {
    question: "不器用だけど、大丈夫？",
    answer:
      "染め体験は、絵を描く体験ではありません。色を選び、布に移していく体験です。手順はひとつずつご案内しますし、にじみやむらはそのまま作品の味わいになります。器用さより、色を選ぶ楽しさが大切です。",
  },
  {
    question: "何を持っていけばいい？",
    answer:
      "染料を扱うため、汚れても差し支えのない服装でお越しください。そのほかの持ちものは、予約の際にメニューに合わせてご案内します。",
  },
  {
    question: "時間はどのくらいかかる？",
    answer:
      "メニューや人数によって変わります。観光の予定に合わせたい方は、予約時に旅程をお知らせいただければ、無理のない参加の仕方をご提案します。",
  },
  {
    question: "ひとりでも参加できる？",
    answer:
      "おひとりでのご参加も歓迎です。静かに色と向き合う時間を、ご自分のペースでお楽しみください。まずはお電話でご相談ください。",
  },
];

export default function BeginnerPage() {
  return (
    <>
      <PageHero
        eyebrow="For Beginners"
        title="初めての方へ"
        lead="染め体験が初めての方も、ものづくりに自信がない方も、ご安心ください。色を選ぶところから仕上げまで、ひとつずつ丁寧にご案内します。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "初めての方へ", href: "/beginner" },
        ]}
      />

      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <SectionHeading
              eyebrow="Message"
              title="うまく作ることより、楽しく選ぶこと"
              align="left"
            />
            <div className="space-y-5 text-sm leading-loose text-ink/75 md:text-base">
              <p>
                染め体験でいちばん大切なのは、器用さではなく「どの色にしようかな」と迷う時間です。白い布を前に色を選ぶひとときは、大人になるとなかなか出会えない、静かでぜいたくな時間だと思います。
              </p>
              <p>
                染料が布ににじんで広がっていく様子は、思いどおりにならないからこそ美しいもの。狙っていなかった模様や濃淡が、世界にひとつだけの表情になります。
              </p>
              <p>
                初めての方にこそ、この楽しさを知っていただきたい。染 YUI
                COLORSは、そんな気持ちでお迎えしています。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <WaveDivider fill="#eaf5fb" />
      <section className="lake-gradient py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <SectionHeading eyebrow="Worries" title="よくある心配ごと" />
          </Reveal>
          <div className="space-y-6">
            {worries.map((item, index) => (
              <Reveal key={item.question} delay={index * 80}>
                <div className="rounded-3xl bg-white p-8">
                  <h3 className="font-serif text-lg tracking-wide text-ink">
                    {item.question}
                  </h3>
                  <p className="mt-3 text-sm leading-loose text-ink/70">
                    {item.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-10 text-center text-sm text-ink/60">
              そのほかの質問は
              <Link
                href="/faq"
                className="mx-1 text-primary underline-offset-4 hover:underline"
              >
                よくある質問
              </Link>
              にまとめています。
            </p>
          </Reveal>
        </div>
      </section>

      <Flow />
      <ContactCta
        title="はじめの一歩は、お電話から"
        lead="ご不安な点はどんな小さなことでも構いません。お気軽にお問い合わせください。"
      />
    </>
  );
}
