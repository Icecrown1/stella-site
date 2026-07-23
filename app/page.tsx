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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "STELLA",
  description:
    "Студия лазерной эпиляции в Душанбе и Худжанде. Только женщины-мастера. Гарантия гладкости.",
  url: "https://laserstella.com",
  priceRange: "от 75 сомони",
  sameAs: ["https://www.instagram.com/stella_tajikistan"],
  location: [
    {
      "@type": "PostalAddress",
      streetAddress: "ул. Хусейнзода 29",
      addressLocality: "Душанбе",
      addressCountry: "TJ",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "ул. Расулов 9/1",
      addressLocality: "Душанбе",
      addressCountry: "TJ",
    },
    {
      "@type": "PostalAddress",
      streetAddress: "ул. Завкибекова 10, клиника «Гиппократ»",
      addressLocality: "Душанбе",
      addressCountry: "TJ",
    },
    {
      "@type": "PostalAddress",
      streetAddress:
        "проспект Р. Набиева, ЖК «Худжанд Сити», салон «Бурда», 2 этаж",
      addressLocality: "Худжанд",
      addressCountry: "TJ",
    },
  ],
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
  url: "https://stella-tj.com",
  publisher: {
    "@type": "Organization",
    name: "STELLA",
    url: "https://stella-tj.com",
    logo: {
      "@type": "ImageObject",
      url: "https://stella-tj.com/icon.png",
    },
    sameAs: ["https://www.instagram.com/stella_tajikistan"],
  },
};

// ────────────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
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
