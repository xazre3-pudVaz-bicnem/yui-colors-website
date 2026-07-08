"use client";

import { useState } from "react";
import { site } from "@/data/site";

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/10";

/**
 * お問い合わせフォーム。
 * 送信ボタンでメールアプリが起動し、入力内容が
 * site.email（some.yui.colors@gmail.com）宛にセットされる。
 * 将来サーバー送信に切り替える場合は app/api/contact/route.ts を利用する。
 */
export default function ContactForm() {
  const [opened, setOpened] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    const subject = `【染 YUI COLORS】お問い合わせ（${name}様）`;
    const body = [
      `お名前: ${name}`,
      `電話番号: ${phone}`,
      email ? `メールアドレス: ${email}` : null,
      "",
      "お問い合わせ内容:",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
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
          placeholder="ご希望のコース・日時・人数・気になることなど、お気軽にお書きください。"
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-primary px-8 py-4 text-sm tracking-wider text-white transition-colors hover:bg-deep"
      >
        メールで送信する
      </button>

      <p className="text-center text-xs leading-relaxed text-ink/50">
        送信ボタンを押すと、お使いのメールアプリが起動し、
        入力内容が宛先（{site.email}）にセットされます。
        {opened && (
          <span className="mt-2 block text-primary">
            メールアプリが開かない場合は、お手数ですが {site.email}{" "}
            まで直接ご連絡ください。
          </span>
        )}
      </p>
    </form>
  );
}
