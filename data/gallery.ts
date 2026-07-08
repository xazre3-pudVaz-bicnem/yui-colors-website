/**
 * 写真ギャラリー
 * /public/images/ 配下のファイルを差し替え・追加するだけで運用できます。
 */

export type GalleryImage = {
  src: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/gallery-01.jpg",
    alt: "琵琶湖を望む窓辺の席で、布を広げて体験する様子",
  },
  {
    src: "/images/gallery-02.jpg",
    alt: "染料の入った器に布を浸して染めている手元",
  },
  {
    src: "/images/gallery-03.jpg",
    alt: "絞り染めで模様を入れた、桃色の巾着袋",
  },
  {
    src: "/images/gallery-04.jpg",
    alt: "藍色に花の模様を絞り染めしたトートバッグ",
  },
  {
    src: "/images/gallery-05.jpg",
    alt: "桜の模様を染め上げた巾着袋が並ぶ様子",
  },
  {
    src: "/images/gallery-06.jpg",
    alt: "木目にYUI COLORSのロゴが入った工房の看板",
  },
  {
    src: "/images/gallery-07.jpg",
    alt: "桜色に染め上げた絞り模様のトートバッグ",
  },
  {
    src: "/images/gallery-08.jpg",
    alt: "エプロン姿で絞りの糸をほどく仕上げの作業",
  },
  {
    src: "/images/gallery-09.jpg",
    alt: "魚の模様を絞り染めした、水色の巾着袋",
  },
];
