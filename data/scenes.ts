/** トップページ「体験シーン別導線」のデータ */

export type Scene = {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const scenes: Scene[] = [
  {
    href: "/kids",
    eyebrow: "With Kids",
    title: "親子・子供と一緒に",
    description:
      "小さな手で色を選び、布に染めていく時間は、子供にとって忘れられない体験になります。大津市で親子の思い出づくりを探している方に。",
    image: "/images/kids.jpg",
    imageAlt: "丸い模様を絞り染めした、からし色の小さなトートバッグ",
  },
  {
    href: "/date",
    eyebrow: "Couples & Friends",
    title: "デート・女子旅で",
    description:
      "静かな工房で、それぞれの色を選ぶ。カップルにも、3・4人で一緒に楽しむ女子旅にも合う、落ち着いた大津の過ごし方です。",
    image: "/images/date.jpg",
    imageAlt: "琵琶湖を望む窓辺で、ふたり並んで絞りの作業をする様子",
  },
  {
    href: "/otsu-tourism",
    eyebrow: "With Sightseeing",
    title: "大津市観光の立ち寄りに",
    description:
      "琵琶湖や比叡山など、大津観光のあいまに立ち寄れる染め工房。旅の途中に、形に残る思い出をひとつ加えませんか。",
    image: "/images/lake.jpg",
    imageAlt: "夕暮れに染まる琵琶湖と対岸の山なみ",
  },
  {
    href: "/experience",
    eyebrow: "Rainy Day",
    title: "雨の日の屋内体験に",
    description:
      "染め体験はすべて屋内で楽しめます。予定していた観光が雨で難しくなった日も、ゆっくり色と向き合う時間に変えられます。",
    image: "/images/dyeing-01.jpg",
    imageAlt: "藍から浅葱へ、グラデーションに染め上げたストール",
  },
];
