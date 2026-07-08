import Link from "next/link";
import SmartImage from "@/components/ui/SmartImage";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/data/site";

export default function About() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16">
        <Reveal>
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary/70">
            About
          </p>
          <h2 className="font-serif text-2xl leading-relaxed tracking-wide text-ink md:text-4xl md:leading-relaxed">
            {site.name}とは
          </h2>
          <div className="mt-8 space-y-5 text-sm leading-loose text-ink/75 md:text-base">
            <p>
              {site.name}（{site.nameReading}
              ）は、琵琶湖にほど近い大津市真野にある、小さな染め体験教室です。
            </p>
            <p>
              白い布に色を選び、染料がゆっくりとにじんでいく様子を見つめる。それは、湖面に光が揺れるのを眺める時間に、どこか似ています。
            </p>
            <p>
              観光の途中に立ち寄る方、親子で参加する方、デートで訪れるおふたり。それぞれの過ごし方で、世界にひとつだけの色を持ち帰っていただけます。
            </p>
          </div>
          <Link
            href="/beginner"
            className="mt-8 inline-block text-sm tracking-wider text-primary underline-offset-4 hover:underline"
          >
            初めての方へ、体験の楽しみ方を見る
          </Link>
        </Reveal>
        <Reveal delay={150}>
          <SmartImage
            src="/images/dyeing-01.jpg"
            alt="染料に浸した布に色が広がっていく様子"
            className="aspect-[4/5] rounded-t-full rounded-b-3xl"
            sizes="(min-width: 768px) 45vw, 90vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
