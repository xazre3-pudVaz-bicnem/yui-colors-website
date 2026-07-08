/**
 * 店舗基本情報・サイト共通設定
 * 店舗情報の修正はこのファイルだけで完結します。
 */

export const site = {
  name: "染 YUI COLORS",
  nameReading: "ソメ ユイ カラーズ",
  tagline: "湖のそばで、色を結ぶ。",
  description:
    "滋賀県大津市真野の染め工房「染 YUI COLORS」。琵琶湖観光の立ち寄りに、親子の時間に、ふたりのデートに。自分だけの色を残す染色体験をお楽しみいただけます。",

  // 本番ドメイン（canonical / OGP / sitemap に使用）
  url: "https://someyuicolors.com",

  tel: "080-5029-8467",
  telHref: "tel:080-5029-8467",

  email: "some.yui.colors@gmail.com",
  emailHref: "mailto:some.yui.colors@gmail.com",

  address: {
    postal: "520-0232",
    pref: "滋賀県",
    city: "大津市",
    town: "真野6-29-6",
    full: "〒520-0232 滋賀県大津市真野6-29-6",
  },

  // 営業情報（Googleビジネスプロフィール・店舗提供情報より）
  hours: "9:00〜17:00",
  closed: "火曜日・木曜日",
  station: "JR湖西線「小野駅」より徒歩5分",
  parking: "あり（お車の台数が多くなる場合は、事前にご連絡ください）",

  instagram: {
    url: "https://www.instagram.com/yuicolors2026/",
    handle: "@yuicolors2026",
  },

  mapQuery: "滋賀県大津市真野6-29-6",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("滋賀県大津市真野6-29-6"),
  mapEmbedUrl:
    "https://maps.google.com/maps?q=" +
    encodeURIComponent("滋賀県大津市真野6-29-6") +
    "&z=15&output=embed",

  areaContext: ["大津市", "琵琶湖", "真野", "堅田", "雄琴"],
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/** ヘッダー（デスクトップ）に表示する主要ナビ */
export const primaryNav: NavItem[] = [
  { label: "体験内容", href: "/experience" },
  { label: "初めての方へ", href: "/beginner" },
  { label: "観光と楽しむ", href: "/otsu-tourism" },
  { label: "アクセス", href: "/access" },
  { label: "よくある質問", href: "/faq" },
  { label: "お知らせ", href: "/blog" },
];

/** ドロワー・フッターに表示する全ナビ */
export const fullNav: NavItem[] = [
  { label: "ホーム", href: "/" },
  { label: "体験内容", href: "/experience" },
  { label: "親子・お子さまと", href: "/kids" },
  { label: "デート・女子旅で", href: "/date" },
  { label: "大津市観光と一緒に", href: "/otsu-tourism" },
  { label: "初めての方へ", href: "/beginner" },
  { label: "アクセス", href: "/access" },
  { label: "よくある質問", href: "/faq" },
  { label: "お知らせ・ブログ", href: "/blog" },
  { label: "お問い合わせ", href: "/contact" },
];
