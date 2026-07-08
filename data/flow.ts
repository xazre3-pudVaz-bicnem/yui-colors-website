/** 体験の流れ */

export type FlowStep = {
  step: string;
  title: string;
  description: string;
};

export const flowSteps: FlowStep[] = [
  {
    step: "01",
    title: "予約・問い合わせ",
    description:
      "まずはお電話でご希望の日時をお知らせください。人数やお子さまの年齢、観光の予定に合わせてご相談いただけます。",
  },
  {
    step: "02",
    title: "来店",
    description:
      "大津市真野の工房へお越しください。琵琶湖周辺の観光と組み合わせて、旅の予定に無理なく組み込めます。",
  },
  {
    step: "03",
    title: "色選び・説明",
    description:
      "染めの手順と色の重なり方を、ひとつずつ丁寧にご説明します。迷う時間も、この体験の楽しみのひとつです。",
  },
  {
    step: "04",
    title: "染め体験",
    description:
      "布に色を移していきます。染料がにじみ、広がっていく様子はその場でしか出会えない一度きりの表情です。",
  },
  {
    step: "05",
    title: "仕上げ・持ち帰り",
    description:
      "仕上げをして完成です。世界にひとつだけの作品を、そのまま旅の思い出としてお持ち帰りいただけます。",
  },
];
