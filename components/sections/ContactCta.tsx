import Reveal from "@/components/ui/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import { site } from "@/data/site";

type ContactCtaProps = {
  title?: string;
  lead?: string;
};

/** 各ページ下部に置くお問い合わせ導線 */
export default function ContactCta({
  title = "色を選ぶ時間を、あなたの旅に。",
  lead = "ご予約・ご相談はお電話にて承ります。日程や人数、観光のご予定に合わせて、お気軽にご相談ください。",
}: ContactCtaProps) {
  return (
    <section className="relative overflow-hidden bg-deep py-20 text-white md:py-28">
      {/* 湖面のゆらぎを思わせる装飾 */}
      <div
        aria-hidden="true"
        className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-primary/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-mist/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.4em] text-white/60">
            Contact
          </p>
          <h2 className="font-serif text-2xl leading-relaxed tracking-wide md:text-4xl md:leading-relaxed">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-loose text-white/75">
            {lead}
          </p>
          <a
            href={site.telHref}
            className="mt-9 inline-block font-serif text-3xl tracking-[0.15em] underline-offset-8 hover:underline md:text-4xl"
          >
            {site.tel}
          </a>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaButton
              href={site.telHref}
              variant="primary"
              className="!bg-white !text-deep hover:!bg-mist"
            >
              電話で問い合わせる
            </CtaButton>
            <CtaButton
              href="/contact"
              variant="outline"
              className="!border-white/40 !bg-transparent !text-white hover:!border-white hover:!bg-white/10"
            >
              体験について相談する
            </CtaButton>
            <CtaButton
              href="/access"
              variant="outline"
              className="!border-white/40 !bg-transparent !text-white hover:!border-white hover:!bg-white/10"
            >
              アクセスを確認する
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
