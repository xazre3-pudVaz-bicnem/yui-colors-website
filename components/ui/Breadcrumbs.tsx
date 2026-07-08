import Link from "next/link";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

export type Crumb = {
  name: string;
  href: string;
};

/** パンくずリスト（BreadcrumbList構造化データ付き） */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="パンくずリスト" className="mx-auto max-w-6xl px-5 py-4">
      <JsonLd data={breadcrumbJsonLd(items)} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink/50">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-ink/70">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-ink/30">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
