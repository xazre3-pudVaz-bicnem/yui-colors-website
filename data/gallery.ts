/**
 * 写真ギャラリー
 * /public/images/ 配下のファイルを差し替えるだけで運用できます。
 */

export type GalleryImage = {
  src: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/dyeing-01.jpg",
    alt: "染料に浸した布に色が広がっていく染め体験の様子",
  },
  {
    src: "/images/workshop-01.jpg",
    alt: "ハンカチ染め体験で色を選んでいる様子",
  },
  {
    src: "/images/workshop-02.jpg",
    alt: "染め上げた作品を乾かしている工房の風景",
  },
  {
    src: "/images/kids.jpg",
    alt: "親子で一緒に布を染めている体験の様子",
  },
  {
    src: "/images/date.jpg",
    alt: "ふたりで色を選びながら染め体験を楽しむ様子",
  },
  {
    src: "/images/lake.jpg",
    alt: "工房の近くに広がる琵琶湖の穏やかな湖面",
  },
];
