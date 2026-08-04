// Конфиг цен квиза «Твой план гладкости».
// Источник: ПРЕМИУМ-прайс STELLA (Душанбе и Худжанд, актуальный) + акционный
// прайс первого визита. ЕДИНСТВЕННОЕ место с ценами квиза — править тут.

export type ZoneId =
  | 'bikini'
  | 'podmyshki'
  | 'nogi'
  | 'goleni'
  | 'ruki'
  | 'lico'
  | 'vse_telo';

export type City = 'Душанбе' | 'Худжанд';

export const ZONES: { id: ZoneId; label: string }[] = [
  { id: 'bikini', label: 'Глубокое бикини' },
  { id: 'podmyshki', label: 'Подмышки' },
  { id: 'nogi', label: 'Ноги полностью' },
  { id: 'goleni', label: 'Голени' },
  { id: 'ruki', label: 'Руки' },
  { id: 'lico', label: 'Лицо (верхняя губа / подбородок)' },
  { id: 'vse_telo', label: 'Всё тело' }
];

// Класс зоны в прайсе: S / M / L / XL.
// «Руки» из квиза считаем как «руки полностью» (класс L) — при выборе
// «до локтя» мастер пересчитает дешевле (класс M), сюрприз только приятный.
const ZONE_CLASS: Record<Exclude<ZoneId, 'vse_telo'>, 'S' | 'M' | 'L' | 'XL'> = {
  lico: 'S',
  podmyshki: 'M',
  bikini: 'L', // глубокое бикини
  goleni: 'L',
  ruki: 'L',
  nogi: 'XL'
};

// Цена абонемента зоны на 9 сеансов (итого за курс)
const ZONE_COURSE9_TOTAL: Record<City, Record<'S' | 'M' | 'L' | 'XL', number>> = {
  Душанбе: { S: 450, M: 990, L: 1260, XL: 1665 },
  Худжанд: { S: 380, M: 760, L: 1070, XL: 1260 }
};

// Комплексы: наборы зон, цена за процедуру на курсе 9 и абонемент 9 целиком
type ComplexDef = {
  num: number;
  title: string;
  zones: ZoneId[]; // точное соответствие набору из квиза
  promo: number; // акция первого визита
  perProc9: Record<City, number>;
  total9: Record<City, number>;
};

const COMPLEXES: ComplexDef[] = [
  {
    num: 1,
    title: 'Комплекс №1 «Подмышки + бикини»',
    zones: ['podmyshki', 'bikini'],
    promo: 100,
    perProc9: { Душанбе: 245, Худжанд: 182 },
    total9: { Душанбе: 2205, Худжанд: 1640 }
  },
  {
    num: 2,
    title: 'Комплекс №2 «Подмышки + бикини + голени»',
    zones: ['podmyshki', 'bikini', 'goleni'],
    promo: 150,
    perProc9: { Душанбе: 300, Худжанд: 217 },
    total9: { Душанбе: 2700, Худжанд: 1950 }
  },
  {
    num: 3,
    title: 'Комплекс №3 «Подмышки + бикини + ноги полностью»',
    zones: ['podmyshki', 'bikini', 'nogi'],
    promo: 200,
    perProc9: { Душанбе: 385, Худжанд: 246 },
    total9: { Душанбе: 3465, Худжанд: 2210 }
  },
  {
    num: 5,
    title: 'Комплекс №5 «Подмышки + бикини + ноги + руки»',
    zones: ['podmyshki', 'bikini', 'nogi', 'ruki'],
    promo: 300,
    perProc9: { Душанбе: 505, Худжанд: 329 },
    total9: { Душанбе: 4545, Худжанд: 2960 }
  }
];

const VSE_TELO = {
  title: 'Комплекс №6 «Всё тело»',
  promo: 350,
  perProc9: { Душанбе: 570, Худжанд: 405 } as Record<City, number>,
  total9: { Душанбе: 5130, Худжанд: 3650 } as Record<City, number>
};

// Акция первого визита по отдельным зонам
function zonePromo(zone: ZoneId): number {
  return zone === 'nogi' ? 150 : 75;
}

export type Plan = {
  title: string;
  promoPrice: number;
  course9PerProc: number;
  course9Total: number;
};

export function buildPlan(selected: ZoneId[], city: City): Plan {
  const set = new Set(selected);
  const real = selected.filter((z) => z !== 'vse_telo');

  // Всё тело: явный выбор или 5+ зон
  if (set.has('vse_telo') || real.length >= 5) {
    return {
      title: VSE_TELO.title,
      promoPrice: VSE_TELO.promo,
      course9PerProc: VSE_TELO.perProc9[city],
      course9Total: VSE_TELO.total9[city]
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
      course9PerProc: match.perProc9[city],
      course9Total: match.total9[city]
    };
  }

  // Одна зона
  if (real.length === 1) {
    const zone = real[0] as Exclude<ZoneId, 'vse_telo'>;
    const cls = ZONE_CLASS[zone];
    const total = ZONE_COURSE9_TOTAL[city][cls];
    return {
      title: ZONES.find((z) => z.id === zone)?.label ?? 'Одна зона',
      promoPrice: zonePromo(zone),
      course9PerProc: Math.round(total / 9),
      course9Total: total
    };
  }

  // Произвольный набор 2–4 зон: сумма абонементов зон (точные цены прайса)
  const total = real.reduce((sum, z) => {
    const cls = ZONE_CLASS[z as Exclude<ZoneId, 'vse_telo'>];
    return sum + ZONE_COURSE9_TOTAL[city][cls];
  }, 0);
  const promo = real.reduce((sum, z) => sum + zonePromo(z), 0);
  return {
    title: 'Твой набор зон',
    promoPrice: promo,
    course9PerProc: Math.round(total / 9),
    course9Total: total
  };
}

// Калькулятор экономии за 5 лет
export const METHOD_COST_PER_TIME: Record<string, number> = {
  shave: 15,
  sugaring: 80,
  cream: 25
};

export const FREQ_PER_YEAR: Record<string, number> = {
  every2_3days: 120,
  weekly: 52,
  every2_3weeks: 20,
  monthly: 12
};

export function fiveYearSpend(method: string, freq: string): number | null {
  const cost = METHOD_COST_PER_TIME[method];
  const times = FREQ_PER_YEAR[freq];
  if (!cost || !times) return null;
  return cost * times * 5;
}
