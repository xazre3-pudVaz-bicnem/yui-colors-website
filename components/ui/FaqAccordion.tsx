import type { FaqItem } from "@/data/faq";

/** details/summaryベースのアコーディオン（JS不要・アクセシブル） */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-ink/5 bg-white open:shadow-[0_8px_30px_-16px_rgba(15,88,153,0.2)]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
            <span className="flex items-baseline gap-4">
              <span className="font-serif text-primary/60">Q</span>
              <span className="text-sm leading-relaxed text-ink md:text-base">
                {item.question}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="relative block h-3 w-3 shrink-0 text-primary/60"
            >
              <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
            </span>
          </summary>
          <div className="flex items-baseline gap-4 px-6 pb-6">
            <span className="font-serif text-aisora">A</span>
            <p className="text-sm leading-loose text-ink/70">{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
