import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CtaButton from "@/components/ui/CtaButton";
import { site } from "@/data/site";

export default function AccessSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading
            eyebrow="Access"
            title="アクセス"
            lead="琵琶湖大橋にほど近い、大津市真野エリア。JR湖西線「小野駅」から徒歩5分、駐車場もございます。"
          />
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2 md:gap-14">
          <Reveal>
            <dl className="space-y-5 text-sm md:text-base">
              <div className="flex gap-6 border-b border-ink/5 pb-5">
                <dt className="w-24 shrink-0 text-ink/50">所在地</dt>
                <dd className="text-ink/80">{site.address.full}</dd>
              </div>
              <div className="flex gap-6 border-b border-ink/5 pb-5">
                <dt className="w-24 shrink-0 text-ink/50">最寄駅</dt>
                <dd className="text-ink/80">{site.station}</dd>
              </div>
              <div className="flex gap-6 border-b border-ink/5 pb-5">
                <dt className="w-24 shrink-0 text-ink/50">電話番号</dt>
                <dd>
                  <a
                    href={site.telHref}
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {site.tel}
                  </a>
                </dd>
              </div>
              <div className="flex gap-6 border-b border-ink/5 pb-5">
                <dt className="w-24 shrink-0 text-ink/50">営業時間</dt>
                <dd className="text-ink/80">{site.hours}</dd>
              </div>
              <div className="flex gap-6 border-b border-ink/5 pb-5">
                <dt className="w-24 shrink-0 text-ink/50">定休日</dt>
                <dd className="text-ink/80">{site.closed}</dd>
              </div>
              <div className="flex gap-6 border-b border-ink/5 pb-5">
                <dt className="w-24 shrink-0 text-ink/50">駐車場</dt>
                <dd className="text-ink/80">{site.parking}</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CtaButton href="/access" variant="outline">
                アクセスをくわしく見る
              </CtaButton>
              <CtaButton href={site.mapUrl} variant="tel">
                Googleマップで開く
              </CtaButton>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="overflow-hidden rounded-3xl border border-ink/5">
              <iframe
                src={site.mapEmbedUrl}
                title={`${site.name}の地図（${site.address.full}）`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full md:h-full md:min-h-96"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
