import { NextResponse } from "next/server";

/**
 * お問い合わせフォームの送信先（スタブ）。
 *
 * TODO: 本番運用時にメール送信やスプレッドシート連携を追加する。
 * 例：
 *   - Resend / SendGrid でのメール送信
 *   - Google Forms / スプレッドシートへの転記
 *   - LINE通知
 * バリデーション済みの `payload` をそのまま渡せる構造にしてある。
 */
export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (
    !payload ||
    typeof payload.name !== "string" ||
    typeof payload.phone !== "string" ||
    typeof payload.message !== "string" ||
    !payload.name.trim() ||
    !payload.phone.trim() ||
    !payload.message.trim()
  ) {
    return NextResponse.json(
      { ok: false, error: "入力内容が不足しています" },
      { status: 400 }
    );
  }

  // ここに送信処理を実装する（現在は受付のみ）
  console.log("[contact] お問い合わせを受信しました:", payload);

  return NextResponse.json({ ok: true });
}
