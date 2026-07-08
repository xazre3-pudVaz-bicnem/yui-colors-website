"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site, primaryNav, fullNav } from "@/data/site";

/**
 * 固定ヘッダー。最上部では透過し、スクロールすると白背景が現れる。
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ドロワー表示中は背面のスクロールを止める
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-ink/5 bg-white/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-serif text-xl tracking-widest text-ink md:text-2xl">
            染
          </span>
          <span className="text-sm uppercase tracking-[0.3em] text-ink md:text-base">
            YUI COLORS
          </span>
        </Link>

        <nav aria-label="メインナビゲーション" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm tracking-wider transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-ink/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="rounded-full bg-primary px-6 py-2.5 text-sm tracking-wider text-white transition-colors hover:bg-deep"
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* モバイルドロワー */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-white transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          aria-label="モバイルナビゲーション"
          className="flex h-full flex-col overflow-y-auto px-8 pb-24 pt-8"
        >
          <ul className="space-y-1">
            {fullNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-ink/5 py-4 font-serif text-lg tracking-wider transition-colors ${
                    pathname === item.href ? "text-primary" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <p className="text-xs tracking-wider text-ink/50">
              ご予約・お問い合わせ
            </p>
            <a
              href={site.telHref}
              className="mt-2 inline-block font-serif text-2xl tracking-widest text-primary"
            >
              {site.tel}
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block text-sm tracking-wider text-ink/60"
            >
              Instagram {site.instagram.handle}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
