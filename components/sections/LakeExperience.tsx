import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import { experiences } from "@/data/experiences";

export default function LakeExperience() {
  return (
    <section className="lake-gradient py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="湖のほとりで楽しむ、べんがら染め3コース"
            lead="土から生まれる自然由来の顔料「べんがら」で布を染める3つのコース。5・6歳のお子さまから参加でき、作品は当日お持ち帰りいただけます。"
          />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {experiences.map((exp, index) => (
            <Reveal key={exp.slug} delay={index * 120}>
              <article className="h-full overflow-hidden rounded-3xl bg-white shadow-[0_8px_40px_-16px_rgba(15,88,153,0.15)]">
                <SmartImage
                  src={exp.image}
                  alt={exp.imageAlt}
                  className="aspect-[3/2]"
                  sizes="(min-width: 768px) 30vw, 90vw"
                />
                <div className="p-7">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-primary/60">
                    Course {exp.course}
                  </p>
                  <h3 className="mt-2 font-serif text-lg tracking-wide text-ink">
                    {exp.title}
                  </h3>
                  <p className="mt-4 text-sm leading-loose text-ink/70">
                    {exp.description}
                  </p>
                  <p className="mt-5 border-t border-ink/5 pt-4 text-xs leading-relaxed text-ink/60">
                    {exp.target}／{exp.duration}／{exp.price}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-12 text-center">
            <CtaButton href="/experience" variant="outline">
              体験内容をくわしく見る
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
