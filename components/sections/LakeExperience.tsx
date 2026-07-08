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
            title="湖のほとりで楽しむ染め体験"
            lead="琵琶湖のそばの静かな工房で、色を選び、布を染める。初めての方でも、ひとつずつ丁寧にご案内します。"
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
                  <h3 className="font-serif text-lg tracking-wide text-ink">
                    {exp.title}
                  </h3>
                  <p className="mt-4 text-sm leading-loose text-ink/70">
                    {exp.description}
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
