import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden">
      {/* 背景写真（/public/images/hero.jpg を置くだけで差し替わる） */}
      <div className="water-drift absolute inset-0">
        <SmartImage
          src="/images/hero.jpg"
          alt="青空の下に広がる琵琶湖と大津の湖岸の風景"
          className="h-full w-full"
          sizes="100vw"
          priority
        />
      </div>
      {/* 文字の可読性を保つための淡いオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-white/20" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-snow to-transparent" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-32">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.45em] text-primary/80">
            Dyeing Experience in Otsu, Shiga
          </p>
          <h1 className="font-serif text-4xl leading-normal tracking-widest text-ink md:text-6xl md:leading-snug">
            湖のそばで、
            <br />
            色を結ぶ。
          </h1>
          <p className="mt-8 max-w-xl text-sm leading-loose text-ink/75 md:text-base">
            大津市・真野で楽しむ、{site.name}の染め体験。
            <br className="hidden md:block" />
            旅の思い出に、親子の時間に、ふたりのデートに。
            <br className="hidden md:block" />
            自分だけの色を残す体験教室です。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
