import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  type?: "website" | "article";
};

/**
 * 各ページ共通のmetadata生成ヘルパー。
 * title / description / canonical / OGP / Twitter Card をまとめて設定する。
 */
export function createMetadata({
  title,
  description,
  path,
  keywords,
  ogImage = "/images/og-image.jpg",
  type = "website",
}: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${title}｜${site.name}`,
      description,
      url,
      siteName: site.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "ja_JP",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title}｜${site.name}`,
      description,
    },
  };
}
