import { site } from "@/data/site";
import { experiences } from "@/data/experiences";

/** JSON-LDを安全に埋め込む共通コンポーネント */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function localBusinessJsonLd() {
  const minPrice = Math.min(...experiences.map((exp) => exp.priceValue));

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "TouristAttraction"],
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    alternateName: site.nameReading,
    description: site.description,
    url: site.url,
    telephone: site.tel,
    email: site.email,
    image: `${site.url}/images/og-image.jpg`,
    logo: `${site.url}/images/logo-mark.jpg`,
    hasMap: site.mapUrl,
    priceRange: `¥${minPrice.toLocaleString("en-US")}〜（税別）`,
    currenciesAccepted: "JPY",
    address: {
      "@type": "PostalAddress",
      postalCode: site.address.postal,
      addressRegion: site.address.pref,
      addressLocality: site.address.city,
      streetAddress: site.address.town,
      addressCountry: "JP",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: ["大津市", "滋賀県", "琵琶湖周辺", "堅田", "雄琴"],
    makesOffer: experiences.map((exp) => ({
      "@type": "Offer",
      priceCurrency: "JPY",
      price: exp.priceValue,
      // 表示料金はすべて税別
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "JPY",
        valueAddedTaxIncluded: false,
        ...(exp.priceFrom
          ? { minPrice: exp.priceValue }
          : { price: exp.priceValue }),
      },
      itemOffered: {
        "@type": "Service",
        name: exp.title,
        description: exp.description,
        serviceType: "染め体験",
      },
    })),
    sameAs: [site.instagram.url],
  };
}

export function touristAttractionJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${site.url}/#touristattraction`,
    name: site.name,
    description:
      "滋賀県大津市真野にある染め工房。琵琶湖観光とあわせて楽しめる染色体験・ワークショップを開催しています。",
    url: site.url,
    telephone: site.tel,
    address: {
      "@type": "PostalAddress",
      postalCode: site.address.postal,
      addressRegion: site.address.pref,
      addressLocality: site.address.city,
      streetAddress: site.address.town,
      addressCountry: "JP",
    },
    touristType: ["観光客", "家族連れ", "カップル"],
    isAccessibleForFree: false,
    sameAs: [site.instagram.url],
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.href}`,
    })),
  };
}

export function articleJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  image: string;
  category?: string;
  tags?: string[];
}) {
  const keywords = [post.category, ...(post.tags ?? [])].filter(
    (value): value is string => Boolean(value)
  );

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: `${site.url}${post.image}`,
    articleSection: post.category,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    inLanguage: "ja",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/blog/${post.slug}`,
    },
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/logo-mark.jpg`,
      },
    },
  };
}

/** サイト全体を表す WebSite スキーマ（全ページのフッターに埋め込む） */
export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: site.name,
    alternateName: site.nameReading,
    url: site.url,
    inLanguage: "ja",
    publisher: { "@id": `${site.url}/#localbusiness` },
  };
}

/** ブログ一覧ページの Blog スキーマ（記事のItemListを内包） */
export function blogListingJsonLd(
  posts: {
    slug: string;
    title: string;
    description: string;
    date: string;
  }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog/#blog`,
    name: `${site.name}のお知らせ・ブログ`,
    url: `${site.url}/blog`,
    inLanguage: "ja",
    publisher: { "@id": `${site.url}/#localbusiness` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      url: `${site.url}/blog/${post.slug}`,
    })),
  };
}
