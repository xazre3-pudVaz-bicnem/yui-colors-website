import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { flowSteps } from "@/data/flow";

export default function Flow() {
  return (
    <section className="lake-gradient-soft py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <Reveal>
          <SectionHeading
            eyebrow="Flow"
            title="体験の流れ"
            lead="ご予約からお持ち帰りまで。当日は手ぶらに近い気持ちでお越しいただけます。"
          />
        </Reveal>
        <ol className="space-y-0">
          {flowSteps.map((step, index) => (
            <Reveal key={step.step} delay={index * 80}>
              <li className="relative flex gap-7 pb-10 md:gap-10">
                {/* 縦のつなぎ線 */}
                {index < flowSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[27px] top-14 h-[calc(100%-3.5rem)] w-px bg-aisora md:left-[31px]"
                  />
                )}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-white font-serif text-sm tracking-widest text-primary md:h-16 md:w-16">
                  {step.step}
                </div>
                <div className="pt-2.5 md:pt-4">
                  <h3 className="font-serif text-lg tracking-wide text-ink md:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-loose text-ink/70">
                    {step.description}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
