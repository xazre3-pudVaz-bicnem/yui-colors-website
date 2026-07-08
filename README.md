# 染 YUI COLORS 公式サイト

滋賀県大津市真野の染め体験教室「染 YUI COLORS（ソメ ユイ カラーズ）」の公式サイトです。

- 所在地：〒520-0232 滋賀県大津市真野6-29-6
- 電話：080-5029-8467
- Instagram：[@yuicolors2026](https://www.instagram.com/yuicolors2026/)

## 技術構成

- Next.js 16（App Router）+ TypeScript
- Tailwind CSS v4
- フォント：しっぽり明朝（見出し）+ Noto Sans JP（本文）

## 開発

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルド
npm run lint   # ESLint
```

## コンテンツの更新方法

文章・店舗情報・記事はすべて `data/` 配下のファイルで管理しています。

| ファイル | 内容 |
| --- | --- |
| `data/site.ts` | 店舗情報（住所・電話・営業時間・Instagram・本番URL） |
| `data/experiences.ts` | 体験メニュー |
| `data/faq.ts` | よくある質問 |
| `data/blog.ts` | お知らせ・ブログ記事 |
| `data/scenes.ts` / `data/flow.ts` / `data/reasons.ts` / `data/gallery.ts` | トップページ各セクション |

## 写真の差し替え

`public/images/` に規定のファイル名で写真を置くだけで反映されます。
写真がない間は自動的にプレースホルダーが表示されます。
詳細は [public/images/README.md](public/images/README.md) を参照してください。

## 公開前のTODO

- [ ] `data/site.ts` の `url` を本番ドメインに変更する（canonical / OGP / sitemap に反映されます）
- [ ] 営業時間・定休日・料金・駐車場の確定情報を `data/site.ts` と `data/experiences.ts` に反映する
- [ ] `public/images/` に実際の写真を配置する（`og-image.jpg` 含む）
- [ ] お問い合わせフォームの送信処理を `app/api/contact/route.ts` に実装する
