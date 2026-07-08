import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { scenes } from "@/data/scenes";

export default function Scenes() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            eyebrow="Scenes"
            title="あなたの旅に合わせて"
            lead="親子で、ふたりで、観光の途中に。過ごし方に合わせた楽しみ方をご案内します。"
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {scenes.map((scene, index) => (
            <Reveal key={scene.href + scene.title} delay={index * 100}>
              <Link
                href={scene.href}
                className="group block overflow-hidden rounded-3xl border border-ink/5 bg-base transition-shadow duration-300 hover:shadow-[0_8px_40px_-16px_rgba(15,88,153,0.25)]"
              >
                <div className="overflow-hidden">
                  <SmartImage
                    src={scene.image}
                    alt={scene.imageAlt}
                    className="aspect-[16/9] transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 640px) 45vw, 90vw"
                  />
                </div>
                <div className="p-7">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-primary/60">
                    {scene.eyebrow}
                  </p>
                  <h3 className="mt-2 font-serif text-xl tracking-wide text-ink">
                    {scene.title}
                  </h3>
                  <p className="mt-3 text-sm leading-loose text-ink/70">
                    {scene.description}
                  </p>
                  <p className="mt-4 text-xs tracking-widest text-primary">
                    くわしく見る
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
