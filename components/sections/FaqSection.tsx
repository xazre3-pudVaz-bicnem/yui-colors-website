import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { topFaqItems } from "@/data/faq";

export default function FaqSection() {
  return (
    <section className="lake-gradient-soft py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="よくある質問"
            lead="初めての方からよくいただくご質問をまとめました。"
          />
        </Reveal>
        <Reveal delay={100}>
          <FaqAccordion items={topFaqItems} />
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="text-sm tracking-wider text-primary underline-offset-4 hover:underline"
            >
              すべての質問を見る
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
