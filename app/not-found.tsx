import Link from "next/link";

export default function NotFound() {
  return (
    <div className="lake-gradient flex min-h-svh items-center justify-center px-5">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-primary/70">
          404 Not Found
        </p>
        <h1 className="mt-6 font-serif text-2xl leading-relaxed tracking-wide text-ink md:text-3xl">
          ページが見つかりませんでした
        </h1>
        <p className="mt-5 text-sm leading-loose text-ink/60">
          お探しのページは移動または削除された可能性があります。
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 text-sm tracking-wider text-white transition-colors hover:bg-deep"
        >
          ホームへ戻る
        </Link>
      </div>
    </div>
  );
}
