import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  /** 1ページ目のパス（例: "/blog"）。2ページ目以降は {basePath}/page/{n} */
  basePath: string;
};

function pageHref(basePath: string, page: number) {
  return page === 1 ? basePath : `${basePath}/page/${page}`;
}

/** ブログ一覧のページ送り */
export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const linkClass =
    "flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm tracking-wider transition-colors";

  return (
    <nav aria-label="ページ送り" className="mt-14">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {currentPage > 1 ? (
            <Link
              href={pageHref(basePath, currentPage - 1)}
              rel="prev"
              aria-label="前のページ"
              className={`${linkClass} border border-ink/10 bg-white text-ink/70 hover:border-primary/40 hover:text-primary`}
            >
              前へ
            </Link>
          ) : (
            <span
              aria-hidden="true"
              className={`${linkClass} border border-ink/5 bg-white text-ink/25`}
            >
              前へ
            </span>
          )}
        </li>

        {pages.map((page) => (
          <li key={page}>
            {page === currentPage ? (
              <span
                aria-current="page"
                className={`${linkClass} bg-primary text-white`}
              >
                {page}
              </span>
            ) : (
              <Link
                href={pageHref(basePath, page)}
                aria-label={`${page}ページ目`}
                className={`${linkClass} border border-ink/10 bg-white text-ink/70 hover:border-primary/40 hover:text-primary`}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        <li>
          {currentPage < totalPages ? (
            <Link
              href={pageHref(basePath, currentPage + 1)}
              rel="next"
              aria-label="次のページ"
              className={`${linkClass} border border-ink/10 bg-white text-ink/70 hover:border-primary/40 hover:text-primary`}
            >
              次へ
            </Link>
          ) : (
            <span
              aria-hidden="true"
              className={`${linkClass} border border-ink/5 bg-white text-ink/25`}
            >
              次へ
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
