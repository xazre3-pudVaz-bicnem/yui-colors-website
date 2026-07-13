/**
 * 毎日1記事をClaude APIで生成して content/blog/ に保存するスクリプト。
 * GitHub Actions（.github/workflows/daily-blog.yml）から毎日実行される。
 *
 * 実行: npx tsx scripts/generate-daily-post.ts
 * 必要な環境変数: ANTHROPIC_API_KEY
 * 任意の環境変数: ANTHROPIC_MODEL（未設定時は claude-haiku-4-5-20251001）
 */

import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import matter from "gray-matter";
import { blogPosts as legacyPosts } from "../data/blog";

const DEFAULT_MODEL = "claude-haiku-4-5-20251001";
const MODEL = process.env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL;
const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const MAX_ATTEMPTS = 3;

const SITE = {
  name: "染 YUI COLORS",
  baseUrl: "https://www.someyuicolors.com",
  area: "滋賀県大津市・琵琶湖周辺",
  businessType: "染め体験・体験教室・観光体験",
  mainKeyword: "大津市 染め体験",
};

const CATEGORIES = ["観光", "親子", "デート", "はじめての方へ", "楽しみ方"];

/** 記事テーマのプール（日替わりでローテーション） */
const TOPICS = [
  "大津市 染め体験",
  "大津市 体験教室",
  "大津市 観光 体験",
  "滋賀 染め体験",
  "琵琶湖周辺 体験",
  "大津市 子供 体験",
  "大津市 デート 体験",
  "大津市 親子 体験",
  "大津市 雨の日 体験",
  "大津市 室内 体験",
  "滋賀 親子で楽しめる体験",
  "滋賀 デートスポット 体験",
  "観光ついでに楽しめる体験教室",
  "染め体験とは",
  "初めての染め体験",
  "子供と楽しむ染め体験",
  "カップルで楽しむ染め体験",
  "旅行の思い出づくり",
  "手作り体験の魅力",
  "色を楽しむ体験教室",
  "大津観光と体験教室",
  "琵琶湖観光とものづくり体験",
  "家族旅行で楽しめる体験",
  "ワークショップの楽しみ方",
  "染め体験で作る思い出",
  "大津市で半日楽しめる観光プラン",
  "大津市で子供と遊べる場所",
  "大津市でカップルにおすすめの体験",
  "観光客向けの体験教室",
  "地元の人も楽しめる体験教室",
];

/** 表記ルール違反・誇大表現のチェックリスト */
const BANNED_PHRASES = [
  "にじ", // べんがらは染み込む表現に統一（「にじむ」「にじみ」禁止）
  "ハンカチ", // 体験コースの対象外
  "No.1",
  "ナンバーワン",
  "日本一",
  "一番人気",
  "大津で一番",
  "必ず楽しめる",
  "絶対に楽しめる",
  "100%",
];

function jstNow(): Date {
  return new Date(Date.now() + 9 * 60 * 60 * 1000);
}

function jstToday(): string {
  return jstNow().toISOString().slice(0, 10);
}

function pickTopic(): string {
  const daysSinceEpoch = Math.floor(jstNow().getTime() / 86_400_000);
  return TOPICS[daysSinceEpoch % TOPICS.length];
}

function getExistingPosts(): { slugs: Set<string>; titles: string[] } {
  const slugs = new Set<string>(legacyPosts.map((post) => post.slug));
  const titles = legacyPosts.map((post) => post.title);

  if (fs.existsSync(CONTENT_DIR)) {
    for (const file of fs.readdirSync(CONTENT_DIR)) {
      if (!file.endsWith(".md")) continue;
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
      const { data } = matter(raw);
      if (data.slug) slugs.add(String(data.slug));
      if (data.title) titles.push(String(data.title));
    }
  }
  return { slugs, titles };
}

function buildPrompt(topic: string, existingTitles: string[]): string {
  return `あなたは滋賀県大津市真野の染め工房「${SITE.name}」のオウンドメディア編集者です。
以下の条件に従って、ブログ記事を1本書いてください。

# 今日のテーマ
「${topic}」
このテーマで検索する人に役立つ内容にしてください。既存記事と切り口が重ならないようにしてください。

# 店舗の事実情報（この範囲内で書く。ここにない事実は書かない）
- 店名: ${SITE.name}（ソメ ユイ カラーズ）。自称は「工房」（「当店は体験教室です」とは書かない）
- 所在地: 滋賀県大津市真野6-29-6。琵琶湖大橋のすぐそば
- アクセス: JR湖西線「小野駅」より徒歩5分。駐車場あり（台数が多い場合は事前連絡）
- 堅田・雄琴はどちらも車で約10分。高島市（メタセコイア並木・白鬚神社）と京都・大阪の中間。対岸の守山市からは琵琶湖大橋を渡って車15分以内
- 営業時間: 9:00〜17:00、定休日: 火曜・木曜
- 時間枠: 1日4枠（9:30〜/11:00〜/13:00〜/14:30〜）、各枠1〜5名
- 染料: 土から生まれる自然由来の顔料「べんがら」。一瞬で染まり、もみ込んで定着させる
- コースA「簡単絞り染めコース」: 5・6歳〜、一人1,500円（税別）、約1時間。輪ゴムやビー玉など身近な素材でトートバッグや巾着を絞り染め
- コースB「ストール染めコース」: 5・6歳〜、一人2,800円（税別）〜、約1時間。色を混ぜたりグラデーションにしたり
- コースC「傘巻き絞りコース」: 小学5・6年生〜、一人2,300円（税別）〜、2時間〜2時間30分（時間枠2枠）。京都の伝統工芸・鹿の子絞りの一種に気軽にチャレンジできる
- 料金はすべて税別。本文で金額に触れるときは必ず「1,500円（税別）」のように金額の直後に（税別）を付ける
- どのコースも作品は当日持ち帰り可。すべて屋内での体験
- 予約・問い合わせ: 電話 080-5029-8467

# 文章のルール
- 日本語。本文2,000〜3,000文字
- H2（##）を3〜5個。必要に応じてH3（###）。H1（#）は使わない
- 冒頭に150〜250文字の導入文（見出しなし）。最後の見出しは「## まとめ」
- 観光・体験らしい、自然で読みやすい文章。落ち着いた上品なトーン
- 「いかがでしたか」などのAIっぽい定型文は禁止。絵文字・顔文字は禁止
- 誇大表現禁止（「必ず」「絶対」「No.1」「一番」など根拠のない断定をしない）
- 料金・所要時間は上記の事実の範囲で書き、「詳細は変わる場合があるため予約時に確認」のニュアンスを添える
- 金額を書くときは必ず直後に（税別）を付ける（例: 一人1,500円（税別）、2,800円（税別）から）
- 染料の表現は「染み込む」を使う。「にじむ」「にじみ」は使用禁止
- 「ハンカチ」には言及しない（コース対象外のため）
- 子供向けの内容では、保護者の同伴や事前の相談が必要な場合があることに自然に触れる
- 地域名（大津市・滋賀・琵琶湖）、染め体験、観光などの言葉を不自然にならない範囲で含める

# 内部リンク（本文中に2〜4個、自然な文脈でMarkdownリンクとして入れる）
- [体験内容](/experience) … 3コースの詳細
- [親子・お子さまと](/kids) … 親子向け案内
- [デート・女子旅で](/date) … デート・女子旅向け案内
- [大津市観光と一緒に](/otsu-tourism) … 観光との組み合わせ
- [初めての方へ](/beginner) … 初心者向け案内
- [アクセス](/access) … 行き方・駐車場
- [よくある質問](/faq)
- [お問い合わせ](/contact)

# 既存記事のタイトル（タイトル・内容が重複しないようにする）
${existingTitles.map((title) => `- ${title}`).join("\n")}

# 出力形式
以下の形式のMarkdownドキュメント「のみ」を出力してください。前置きや説明は不要です。
frontmatterの値は必ずダブルクォートで囲んでください。

---
title: "記事タイトル（28〜38文字、検索語を自然に含む）"
slug: "english-slug-using-hyphens"
description: "記事の要約（80〜120文字）"
category: "${CATEGORIES.join(" / ")} のどれか1つ"
tags: ["タグ1", "タグ2", "タグ3"]
---

導入文からはじまる本文…`;
}

function validate(
  data: Record<string, unknown>,
  body: string,
  existingSlugs: Set<string>
): string | null {
  if (!data.title || String(data.title).length < 10) {
    return "titleが短すぎます";
  }
  if (!data.slug || !/^[a-z0-9-]+$/.test(String(data.slug))) {
    return "slugは英小文字・数字・ハイフンのみにしてください";
  }
  if (!data.description || String(data.description).length < 40) {
    return "descriptionが短すぎます（80〜120文字で書いてください）";
  }
  if (!CATEGORIES.includes(String(data.category))) {
    return `categoryは ${CATEGORIES.join(" / ")} のどれか1つにしてください`;
  }
  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    return "tagsを配列で入れてください";
  }
  if (body.length < 1500) {
    return `本文が短すぎます（${body.length}文字）。2,000〜3,000文字で書いてください`;
  }
  if (!body.includes("## ")) {
    return "H2見出し（##）が見つかりません";
  }
  if (/^#\s/m.test(body)) {
    return "H1（#）は使わないでください";
  }
  const text = `${data.title}\n${data.description}\n${body}`;
  for (const phrase of BANNED_PHRASES) {
    if (text.includes(phrase)) {
      return `禁止表現「${phrase}」が含まれています。言い換えてください`;
    }
  }
  // 金額を書く場合は直後に（税別）が必要
  const priceWithoutTaxNote = text.match(/\d{1,3},?\d{3}円(?!（税別）)/);
  if (priceWithoutTaxNote) {
    return `金額「${priceWithoutTaxNote[0]}」の直後に（税別）を付けてください`;
  }
  const duplicated = [...existingSlugs].includes(String(data.slug));
  if (duplicated) {
    return `slug「${data.slug}」は既に存在します。別のslugにしてください`;
  }
  return null;
}

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ERROR: ANTHROPIC_API_KEY が設定されていません");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const topic = pickTopic();
  const today = jstToday();
  const { slugs, titles } = getExistingPosts();

  console.log(`Model: ${MODEL}`);
  console.log(`Date (JST): ${today}`);
  console.log(`Topic: ${topic}`);

  let lastError = "";
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`Attempt ${attempt}/${MAX_ATTEMPTS} ...`);

    let prompt = buildPrompt(topic, titles);
    if (lastError) {
      prompt += `\n\n# 前回の出力の問題点（必ず修正すること）\n${lastError}`;
    }

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 6000,
      temperature: 0.8,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    // 出力の先頭に説明文が混ざった場合に備えて frontmatter 以降を抽出
    const start = text.indexOf("---");
    if (start === -1) {
      lastError = "frontmatter（---）が見つかりませんでした";
      console.warn(`NG: ${lastError}`);
      continue;
    }

    let parsed;
    try {
      parsed = matter(text.slice(start));
    } catch (error) {
      lastError = `frontmatterの解析に失敗しました: ${String(error)}`;
      console.warn(`NG: ${lastError}`);
      continue;
    }

    const body = parsed.content.trim();
    const error = validate(parsed.data, body, slugs);
    if (error) {
      lastError = error;
      console.warn(`NG: ${error}`);
      continue;
    }

    const frontmatter = {
      title: String(parsed.data.title),
      slug: String(parsed.data.slug),
      description: String(parsed.data.description),
      date: today,
      category: String(parsed.data.category),
      tags: (parsed.data.tags as unknown[]).map(String),
    };

    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    const fileName = `${today}-${frontmatter.slug}.md`;
    const filePath = path.join(CONTENT_DIR, fileName);
    fs.writeFileSync(filePath, matter.stringify(`${body}\n`, frontmatter));

    console.log(`Generated: content/blog/${fileName}`);
    console.log(`Title: ${frontmatter.title}`);
    console.log(`Category: ${frontmatter.category}`);
    console.log(`Body length: ${body.length} chars`);
    return;
  }

  console.error(`ERROR: ${MAX_ATTEMPTS}回試行しましたが記事を生成できませんでした`);
  console.error(`Last error: ${lastError}`);
  process.exit(1);
}

main().catch((error) => {
  console.error("ERROR:", error);
  process.exit(1);
});
