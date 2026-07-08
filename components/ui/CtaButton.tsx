import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "tel";
  className?: string;
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm tracking-wider transition-colors duration-300";

const variantClass = {
  primary: "bg-primary text-white hover:bg-deep",
  outline:
    "border border-primary/40 bg-white/70 text-primary hover:border-primary hover:bg-white",
  tel: "border border-ink/15 bg-white text-ink hover:border-primary/40 hover:text-primary",
} as const;

export default function CtaButton({
  href,
  children,
  variant = "primary",
  className = "",
}: CtaButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:");
  const cls = `${baseClass} ${variantClass[variant]} ${className}`;

  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
