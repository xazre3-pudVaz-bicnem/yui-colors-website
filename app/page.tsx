import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import LakeExperience from "@/components/sections/LakeExperience";
import Scenes from "@/components/sections/Scenes";
import Flow from "@/components/sections/Flow";
import Reasons from "@/components/sections/Reasons";
import Gallery from "@/components/sections/Gallery";
import AccessSection from "@/components/sections/AccessSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactCta from "@/components/sections/ContactCta";
import WaveDivider from "@/components/ui/WaveDivider";
import { JsonLd, touristAttractionJsonLd, faqJsonLd } from "@/lib/jsonld";
import { createMetadata } from "@/lib/meta";
import { topFaqItems } from "@/data/faq";

export const metadata: Metadata = createMetadata({
  title: "大津市・琵琶湖のほとりの染め体験教室",
  description:
    "大津市真野の染め体験教室「染 YUI COLORS」。琵琶湖観光の立ち寄りに、親子の体験に、デートに。滋賀で染色体験を楽しむなら、湖のそばで色を結ぶ時間をどうぞ。",
  path: "/",
  keywords: [
    "大津市 体験",
    "大津市 染め体験",
    "滋賀 染色体験",
    "琵琶湖 体験",
    "大津市 ワークショップ",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={touristAttractionJsonLd()} />
      <JsonLd data={faqJsonLd(topFaqItems)} />
      <Hero />
      <About />
      <WaveDivider fill="#eaf5fb" />
      <LakeExperience />
      <WaveDivider fill="#ffffff" />
      <Scenes />
      <WaveDivider fill="#f8fbfc" />
      <Flow />
      <WaveDivider fill="#ffffff" />
      <Reasons />
      <WaveDivider fill="#eaf5fb" />
      <Gallery />
      <WaveDivider fill="#ffffff" />
      <AccessSection />
      <WaveDivider fill="#f8fbfc" />
      <FaqSection />
      <ContactCta />
    </>
  );
}
