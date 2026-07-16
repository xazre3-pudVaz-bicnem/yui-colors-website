import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  blogPosts as legacyPosts,
  type BlogSection,
} from "@/data/blog";

/**
 * ブログ記事の統合レイヤー。
 * - 手書き記事: data/blog.ts（構造化データ）
 * - 自動生成記事: content/blog/*.md（frontmatter付きMarkdown）
 * の2系統を同じ型に揃えて、一覧・詳細・カテゴリ・sitemapへ供給する。
 */

export type UnifiedPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  category: string;
  tags: string[];
  image: string;
  imageAlt: string;
  /** data/blog.ts 由来の記事のみ */
  lead?: string;
  sections?: BlogSection[];
  /** Markdown由来の記事のみ（本文Markdown） */
  markdown?: string;
  source: "data" | "markdown";
};

export const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/** カテゴリ定義（URLは英字スラッグ） */
export const categories = [
  { slug: "kanko", name: "観光" },
  { slug: "oyako", name: "親子" },
  { slug: "date", name: "デート" },
  { slug: "hajimete", name: "はじめての方へ" },
  { slug: "tanoshimikata", name: "楽しみ方" },
] as const;

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCategorySlug(name: string): string | undefined {
  return categories.find((c) => c.name === name)?.slug;
}

/** カテゴリごとの既定アイキャッチ（frontmatterで未指定の場合に使う） */
const categoryImages: Record<string, { image: string; imageAlt: string }> = {
  観光: {
    image: "/images/lake.jpg",
    imageAlt: "夕暮れに染まる琵琶湖と対岸の山なみ",
  },
  親子: {
    image: "/images/kids.jpg",
    imageAlt: "丸い模様を絞り染めした、からし色の小さなトートバッグ",
  },
  デート: {
    image: "/images/date.jpg",
    imageAlt: "琵琶湖を望む窓辺で、ふたり並んで絞りの作業をする様子",
  },
  はじめての方へ: {
    image: "/images/workshop-01.jpg",
    imageAlt: "白い布に絞りの糸を入れて、染めの模様を仕込んでいる様子",
  },
  楽しみ方: {
    image: "/images/dyeing-01.jpg",
    imageAlt: "藍から浅葱へ、グラデーションに染め上げたストール",
  },
};

function fallbackImage(category: string) {
  return (
    categoryImages[category] ?? {
      image: "/images/dyeing-01.jpg",
      imageAlt: "藍から浅葱へ、グラデーションに染め上げたストール",
    }
  );
}

function readMarkdownPosts(): UnifiedPost[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const category = String(data.category ?? "楽しみ方");
      const fallback = fallbackImage(category);
      return {
        slug: String(data.slug ?? file.replace(/\.md$/, "")),
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        category,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        image: String(data.image ?? fallback.image),
        imageAlt: String(data.imageAlt ?? fallback.imageAlt),
        markdown: content.trim(),
        source: "markdown" as const,
      };
    })
    .filter((post) => post.title && post.slug && post.date);
}

function legacyAsUnified(): UnifiedPost[] {
  return legacyPosts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.date,
    category: post.category,
    tags: [],
    image: post.image,
    imageAlt: post.imageAlt,
    lead: post.lead,
    sections: post.sections,
    source: "data" as const,
  }));
}

/** 全記事（日付の新しい順）。slugが重複した場合はMarkdown側を優先する。 */
export function getAllPosts(): UnifiedPost[] {
  const markdown = readMarkdownPosts();
  const markdownSlugs = new Set(markdown.map((post) => post.slug));
  const legacy = legacyAsUnified().filter(
    (post) => !markdownSlugs.has(post.slug)
  );
  return [...markdown, ...legacy].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): UnifiedPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/** ブログ一覧の1ページあたりの記事数 */
export const POSTS_PER_PAGE = 12;

export type PaginatedPosts = {
  posts: UnifiedPost[];
  currentPage: number;
  totalPages: number;
};

/** 指定ページの記事を返す（1始まり。範囲外は端に丸める） */
export function getPaginatedPosts(page: number): PaginatedPosts {
  const all = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  return {
    posts: all.slice(start, start + POSTS_PER_PAGE),
    currentPage,
    totalPages,
  };
}

/** ページネーションで生成すべき2ページ目以降のページ番号 */
export function getBlogPageNumbers(): number[] {
  const totalPages = Math.max(
    1,
    Math.ceil(getAllPosts().length / POSTS_PER_PAGE)
  );
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => i + 2);
}

export function getPostsByCategory(categoryName: string): UnifiedPost[] {
  return getAllPosts().filter((post) => post.category === categoryName);
}

/** 関連記事（同カテゴリを優先し、足りなければ新しい記事で補う） */
export function getRelatedPosts(current: UnifiedPost, limit = 3): UnifiedPost[] {
  const others = getAllPosts().filter((post) => post.slug !== current.slug);
  const sameCategory = others.filter(
    (post) => post.category === current.category
  );
  const rest = others.filter((post) => post.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** 記事が1件以上あるカテゴリのみ返す */
export function getActiveCategories() {
  const posts = getAllPosts();
  return categories.filter((category) =>
    posts.some((post) => post.category === category.name)
  );
}

export function formatDate(date: string): string {
  const [y, m, d] = date.split("-");
  return `${y}年${Number(m)}月${Number(d)}日`;
}
