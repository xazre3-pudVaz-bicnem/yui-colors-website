import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  type?: "website" | "article";
  /** type: "article" のときのOGP補足情報 */
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    section?: string;
    tags?: string[];
  };
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
  article,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;

  const openGraph: NonNullable<Metadata["openGraph"]> = {
    title: `${title}｜${site.name}`,
    description,
    url,
    siteName: site.name,
    images: [{ url: ogImage, width: 1200, height: 630 }],
    locale: "ja_JP",
    type,
  };

  if (type === "article" && article) {
    Object.assign(openGraph, {
      type: "article",
      publishedTime: article.publishedTime,
      modifiedTime: article.modifiedTime ?? article.publishedTime,
      section: article.section,
      tags: article.tags,
      authors: [site.name],
    });
  }

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: `${title}｜${site.name}`,
      description,
    },
  };
}
