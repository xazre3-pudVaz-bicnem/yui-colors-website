import Link from "next/link";
import Image from "next/image";
import { site, fullNav } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink/5 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-4">
              <Image
                src="/images/logo-mark.jpg"
                alt={`${site.name}のロゴ`}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full mix-blend-multiply"
              />
              <span>
                <span className="block text-base uppercase tracking-[0.3em] text-ink">
                  YUI COLORS
                </span>
                <span className="mt-1 block text-xs tracking-widest text-ink/50">
                  {site.nameReading}
                </span>
              </span>
            </Link>
            <div className="mt-8 space-y-2 text-sm leading-relaxed text-ink/70">
              <p>{site.address.full}</p>
              <p>
                電話：
                <a
                  href={site.telHref}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {site.tel}
                </a>
              </p>
              <p>営業時間：{site.hours}</p>
              <p>定休日：{site.closed}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wider text-primary underline-offset-4 hover:underline"
              >
                Googleマップで見る
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wider text-primary underline-offset-4 hover:underline"
              >
                Instagram {site.instagram.handle}
              </a>
            </div>
          </div>

          <nav aria-label="フッターナビゲーション">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {fullNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink/70 transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 border-t border-ink/5 pt-6 text-center">
          <p className="text-xs tracking-wider text-ink/40">
            &copy; {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
