export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  body: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "lastik-omrunu-uzatmanin-yollari",
    title: "Lastik Ömrünü Uzatmanın Yolları",
    excerpt: "Doğru basınç, düzenli rotasyon ve sürüş alışkanlıkları ile lastik ömrünüzü uzatın.",
    date: "2025-01-05",
    body: [
      "Lastikler aracın yol ile tek temas noktasıdır ve ömürleri doğrudan güvenliği etkiler. Basıncı ayda bir soğuk lastik üzerinde ölçmek en temel adımdır.",
      "Her 8.000–10.000 km'de rotasyon, aşınmayı dengeler. Ön çekişli araçlarda ön lastikler daha hızlı tükendiği için bu rotasyon özellikle önemlidir.",
      "Ani hızlanma ve sert frenlemeler diş derinliğini hızla azaltır. Dengeli sürüş, lastik ömrünü %20'ye kadar uzatabilir.",
      "Depolama sırasında lastikler serin ve karanlık bir yerde, dikey konumda tutulmalıdır. Doğrudan güneş ışığı kauçuk sertleşmesini hızlandırır.",
    ],
  },
  {
    slug: "aku-bakimi-nasil-yapilir",
    title: "Akü Bakımı Nasıl Yapılır?",
    excerpt: "Kutup başlarının temizliği, voltaj testi ve kısa mesafe sürüşün akü ömrüne etkisi.",
    date: "2025-01-12",
    body: [
      "Akü kutup başlarında biriken beyaz oksit tabakası şarj verimini düşürür. Sıcak su ve karbonat karışımı ile temizlik yapılabilir.",
      "Sağlıklı bir aracın akü voltajı motor çalışmıyorken 12.4–12.7 V arasında olmalıdır. 12.2 V altına düşen aküler zayıflamaya başlamıştır.",
      "Sık kısa mesafe kullanım aküyü tam şarj etmez; ayda bir 30–40 dakikalık uzun yol akü için faydalıdır.",
      "Kışın soğuk hava, akü kapasitesini %30'a kadar düşürebilir. 4 yaş üstü aküleri kış öncesi mutlaka test ettirin.",
    ],
  },
  {
    slug: "motor-yagi-secerken-nelere-dikkat",
    title: "Motor Yağı Seçerken Nelere Dikkat Edilmeli?",
    excerpt: "Viskozite, API/ACEA standartları ve turbo motorlarda tam sentetik yağın önemi.",
    date: "2025-01-20",
    body: [
      "Motor yağı seçiminde ilk kriter üreticinin viskozite (ör. 5W-30, 0W-20) ve API/ACEA onayıdır. Kullanıcı kılavuzunda net biçimde belirtilir.",
      "Turbo motorlar yüksek sıcaklıkta çalıştığı için tam sentetik yağ kullanılmalıdır. Yarı sentetik seçenekler bu motorlarda ömrü kısaltabilir.",
      "Dizel motorlarda DPF uyumlu 'low SAPS' (düşük kül) yağlar tercih edilmelidir; aksi halde partikül filtresi hızla tıkanır.",
      "Yağ değişim aralığını sadece km ile değil, süre (yıl) ile de takip etmek önemlidir; az kullanılan araçlarda yağ zamanla oksitlenir.",
    ],
  },
];
