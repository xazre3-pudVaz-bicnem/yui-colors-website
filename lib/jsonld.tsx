import { site } from "@/data/site";

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
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#localbusiness`,
    name: site.name,
    alternateName: site.nameReading,
    description: site.description,
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
    areaServed: ["大津市", "滋賀県", "琵琶湖周辺"],
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
      "滋賀県大津市真野にある染め体験教室。琵琶湖観光とあわせて楽しめる染色体験・ワークショップを開催しています。",
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: `${site.url}${post.image}`,
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };
}
