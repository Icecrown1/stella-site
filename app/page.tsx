import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PromoStrip from "@/components/PromoStrip";
import Guarantee from "@/components/Guarantee";
import Results from "@/components/Results";
import Pricing from "@/components/Pricing";
import Masters from "@/components/Masters";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

// ── JSON-LD structured data ──────────────────────────────────────────────────
//
// ВАЖНО: адреса студий продублированы из components/Footer.tsx, а цены —
// из components/Pricing.tsx. Если меняешь адрес/цену в одном месте —
// обнови и здесь, иначе schema разойдётся с видимым контентом страницы.

const SITE_URL = "https://laserstella.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "STELLA — лазерная эпиляция",
  // alternateName нужен, чтобы явно размежеваться в поиске с другим
  // брендом "Stella" (кондитерский Instagram-аккаунт с тем же именем)
  alternateName: [
    "STELLA лазерная эпиляция",
    "Стелла эпиляция Душанбе",
    "Стелла эпиляция Худжанд",
  ],
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  sameAs: ["https://www.instagram.com/stella_tajikistan"],
};

type Studio = {
  id: string;
  city: string;
  streetAddress: string;
  description: string;
};

const STUDIOS: Studio[] = [
  {
    id: "dushanbe-huseynzoda",
    city: "Душанбе",
    streetAddress: "ул. Хусейнзода 29",
    description:
      "Студия лазерной эпиляции STELLA рядом с магазином Pari Beauty и рестораном «Оригами», Дом печати.",
  },
  {
    id: "dushanbe-rasulov",
    city: "Душанбе",
    streetAddress: "ул. Расулов 9/1",
    description:
      "Студия лазерной эпиляции STELLA рядом с фабрикой «Ширин», Дом «Душанбе Сити», ресторан «Терасса».",
  },
  {
    id: "dushanbe-zavkibekova",
    city: "Душанбе",
    streetAddress: "ул. Завкибекова, 10, клиника «Гиппократ»",
    description:
      "Студия лазерной эпиляции STELLA рядом со стадионом «Спартак», за лабораторией «Гемотест».",
  },
  {
    id: "khujand-nabiev",
    city: "Худжанд",
    streetAddress: "проспект Р. Набиева, ЖК «Худжанд Сити», салон «Бурда», 2 этаж",
    description: "Студия лазерной эпиляции STELLA рядом с ЗАГСом и Хукуматом.",
  },
];

// Каждая студия — отдельная валидная сущность HealthAndBeautyBusiness
// с полем address (а не несуществующим "location" со списком адресов).
const studioSchemas = STUDIOS.map((studio) => ({
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  "@id": `${SITE_URL}/#${studio.id}`,
  name: "STELLA — лазерная эпиляция",
  image: `${SITE_URL}/icon.png`,
  url: SITE_URL,
  priceRange: "от 75 сомони",
  description: studio.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: studio.streetAddress,
    addressLocality: studio.city,
    addressCountry: "TJ",
  },
  areaServed: studio.city,
  parentOrganization: {
    "@type": "Organization",
    name: "STELLA — лазерная эпиляция",
  },
}));

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Лазерная эпиляция",
  provider: {
    "@type": "Organization",
    name: "STELLA — лазерная эпиляция",
  },
  areaServed: ["Душанбе", "Худжанд"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Зоны лазерной эпиляции",
    itemListElement: [
      { "@type": "Offer", name: "Бикини", price: "160", priceCurrency: "TJS" },
      { "@type": "Offer", name: "Подмышки", price: "150", priceCurrency: "TJS" },
      { "@type": "Offer", name: "Ноги полностью", price: "250", priceCurrency: "TJS" },
      { "@type": "Offer", name: "Лицо", price: "75", priceCurrency: "TJS" },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Больно ли делать лазерную эпиляцию?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Современные лазеры делают процедуру практически безболезненной — ощущается лёгкое тепло. При высокой чувствительности используем охлаждение и щадящие настройки мощности.",
      },
    },
    {
      "@type": "Question",
      name: "Все ли мастера — женщины?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, во всех студиях STELLA процедуры проводят только женщины-косметологи. Это принципиальная позиция студии.",
      },
    },
    {
      "@type": "Question",
      name: "Вызывает ли лазерная эпиляция рак?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Нет. Лазер воздействует точечно на волосяной фолликул через световую энергию и не проникает вглубь тканей — это не рентген и не ионизирующее излучение.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли делать в интимных зонах?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, процедура проводится максимально деликатно и приватно, с уважением к личным границам клиентки.",
      },
    },
    {
      "@type": "Question",
      name: "Сколько процедур нужно для результата?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "В среднем курс состоит из 9 процедур — количество зависит от типа и густоты волос. При покупке курса действует Гарантия гладкости.",
      },
    },
    {
      "@type": "Question",
      name: "Можно ли во время месячных?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Да, это не противопоказание для большинства зон, кроме непосредственно зоны бикини в эти дни — уточните у администратора при записи.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "STELLA",
  url: SITE_URL,
  publisher: {
    "@type": "Organization",
    name: "STELLA",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
    },
    sameAs: ["https://www.instagram.com/stella_tajikistan"],
  },
};

const allSchemas = [
  organizationSchema,
  ...studioSchemas,
  serviceSchema,
  faqSchema,
  websiteSchema,
];

// ────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <main>
        <Header />
        <Hero />
        <PromoStrip />
        <Guarantee />
        <Results />
        <Pricing />
        <Masters />
        <Reviews />
        <FAQ />
        <BookingForm />
        <Footer />
      </main>
    </>
  );
}
