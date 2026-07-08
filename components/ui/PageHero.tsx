import Reveal from "@/components/ui/Reveal";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
};

/** 下層ページ共通のページタイトル部 */
export default function PageHero({ eyebrow, title, lead }: PageHeroProps) {
  return (
    <div className="lake-gradient">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-32 md:pb-24 md:pt-44">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.4em] text-primary/70">
            {eyebrow}
          </p>
          <h1 className="font-serif text-3xl leading-relaxed tracking-wide text-ink md:text-5xl md:leading-relaxed">
            {title}
          </h1>
          {lead && (
            <p className="mt-7 max-w-3xl text-sm leading-loose text-ink/70 md:text-base">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </div>
  );
}
