import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { galleryImages } from "@/data/gallery";
import { site } from "@/data/site";

export default function Gallery() {
  return (
    <section className="lake-gradient py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            eyebrow="Gallery"
            title="工房の風景"
            lead="色と布と、湖のそばの時間。工房の空気を少しだけご紹介します。"
          />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {galleryImages.map((image, index) => (
            <Reveal key={image.src} delay={index * 70}>
              <SmartImage
                src={image.src}
                alt={image.alt}
                className={`rounded-2xl ${
                  index % 3 === 1 ? "aspect-[3/4]" : "aspect-square"
                }`}
                sizes="(min-width: 768px) 30vw, 45vw"
              />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-sm leading-loose text-ink/60">
            工房の日々や最新の作品は、Instagramでご紹介しています。
          </p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm tracking-wider text-primary underline-offset-4 hover:underline"
          >
            Instagram {site.instagram.handle} を見る
          </a>
        </div>
      </div>
    </section>
  );
}
