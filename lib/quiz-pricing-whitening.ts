// Конфиг цен квиза «Ровный тон» (лазерное осветление, Таджикистан).
// Источник: прайс «Отбеливание & Anti-Acne» STELLA TJ (сомони).
// ЕДИНСТВЕННОЕ место с ценами этого квиза — править тут.

export type ToneZoneId =
  | 'podmyshki'
  | 'bikini'
  | 'koleni'
  | 'lokti'
  | 'bedra'
  | 'lico'
  | 'spina';

export const TONE_ZONES: { id: ToneZoneId; label: string }[] = [
  { id: 'podmyshki', label: 'Подмышки' },
  { id: 'bikini', label: 'Бикини / интимная зона' },
  { id: 'koleni', label: 'Колени' },
  { id: 'lokti', label: 'Локти' },
  { id: 'bedra', label: 'Внутренняя поверхность бёдер' },
  { id: 'lico', label: 'Лицо (пигментация, постакне)' },
  { id: 'spina', label: 'Спина' }
];

// Класс зоны в прайсе отбеливания
const ZONE_CLASS: Record<ToneZoneId, 'S' | 'M' | 'L' | 'XL'> = {
  bikini: 'S',
  lico: 'M',
  podmyshki: 'M',
  koleni: 'L',
  lokti: 'L',
  bedra: 'L',
  spina: 'XL'
};

// Разовая цена / курс 5 (за сеанс и итого) / акция первого визита
const ZONE_PRICE: Record<
  'S' | 'M' | 'L' | 'XL',
  { single: number; per5: number; total5: number; promo: number }
> = {
  S: { single: 220, per5: 178, total5: 890, promo: 110 },
  M: { single: 240, per5: 194, total5: 970, promo: 130 },
  L: { single: 290, per5: 234, total5: 1170, promo: 140 },
  XL: { single: 490, per5: 398, total5: 1990, promo: 170 }
};

type ToneComplex = {
  title: string;
  zones: ToneZoneId[];
  single: number;
  per5: number;
  total5: number;
  promo: number;
};

const COMPLEXES: ToneComplex[] = [
  {
    title: 'Комплекс «Подмышки + бикини»',
    zones: ['podmyshki', 'bikini'],
    single: 390,
    per5: 315,
    total5: 1575,
    promo: 160
  },
  {
    title: 'Комплекс «Подмышки + бикини + колени»',
    zones: ['podmyshki', 'bikini', 'koleni'],
    single: 540,
    per5: 437,
    total5: 2185,
    promo: 180
  },
  {
    title: 'Комплекс «Подмышки + бикини + колени + локти»',
    zones: ['podmyshki', 'bikini', 'koleni', 'lokti'],
    single: 690,
    per5: 558,
    total5: 2790,
    promo: 190
  }
];

// Акция для индивидуальных наборов — по числу зон (сетка комплексов прайса;
// для 4 зон прайс задаёт 190–200, берём нижнюю честную границу)
const PROMO_BY_COUNT: Record<number, number> = { 2: 160, 3: 180, 4: 190 };

export type TonePlan = {
  title: string;
  promoPrice: number;
  regularPrice: number; // разовая цена того же визита без акции
  per5: number; // за процедуру на курсе 5 («оптимальный»)
  total5: number;
};

export function buildTonePlan(selected: ToneZoneId[]): TonePlan {
  const set = new Set(selected);

  const match = COMPLEXES.find(
    (c) => c.zones.length === set.size && c.zones.every((z) => set.has(z))
  );
  if (match) {
    return {
      title: match.title,
      promoPrice: match.promo,
      regularPrice: match.single,
      per5: match.per5,
      total5: match.total5
    };
  }

  if (selected.length === 1) {
    const zone = selected[0];
    const p = ZONE_PRICE[ZONE_CLASS[zone]];
    return {
      title: TONE_ZONES.find((z) => z.id === zone)?.label ?? 'Одна зона',
      promoPrice: p.promo,
      regularPrice: p.single,
      per5: p.per5,
      total5: p.total5
    };
  }

  // Индивидуальный набор: комплекс = сумма разовых −30%,
  // курс 5 = −19% от цены комплекса за сеанс (правила прайса)
  const singleSum = selected.reduce(
    (sum, z) => sum + ZONE_PRICE[ZONE_CLASS[z]].single,
    0
  );
  const complexSingle = Math.round(singleSum * 0.7);
  const per5 = Math.round(complexSingle * 0.81);
  return {
    title: 'Твой набор зон',
    promoPrice: PROMO_BY_COUNT[Math.min(selected.length, 4)] ?? 190,
    regularPrice: complexSingle,
    per5,
    total5: per5 * 5
  };
}
