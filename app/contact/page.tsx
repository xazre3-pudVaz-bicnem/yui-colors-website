import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import CtaButton from "@/components/ui/CtaButton";
import { createMetadata } from "@/lib/meta";
import { site } from "@/data/site";

export const metadata: Metadata = createMetadata({
  title: "お問い合わせ｜ご予約・ご相談",
  description:
    "染 YUI COLORSへのお問い合わせページ。染め体験のご予約・ご相談は、お電話（080-5029-8467）またはフォームにて承ります。観光の予定に合わせたご相談もお気軽にどうぞ。",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="お問い合わせ"
        lead="染め体験のご予約・ご相談を承ります。日程、人数、お子さまの年齢、観光のご予定など、お気軽にお知らせください。"
      />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "お問い合わせ", href: "/contact" },
        ]}
      />

      <section className="bg-snow py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <div className="rounded-3xl bg-mist p-8 text-center md:p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/70">
                Tel
              </p>
              <a
                href={site.telHref}
                className="mt-3 inline-block font-serif text-3xl tracking-[0.12em] text-primary underline-offset-8 hover:underline md:text-4xl"
              >
                {site.tel}
              </a>
              <p className="mt-4 text-sm leading-loose text-ink/70">
                ご予約はお電話がいちばん確実です。
                <br className="md:hidden" />
                体験中などで出られない場合は、折り返しご連絡いたします。
              </p>
              <div className="mt-6 flex justify-center">
                <CtaButton href={site.telHref} variant="primary">
                  電話で問い合わせる
                </CtaButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 rounded-3xl border border-ink/5 bg-white p-8 text-center">
              <p className="text-xs uppercase tracking-[0.35em] text-primary/70">
                Instagram
              </p>
              <p className="mt-3 text-sm leading-loose text-ink/70">
                工房の日々や作品の様子は、Instagramでもご覧いただけます。
                <br className="hidden md:block" />
                DMでのご質問もお気軽にどうぞ。
              </p>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm tracking-wider text-primary underline-offset-4 hover:underline"
              >
                {site.instagram.handle} をフォローする
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-12 rounded-3xl border border-ink/5 bg-white p-8 md:p-10">
              <h2 className="font-serif text-xl tracking-wide text-ink">
                フォームでのお問い合わせ
              </h2>
              <p className="mt-3 text-sm leading-loose text-ink/60">
                お急ぎでない場合は、こちらのフォームからもご連絡いただけます。
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
