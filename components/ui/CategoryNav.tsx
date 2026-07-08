import Link from "next/link";
import { getActiveCategories } from "@/lib/blog";

/** ブログ一覧・カテゴリページ共通のカテゴリ切り替えナビ */
export default function CategoryNav({ current }: { current?: string }) {
  const active = getActiveCategories();

  const baseClass =
    "rounded-full px-5 py-2 text-sm tracking-wider transition-colors";
  const selectedClass = "bg-primary text-white";
  const normalClass =
    "border border-ink/10 bg-white text-ink/70 hover:border-primary/40 hover:text-primary";

  return (
    <nav aria-label="カテゴリ" className="mb-12">
      <ul className="flex flex-wrap justify-center gap-3">
        <li>
          <Link
            href="/blog"
            className={`${baseClass} ${current ? normalClass : selectedClass}`}
          >
            すべて
          </Link>
        </li>
        {active.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/blog/category/${category.slug}`}
              className={`${baseClass} ${
                current === category.slug ? selectedClass : normalClass
              }`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
