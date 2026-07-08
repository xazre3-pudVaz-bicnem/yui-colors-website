"use client";

import Image from "next/image";
import { useState } from "react";

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * /public/images/ の写真を表示するコンポーネント。
 * 画像ファイルがまだ用意されていない間は、湖面を思わせる
 * 上品なプレースホルダーを自動表示する。
 * 実写真を /public/images/ に置くだけで差し替えが完了する。
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 bg-gradient-to-br from-mist via-fog to-aisora"
        >
          <div className="absolute -left-1/4 top-1/4 h-3/4 w-3/4 rounded-full bg-white/40 blur-3xl" />
          <div className="absolute -right-1/4 bottom-0 h-2/3 w-2/3 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-xs tracking-[0.35em] text-primary/50">
              染 YUI COLORS
            </span>
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
