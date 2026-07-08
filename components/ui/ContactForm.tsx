"use client";

import { useState } from "react";
import { site } from "@/data/site";

type FormStatus = "idle" | "sending" | "done" | "error";

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10";

/**
 * お問い合わせフォーム。
 * 送信先は /api/contact（現在はスタブ）。
 * 実際のメール送信やスプレッドシート連携は app/api/contact/route.ts に追加する。
 */
export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("送信に失敗しました");
      form.reset();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl bg-mist p-10 text-center">
        <p className="font-serif text-lg tracking-wide text-ink">
          お問い合わせを受け付けました
        </p>
        <p className="mt-4 text-sm leading-loose text-ink/70">
          内容を確認のうえ、折り返しご連絡いたします。
          <br />
          お急ぎの場合は、お電話（
          <a href={site.telHref} className="text-primary">
            {site.tel}
          </a>
          ）にてお問い合わせください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm text-ink/70">
          お名前
          <span className="ml-2 text-xs text-primary">必須</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="例：山田 花子"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm text-ink/70">
          電話番号
          <span className="ml-2 text-xs text-primary">必須</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="例：090-0000-0000"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-ink/70">
          メールアドレス
          <span className="ml-2 text-xs text-ink/40">任意</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="例：example@example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-ink/70">
          お問い合わせ内容
          <span className="ml-2 text-xs text-primary">必須</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="ご希望の日時・人数・気になることなど、お気軽にお書きください。"
          className={inputClass}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          送信できませんでした。お手数ですが、お電話（{site.tel}
          ）にてお問い合わせください。
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-primary px-8 py-4 text-sm tracking-wider text-white transition-colors hover:bg-deep disabled:opacity-60"
      >
        {status === "sending" ? "送信しています" : "この内容で送信する"}
      </button>
    </form>
  );
}
