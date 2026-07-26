// Мастера STELLA и их привязка к студиям.
// ВАЖНО: experience/reviewsCount указываем только когда есть реальные
// данные — для остальных карточка рендерится без цифр.
// studioId должен совпадать с id в lib/studios.ts.

export type Master = {
  slug: string;
  name: string;
  studioId: string;
  experience?: string;
  reviewsCount?: number;
  photo?: string;
};

export const MASTERS: Master[] = [
  {
    slug: 'khojarbegim',
    name: 'Ҳоҷарбегим',
    studioId: 'dushanbe-huseynzoda',
    experience: '4 года',
    reviewsCount: 191,
    photo: '/images/master-khojarbegim.webp'
  },
  {
    slug: 'munisa',
    name: 'Муниса',
    studioId: 'dushanbe-huseynzoda',
    experience: '3 года',
    reviewsCount: 179,
    photo: '/images/master-munisa.webp'
  },
  {
    slug: 'nargiza',
    name: 'Наргиза',
    studioId: 'dushanbe-rasulov',
    experience: '4 года',
    reviewsCount: 220,
    photo: '/images/master-nargiza.webp'
  },
  { slug: 'sadbarg', name: 'Садбарг', studioId: 'dushanbe-rasulov' },
  {
    slug: 'parvona',
    name: 'Парвона',
    studioId: 'dushanbe-zavkibekova',
    experience: '2 года',
    reviewsCount: 101,
    photo: '/images/master-parvona.webp'
  },
  { slug: 'surayo', name: 'Сурайё', studioId: 'dushanbe-zavkibekova' },
  {
    slug: 'manizha',
    name: 'Манижа',
    studioId: 'khujand-nabiev',
    reviewsCount: 98,
    photo: '/images/master-manizha.webp'
  },
  { slug: 'angelina', name: 'Ангелина', studioId: 'khujand-nabiev' }
];

export function getMastersByStudio(studioId: string): Master[] {
  return MASTERS.filter((m) => m.studioId === studioId);
}
