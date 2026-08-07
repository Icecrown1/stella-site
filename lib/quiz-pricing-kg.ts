// Конфиг цен квиза — КЫРГЫЗСТАН (Бишкек и Ош, прайс единый).
// Источник: PRICE LIST PREMIUM (сом) + акционный прайс первого визита.
// ЕДИНСТВЕННОЕ место с ценами КГ-квиза — править тут.

export type ZoneId =
  | 'bikini'
  | 'podmyshki'
  | 'nogi'
  | 'goleni'
  | 'ruki'
  | 'lico'
  | 'vse_telo';

export type CityKg = 'Бишкек' | 'Ош';

export const ZONES: { id: ZoneId; label: string }[] = [
  { id: 'bikini', label: 'Глубокое бикини' },
  { id: 'podmyshki', label: 'Подмышки' },
  { id: 'nogi', label: 'Ноги полностью' },
  { id: 'goleni', label: 'Голени' },
  { id: 'ruki', label: 'Руки' },
  { id: 'lico', label: 'Лицо (верхняя губа / подбородок)' },
  { id: 'vse_telo', label: 'Всё тело' }
];

// Класс зоны в прайсе. «Руки» = руки полностью (L): при «до локтя»
// мастер пересчитает дешевле (M) — сюрприз только приятный.
const ZONE_CLASS: Record<Exclude<ZoneId, 'vse_telo'>, 'S' | 'M' | 'L' | 'XL'> = {
  lico: 'S',
  podmyshki: 'M',
  bikini: 'L',
  goleni: 'L',
  ruki: 'L',
  nogi: 'XL'
};

// Разовая цена зоны, сом
const ZONE_SINGLE: Record<'S' | 'M' | 'L' | 'XL', number> = {
  S: 610,
  M: 1090,
  L: 1860,
  XL: 2740
};

// Курс 9 по зоне: зональных абонементов в прайсе нет — считаем −30%
// (ровно та скидка, что зашита во все комплексы прайса), округляя до 10.
function zoneCourse9PerProc(cls: 'S' | 'M' | 'L' | 'XL'): number {
  return Math.round((ZONE_SINGLE[cls] * 0.7) / 10) * 10;
}

type ComplexDef = {
  title: string;
  zones: ZoneId[];
  promo: number;
  single: number; // разовая цена без абонемента
  perProc9: number;
  total9: number;
};

const COMPLEXES: ComplexDef[] = [
  {
    title: 'Комплекс №1 «Подмышки + бикини»',
    zones: ['podmyshki', 'bikini'],
    promo: 990,
    single: 2890,
    perProc9: 2020,
    total9: 18180
  },
  {
    title: 'Комплекс №2 «Голени + бикини»',
    zones: ['goleni', 'bikini'],
    promo: 990,
    single: 3490,
    perProc9: 2440,
    total9: 21960
  },
  {
    title: 'Комплекс №3 «Подмышки + бикини + голени»',
    zones: ['podmyshki', 'bikini', 'goleni'],
    promo: 1290,
    single: 3990,
    perProc9: 2790,
    total9: 25110
  },
  {
    title: 'Комплекс №4 «Руки + ноги полностью»',
    zones: ['ruki', 'nogi'],
    promo: 990,
    single: 4490,
    perProc9: 3140,
    total9: 28260
  },
  {
    title: 'Комплекс №5 «Подмышки + бикини + ноги полностью»',
    zones: ['podmyshki', 'bikini', 'nogi'],
    promo: 1490,
    single: 4990,
    perProc9: 3490,
    total9: 31410
  },
  {
    title: 'Комплекс №7 «Подмышки + бикини + ноги + руки»',
    zones: ['podmyshki', 'bikini', 'nogi', 'ruki'],
    promo: 2490,
    single: 6290,
    perProc9: 4390,
    total9: 39510
  }
];

const VSE_TELO = {
  title: 'Комплекс №8 «Всё тело»',
  promo: 3990,
  single: 7490,
  perProc9: 5240,
  total9: 47160
};

// Особый набор из акционного прайса: руки+ноги+бикини+подмышки+лицо → акция 2990.
// По курсу его выгоднее закрывает «Всё тело» (5240 < суммы зон), поэтому
// рекомендация — №8, но акция первого визита — именно 2990 для этого набора.
const FIVE_SET: ZoneId[] = ['ruki', 'nogi', 'bikini', 'podmyshki', 'lico'];

// Акция первого визита по числу зон (из акционного прайса)
const PROMO_BY_COUNT: Record<number, number> = { 1: 790, 2: 990, 3: 1290, 4: 1490 };

export type Plan = {
  title: string;
  promoPrice: number;
  regularPrice: number; // разовая цена того же визита без акции
  course9PerProc: number;
  course9Total: number;
};

export function buildPlanKg(selected: ZoneId[]): Plan {
  const set = new Set(selected);
  const real = selected.filter((z) => z !== 'vse_telo');

  const isFiveSet =
    real.length === FIVE_SET.length && FIVE_SET.every((z) => set.has(z));

  // Всё тело: явный выбор или 5+ зон
  if (set.has('vse_telo') || real.length >= 5) {
    return {
      title: VSE_TELO.title,
      promoPrice: isFiveSet ? 2990 : VSE_TELO.promo,
      regularPrice: VSE_TELO.single,
      course9PerProc: VSE_TELO.perProc9,
      course9Total: VSE_TELO.total9
    };
  }

  // Точное совпадение с комплексом прайса
  const match = COMPLEXES.find(
    (c) => c.zones.length === real.length && c.zones.every((z) => set.has(z))
  );
  if (match) {
    return {
      title: match.title,
      promoPrice: match.promo,
      regularPrice: match.single,
      course9PerProc: match.perProc9,
      course9Total: match.total9
    };
  }

  // Одна зона
  if (real.length === 1) {
    const zone = real[0] as Exclude<ZoneId, 'vse_telo'>;
    const per = zoneCourse9PerProc(ZONE_CLASS[zone]);
    return {
      title: ZONES.find((z) => z.id === zone)?.label ?? 'Одна зона',
      promoPrice: 790,
      regularPrice: ZONE_SINGLE[ZONE_CLASS[zone]],
      course9PerProc: per,
      course9Total: per * 9
    };
  }

  // Произвольный набор 2–4 зон: сумма курсов зон, акция — по числу зон
  const per = real.reduce(
    (sum, z) => sum + zoneCourse9PerProc(ZONE_CLASS[z as Exclude<ZoneId, 'vse_telo'>]),
    0
  );
  const regular = real.reduce(
    (sum, z) => sum + ZONE_SINGLE[ZONE_CLASS[z as Exclude<ZoneId, 'vse_telo'>]],
    0
  );
  return {
    title: 'Твой набор зон',
    promoPrice: PROMO_BY_COUNT[real.length] ?? 1490,
    regularPrice: regular,
    course9PerProc: per,
    course9Total: per * 9
  };
}

// Калькулятор экономии за 5 лет — бытовые цены Бишкека/Оша, сом
export const METHOD_COST_PER_TIME: Record<string, number> = {
  shave: 120,
  sugaring: 800,
  cream: 200
};

export type FreqOption = { id: string; label: string; perYear: number };

export const FREQ_OPTIONS: Record<string, FreqOption[]> = {
  shave: [
    { id: 'sh1', label: 'Каждые 2–3 дня', perYear: 120 },
    { id: 'sh2', label: 'Примерно раз в неделю', perYear: 52 },
    { id: 'sh3', label: 'Раз в 2–3 недели', perYear: 20 },
    { id: 'sh4', label: 'Раз в месяц и реже', perYear: 12 }
  ],
  sugaring: [
    { id: 'su1', label: 'Раз в 2–3 недели', perYear: 20 },
    { id: 'su2', label: 'Примерно раз в месяц', perYear: 12 },
    { id: 'su3', label: 'Раз в полтора-два месяца', perYear: 7 },
    { id: 'su4', label: 'Нерегулярно — как получится', perYear: 10 }
  ],
  cream: [
    { id: 'cr1', label: 'Примерно раз в неделю', perYear: 52 },
    { id: 'cr2', label: 'Раз в 2–3 недели', perYear: 20 },
    { id: 'cr3', label: 'Примерно раз в месяц', perYear: 12 },
    { id: 'cr4', label: 'Реже раза в месяц', perYear: 8 }
  ]
};

export function fiveYearSpend(method: string, perYear: number): number | null {
  const cost = METHOD_COST_PER_TIME[method];
  if (!cost || !perYear) return null;
  return cost * perYear * 5;
}
