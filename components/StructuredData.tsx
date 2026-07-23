// JSON-LD структурированные данные для Google/Яндекс.
// Рендерится один раз глобально (см. app/layout.tsx).
//
// ВАЖНО: адреса студий здесь продублированы из components/Footer.tsx,
// а цены — из components/Pricing.tsx. Если меняешь адрес или цену в
// одном месте — обнови и здесь, иначе schema разойдётся с видимым
// контентом страницы (это сама по себе SEO-проблема).

const SITE_URL = 'https://laserstella.com';

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'STELLA — лазерная эпиляция',
  // alternateName нужен, чтобы явно размежеваться в поиске с другим
  // брендом "Stella" (кондитерский Instagram-аккаунт с тем же именем)
  alternateName: [
    'STELLA лазерная эпиляция',
    'Стелла эпиляция Душанбе',
    'Стелла эпиляция Худжанд'
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  sameAs: ['https://www.instagram.com/stella_tajikistan']
};

type Studio = {
  id: string;
  city: string;
  streetAddress: string;
  description: string;
};

const STUDIOS: Studio[] = [
  {
    id: 'dushanbe-huseynzoda',
    city: 'Душанбе',
    streetAddress: 'ул. Хусейнзода 29',
    description:
      'Студия лазерной эпиляции STELLA рядом с магазином Pari Beauty и рестораном «Оригами», Дом печати.'
  },
  {
    id: 'dushanbe-rasulov',
    city: 'Душанбе',
    streetAddress: 'ул. Расулов 9/1',
    description:
      'Студия лазерной эпиляции STELLA рядом с фабрикой «Ширин», Дом «Душанбе Сити», ресторан «Терасса».'
  },
  {
    id: 'dushanbe-zavkibekova',
    city: 'Душанбе',
    streetAddress: 'ул. Завкибекова, 10, клиника «Гиппократ»',
    description:
      'Студия лазерной эпиляции STELLA рядом со стадионом «Спартак», за лабораторией «Гемотест».'
  },
  {
    id: 'khujand-nabiev',
    city: 'Худжанд',
    streetAddress: 'проспект Р. Набиева, ЖК «Худжанд Сити», салон «Бурда», 2 этаж',
    description:
      'Студия лазерной эпиляции STELLA рядом с ЗАГСом и Хукуматом.'
  }
];

const localBusinesses = STUDIOS.map((studio) => ({
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  '@id': `${SITE_URL}/#${studio.id}`,
  name: 'STELLA — лазерная эпиляция',
  image: `${SITE_URL}/icon.png`,
  url: SITE_URL,
  description: studio.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: studio.streetAddress,
    addressLocality: studio.city,
    addressCountry: 'TJ'
  },
  areaServed: studio.city,
  parentOrganization: {
    '@type': 'Organization',
    name: 'STELLA — лазерная эпиляция'
  }
}));

const service = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Лазерная эпиляция',
  provider: {
    '@type': 'Organization',
    name: 'STELLA — лазерная эпиляция'
  },
  areaServed: ['Душанбе', 'Худжанд'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Зоны лазерной эпиляции',
    itemListElement: [
      { '@type': 'Offer', name: 'Бикини', price: '160', priceCurrency: 'TJS' },
      { '@type': 'Offer', name: 'Подмышки', price: '150', priceCurrency: 'TJS' },
      { '@type': 'Offer', name: 'Ноги полностью', price: '250', priceCurrency: 'TJS' },
      { '@type': 'Offer', name: 'Лицо', price: '75', priceCurrency: 'TJS' }
    ]
  }
};

const schemas = [organization, ...localBusinesses, service];

export default function StructuredData() {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
