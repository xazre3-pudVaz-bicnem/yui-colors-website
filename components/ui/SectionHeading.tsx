type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
};

/** セクション見出し（英字の小見出し＋明朝の日本語見出し） */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  as: Tag = "h2",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  return (
    <div className={`${alignClass} mb-12 md:mb-16`}>
      <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary/70">
        {eyebrow}
      </p>
      <Tag className="font-serif text-2xl leading-relaxed tracking-wide text-ink md:text-4xl md:leading-relaxed">
        {title}
      </Tag>
      {lead && (
        <p
          className={`mt-6 text-sm leading-loose text-ink/70 md:text-base ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
