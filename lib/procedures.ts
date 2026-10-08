// Новые процедуры STELLA Таджикистан: лазерное отбеливание (+ анти-акне)
// и лазерное омоложение (+ антикупероз).
// ЕДИНСТВЕННЫЙ источник цен для страниц /otbelivanie, /omolozhenie и квиза
// «Ровный тон» (lib/quiz-pricing-whitening.ts читает отсюда).
// Цены — утверждённый прайс TJ, сомони. Одинаковы для Душанбе и Худжанда.

export type CoursePrice = {
  single: number; // разовая процедура
  per3: number; // за сеанс в абонементе на 3 процедуры
  total3: number;
  per5: number; // за сеанс в абонементе на 5 процедур («оптимальный»)
  total5: number;
  per7: number; // за сеанс в абонементе на 7 процедур
  total7: number;
  promo: number; // первое посещение по акции
};

// ── Отбеливание & Anti-Acne ────────────────────────────────────────────────

export type WhiteningClass = 'S' | 'M' | 'L' | 'XL';

export const WHITENING_CLASSES: Record<
  WhiteningClass,
  CoursePrice & { zones: string }
> = {
  S: {
    zones: 'Классическое бикини, аногенитальная зона',
    single: 220, per3: 197, total3: 590, per5: 178, total5: 890, per7: 164, total7: 1150, promo: 110
  },
  M: {
    zones: 'Лицо, подмышки',
    single: 240, per3: 215, total3: 645, per5: 194, total5: 970, per7: 179, total7: 1250, promo: 130
  },
  L: {
    zones: 'Колени, локти, внутренняя поверхность бёдер, глубокое бикини, голени',
    single: 290, per3: 259, total3: 775, per5: 234, total5: 1170, per7: 214, total7: 1500, promo: 140
  },
  XL: {
    zones: 'Спина полностью',
    single: 490, per3: 440, total3: 1320, per5: 398, total5: 1990, per7: 366, total7: 2560, promo: 170
  }
};

export type WhiteningComplexId = 'k1' | 'k2' | 'k3';

export const WHITENING_COMPLEXES: (CoursePrice & {
  id: WhiteningComplexId;
  title: string;
})[] = [
  {
    id: 'k1',
    title: 'Подмышки + бикини',
    single: 390, per3: 350, total3: 1050, per5: 315, total5: 1575, per7: 290, total7: 2030, promo: 160
  },
  {
    id: 'k2',
    title: 'Подмышки + бикини + колени',
    single: 540, per3: 485, total3: 1455, per5: 437, total5: 2185, per7: 402, total7: 2815, promo: 180
  },
  {
    id: 'k3',
    title: 'Подмышки + бикини + колени + локти',
    single: 690, per3: 620, total3: 1860, per5: 558, total5: 2790, per7: 513, total7: 3590, promo: 190
  }
];

// ── Лазерное омоложение ────────────────────────────────────────────────────

export const REJUVENATION_ITEMS: (CoursePrice & { id: string; title: string })[] = [
  {
    id: 'lico',
    title: 'Лицо',
    single: 290, per3: 283, total3: 850, per5: 258, total5: 1290, per7: 231, total7: 1620, promo: 110
  },
  {
    id: 'sheya',
    title: 'Шея',
    single: 290, per3: 283, total3: 850, per5: 258, total5: 1290, per7: 231, total7: 1620, promo: 130
  },
  {
    id: 'dekolte',
    title: 'Декольте',
    single: 290, per3: 283, total3: 850, per5: 258, total5: 1290, per7: 231, total7: 1620, promo: 140
  },
  {
    id: 'lico-sheya',
    title: 'Лицо + шея',
    single: 410, per3: 390, total3: 1170, per5: 355, total5: 1775, per7: 325, total7: 2275, promo: 160
  },
  {
    id: 'lico-sheya-dekolte',
    title: 'Лицо + шея + декольте',
    single: 540, per3: 510, total3: 1530, per5: 465, total5: 2325, per7: 425, total7: 2975, promo: 180
  }
];

// Минимальные цены — для заголовков и карточек «от …»
export const WHITENING_MIN_PRICE = Math.min(
  ...Object.values(WHITENING_CLASSES).map((c) => c.single)
);
export const WHITENING_MIN_PROMO = Math.min(
  ...Object.values(WHITENING_CLASSES).map((c) => c.promo)
);
export const REJUVENATION_MIN_PRICE = Math.min(
  ...REJUVENATION_ITEMS.map((i) => i.single)
);
export const REJUVENATION_MIN_PROMO = Math.min(
  ...REJUVENATION_ITEMS.map((i) => i.promo)
);

// WhatsApp студий Таджикистана для записи на новые процедуры
export const TJ_WHATSAPP_NUMBER = '992977607711';

export function waLink(text: string): string {
  return `https://wa.me/${TJ_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
