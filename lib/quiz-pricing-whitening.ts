// Логика расчёта квиза «Ровный тон» (лазерное отбеливание, Таджикистан).
// Сами цены живут в lib/procedures.ts — там же их берут страницы
// /otbelivanie и /omolozhenie, поэтому прайс на сайте и в квизе не разойдётся.

import {
  WHITENING_CLASSES,
  WHITENING_COMPLEXES,
  WhiteningClass,
  WhiteningComplexId
} from '@/lib/procedures';

export type ToneZoneId =
  | 'podmyshki'
  | 'bikini'
  | 'bikini_deep'
  | 'koleni'
  | 'lokti'
  | 'bedra'
  | 'lico'
  | 'spina';

export const TONE_ZONES: { id: ToneZoneId; label: string }[] = [
  { id: 'podmyshki', label: 'Подмышки' },
  { id: 'bikini', label: 'Классическое бикини' },
  { id: 'bikini_deep', label: 'Глубокое бикини / интимная зона' },
  { id: 'koleni', label: 'Колени' },
  { id: 'lokti', label: 'Локти' },
  { id: 'bedra', label: 'Внутренняя поверхность бёдер' },
  { id: 'lico', label: 'Лицо (пигментация, постакне)' },
  { id: 'spina', label: 'Спина' }
];

// Класс зоны в прайсе: классическое бикини — S, глубокое — L
const ZONE_CLASS: Record<ToneZoneId, WhiteningClass> = {
  bikini: 'S',
  bikini_deep: 'L',
  lico: 'M',
  podmyshki: 'M',
  koleni: 'L',
  lokti: 'L',
  bedra: 'L',
  spina: 'XL'
};

// Составы комплексов. В прайсе комплекс назван «бикини» без уточнения
// глубины, поэтому и классическое, и глубокое бикини попадают в комплекс.
const COMPLEX_ZONES: Record<WhiteningComplexId, ToneZoneId[]> = {
  k1: ['podmyshki', 'bikini'],
  k2: ['podmyshki', 'bikini', 'koleni'],
  k3: ['podmyshki', 'bikini', 'koleni', 'lokti']
};

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
  // Для сравнения с комплексами глубокое бикини считаем просто «бикини»
  const normalized = new Set<ToneZoneId>(
    selected.map((z) => (z === 'bikini_deep' ? 'bikini' : z))
  );

  // Оба варианта бикини сразу — не комплекс, считаем индивидуально
  const bothBikini = selected.includes('bikini') && selected.includes('bikini_deep');

  const match = bothBikini
    ? undefined
    : WHITENING_COMPLEXES.find((c) => {
        const zones = COMPLEX_ZONES[c.id];
        return zones.length === normalized.size && zones.every((z) => normalized.has(z));
      });
  if (match) {
    return {
      title: `Комплекс «${match.title}»`,
      promoPrice: match.promo,
      regularPrice: match.single,
      per5: match.per5,
      total5: match.total5
    };
  }

  if (selected.length === 1) {
    const zone = selected[0];
    const p = WHITENING_CLASSES[ZONE_CLASS[zone]];
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
    (sum, z) => sum + WHITENING_CLASSES[ZONE_CLASS[z]].single,
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
