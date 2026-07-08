import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { reasons } from "@/data/reasons";

export default function Reasons() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            eyebrow="Reasons"
            title="染 YUI COLORSが選ばれる理由"
            lead="大津市・琵琶湖周辺で体験を探している方に、静かに選ばれている理由があります。"
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 90}>
              <div className="h-full rounded-3xl border border-ink/5 bg-base p-8">
                <p className="font-serif text-3xl text-aisora">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-serif text-lg leading-relaxed tracking-wide text-ink">
                  {reason.title}
                </h3>
                <p className="mt-3 text-sm leading-loose text-ink/70">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
