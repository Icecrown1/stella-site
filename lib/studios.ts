// Общие данные по студиям — единый источник для Footer, JSON-LD,
// городских страниц (/dushanbe, /hudzhand) и страниц студий (/studii/...).
// ВАЖНО: при изменении адреса меняй здесь — остальные места это читают.

export type Studio = {
  id: string;
  slug: string;
  city: 'Душанбе' | 'Худжанд';
  address: string;
  landmark: string;
  photo?: string;
  photos?: string[]; // галерея для страницы студии
  // Прямые ссылки на карточку организации (не просто поиск по адресу).
  yandexMapUrl?: string;
  googleMapUrl?: string;
  // Ссылка онлайн-записи Altegio этой студии
  altegioUrl?: string;
  // Тексты для страницы студии /studii/[slug]
  pageTitle: string;
  metaDescription: string;
  intro: string;
  howToFind: string;
};

export const STUDIOS: Studio[] = [
  {
    id: 'dushanbe-huseynzoda',
    slug: 'huseynzoda',
    city: 'Душанбе',
    address: 'ул. Хусейнзода 29',
    landmark: 'Ориентир: магазин Pari Beauty, ресторан «Оригами», Дом печати',
    photo: '/images/studios/huseynzoda-cabinet-1.webp',
    photos: [
      '/images/studios/huseynzoda-cabinet-1.webp',
      '/images/studios/huseynzoda-cabinet-2.webp',
      '/images/studios/huseynzoda-reception.webp',
      '/images/studios/huseynzoda-hall.webp',
      '/images/studios/huseynzoda-certificates.webp',
      '/images/studios/huseynzoda-exterior.webp'
    ],
    altegioUrl: 'https://n1317313.alteg.io',
    yandexMapUrl:
      'https://yandex.ru/profile/194808266909?lang=ru&utm_source=copy_link&utm_medium=social&utm_campaign=share',
    googleMapUrl: 'https://maps.app.goo.gl/rDAbsSkodHdHKkZK9',
    pageTitle:
      'Студия STELLA на Хусейнзода 29, Душанбе — лазерная эпиляция в центре города',
    metaDescription:
      'Студия лазерной эпиляции STELLA в центре Душанбе: ул. Хусейнзода 29, рядом с Домом печати, магазином Pari Beauty и рестораном «Оригами». Мастера Ҳоҷарбегим и Муниса.',
    intro:
      'Студия на Хусейнзода — в самом центре Душанбе, в пешей доступности от Дома печати. Это удобная точка, если вы работаете или живёте в центре: можно зайти на процедуру в обеденный перерыв или после работы, не выезжая из центра города.',
    howToFind:
      'Заходите со стороны улицы Хусейнзода: студия находится в здании рядом с магазином Pari Beauty и рестораном «Оригами» — ориентируйтесь на вывеску Pari Beauty на фасаде, вход рядом. Если едете на такси, называйте водителю «Дом печати» — это знают все.'
  },
  {
    id: 'dushanbe-rasulov',
    slug: 'rasulov',
    city: 'Душанбе',
    address: 'ул. Расулов 9/1',
    landmark: 'Ориентир: фабрика «Ширин», Дом «Душанбе Сити», ресторан «Терасса»',
    photo: '/images/studios/rasulov-cabinet-1.webp',
    photos: [
      '/images/studios/rasulov-cabinet-1.webp',
      '/images/studios/rasulov-cabinet-2.webp',
      '/images/studios/rasulov-certificates.webp',
      '/images/studios/rasulov-exterior.webp'
    ],
    altegioUrl: 'https://n1333851.alteg.io',
    yandexMapUrl: 'https://yandex.ru/maps/-/CTf8N0jG',
    pageTitle:
      'Студия STELLA на Расулова 9/1, Душанбе — лазерная эпиляция у «Душанбе Сити»',
    metaDescription:
      'Студия лазерной эпиляции STELLA: ул. Расулов 9/1, рядом с комплексом «Душанбе Сити», фабрикой «Ширин» и рестораном «Терасса». Мастера Наргиза и Садбарг.',
    intro:
      'Студия на Расулова находится рядом с комплексом «Душанбе Сити» — одним из самых узнаваемых адресов города. Если вы бываете в этом районе по делам или живёте неподалёку, это ваша ближайшая студия STELLA.',
    howToFind:
      'Ориентируйтесь на Дом «Душанбе Сити» и фабрику «Ширин» — студия в нескольких минутах пешком, рядом с рестораном «Терасса», в здании Grey Hotel. Таксисту проще всего назвать «Душанбе Сити» или «Grey Hotel».'
  },
  {
    id: 'dushanbe-zavkibekova',
    slug: 'zavkibekova',
    city: 'Душанбе',
    address: 'ул. Завкибекова, 10, клиника «Гиппократ»',
    landmark: 'Ориентир: стадион «Спартак», за лабораторией «Гемотест»',
    photo: '/images/studios/zavkibekova-cabinet-1.webp',
    photos: [
      '/images/studios/zavkibekova-cabinet-1.webp',
      '/images/studios/zavkibekova-cabinet-2.webp',
      '/images/studios/zavkibekova-products.webp',
      '/images/studios/zavkibekova-hall.webp',
      '/images/studios/zavkibekova-reception.webp',
      '/images/studios/zavkibekova-exterior.webp'
    ],
    altegioUrl: 'https://n1369733.alteg.io',
    pageTitle:
      'Студия STELLA на Завкибекова 10, Душанбе — лазерная эпиляция в клинике «Гиппократ»',
    metaDescription:
      'Студия лазерной эпиляции STELLA внутри клиники «Гиппократ»: ул. Завкибекова 10, у стадиона «Спартак», за лабораторией «Гемотест». Мастера Парвона и Сурайё.',
    intro:
      'Эта студия расположена внутри клиники «Гиппократ» — удобно, если вам спокойнее проходить процедуры в медицинском учреждении, и практично: можно совместить визит с другими делами в клинике или лаборатории по соседству.',
    howToFind:
      'Ищите клинику «Гиппократ» на Завкибекова 10 — рядом стадион «Спартак», а сама студия находится за лабораторией «Гемотест». Внутри клиники следуйте указателям STELLA или спросите на ресепшене.'
  },
  {
    id: 'khujand-nabiev',
    slug: 'nabieva',
    city: 'Худжанд',
    address: 'проспект Р. Набиева, ЖК «Худжанд Сити», салон «Бурда», 2 этаж',
    landmark: 'Ориентир: рядом с ЗАГСом и Хукуматом',
    photo: '/images/studios/nabieva-cabinet-1.webp',
    photos: [
      '/images/studios/nabieva-cabinet-1.webp',
      '/images/studios/nabieva-cabinet-2.webp',
      '/images/studios/nabieva-laser.webp',
      '/images/studios/nabieva-certificates.webp',
      '/images/studios/nabieva-entrance.webp',
      '/images/studios/nabieva-exterior.webp'
    ],
    altegioUrl: 'https://n1413217.alteg.io',
    yandexMapUrl: 'https://yandex.ru/maps/-/CTrE5QKx',
    googleMapUrl: 'https://share.google/jqswQym2gvmfbLGt5',
    pageTitle:
      'Студия STELLA в Худжанде — ЖК «Худжанд Сити», проспект Р. Набиева',
    metaDescription:
      'Студия лазерной эпиляции STELLA в Худжанде: проспект Р. Набиева, ЖК «Худжанд Сити», салон «Бурда», 2 этаж. Рядом с ЗАГСом и Хукуматом. Мастера Манижа и Ангелина.',
    intro:
      'Единственная студия STELLA в Худжанде находится в ЖК «Худжанд Сити» — на втором этаже салона «Бурда». Это центральная, легко узнаваемая точка города: рядом ЗАГС и Хукумат, добраться удобно из любого района Худжанда.',
    howToFind:
      'Заходите в салон «Бурда» в ЖК «Худжанд Сити» на проспекте Р. Набиева и поднимайтесь на 2 этаж. Если едете на такси — называйте «Худжанд Сити» или «рядом с ЗАГСом», оба ориентира хорошо известны водителям.'
  }
];

export function getStudiosByCity(city: 'Душанбе' | 'Худжанд'): Studio[] {
  return STUDIOS.filter((s) => s.city === city);
}

export function getStudioBySlug(slug: string): Studio | undefined {
  return STUDIOS.find((s) => s.slug === slug);
}
