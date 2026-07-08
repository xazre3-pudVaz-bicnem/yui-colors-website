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

## ブログの自動投稿（Claude API + GitHub Actions）

毎日11:00（JST）に、Claude APIがブログ記事を1本自動生成して `content/blog/` にコミットします。
Vercel連携により、pushされると自動でサイトに公開されます。

- ワークフロー: `.github/workflows/daily-blog.yml`（手動実行も可能: Actions → Daily blog post → Run workflow）
- 生成スクリプト: `scripts/generate-daily-post.ts`（ローカル実行: `npm run generate:post`）
- 記事の置き場所: `content/blog/*.md`（frontmatter付きMarkdown。手書き記事の追加もこの形式でOK）
- 記事の読み込み: `lib/blog.ts` が `content/blog/` と `data/blog.ts`（初期8記事）を統合して一覧・詳細・カテゴリ・sitemapへ供給
- カテゴリページ: `/blog/category/{kanko|oyako|date|hajimete|tanoshimikata}`
- 使用モデル: 既定は `claude-haiku-4-5-20251001`。リポジトリ変数 `ANTHROPIC_MODEL` で上書き可能
- 必要なGitHub Secret: `ANTHROPIC_API_KEY`（Settings → Secrets and variables → Actions で設定）
- 品質ガード: 禁止表現（にじむ・ハンカチ・誇大表現）や文字数・見出し構成をスクリプト側で検証し、不合格なら最大3回再生成

## 運用メモ

- 本番ドメイン：https://someyuicolors.com（`data/site.ts` の `url`）
- 営業時間・定休日・料金・アクセスなどの店舗情報は確定済み（`data/site.ts`・`data/experiences.ts`）
- お問い合わせフォームは mailto 方式（some.yui.colors@gmail.com 宛）。
  サーバー送信に切り替える場合は `app/api/contact/route.ts` に実装する
- 文言ルール：店の自称は「工房」／染料の表現は「染み込む」（「にじむ」は使わない）／
  体験メニューにハンカチは含まれない（トートバッグ・巾着・ストール）
