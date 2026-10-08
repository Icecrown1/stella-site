import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ZONES } from '@/lib/zones';
import { REJUVENATION_MIN_PRICE, WHITENING_MIN_PRICE } from '@/lib/procedures';

const SITE_URL = 'https://laserstella.com';

export const metadata: Metadata = {
  title: 'Услуги и цены на лазерную эпиляцию в Душанбе и Худжанде | STELLA',
  description:
    'Лазерная эпиляция по зонам: бикини, подмышки, ноги, лицо — и комплексы зон. Цены, количество процедур, Гарантия гладкости.',
  alternates: { canonical: `${SITE_URL}/uslugi` }
};

export default function UslugiPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: `${SITE_URL}/uslugi` }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main className="bg-sand-50 py-14">
        <div className="container-page max-w-4xl">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 mb-2">
            Услуги и цены на лазерную эпиляцию
          </h1>
          <p className="text-ink-900/70 max-w-lg mb-10">
            Выберите зону, чтобы узнать точную цену, сколько нужно процедур и
            частые вопросы именно по ней.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {ZONES.map((zone) => (
              <a
                key={zone.slug}
                href={`/uslugi/${zone.slug}`}
                className="rounded-xl2 bg-sand-100 overflow-hidden hover:bg-sand-200 transition-colors flex"
              >
                <div className="w-28 shrink-0 overflow-hidden">
                  <img src={zone.photo} alt={zone.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <p className="font-display font-semibold text-lg text-ink-900">
                    {zone.name}
                  </p>
                  <p className="text-crimson-500 font-medium mt-1">{zone.price}</p>
                  <p className="text-sm text-ink-900/60 mt-2">
                    Процедура — {zone.procedureTime}
                  </p>
                </div>
              </a>
            ))}

            <a
              href="/uslugi/vsyo-telo"
              className="rounded-xl2 bg-crimson-500 p-6 text-sand-50 hover:bg-crimson-600 transition-colors flex flex-col justify-center"
            >
              <p className="font-display font-semibold text-lg">Всё тело</p>
              <p className="text-sand-50/80 mt-1">от 500 сомони</p>
              <p className="text-sm text-sand-50/70 mt-2">Все зоны за один визит — максимальная выгода</p>
            </a>

            <a
              href="/uslugi/kompleksy"
              className="rounded-xl2 bg-ink-900 p-6 text-sand-50 hover:bg-ink-900/90 transition-colors flex flex-col justify-center"
            >
              <p className="font-display font-semibold text-lg">Комплексы зон</p>
              <p className="text-sand-50/80 mt-1">от 260 сомони</p>
              <p className="text-sm text-sand-50/70 mt-2">Выгоднее, чем по одной</p>
            </a>
          </div>

          <h2 className="mt-12 font-display font-bold text-xl text-ink-900 mb-4">
            Новые процедуры
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <a
              href="/otbelivanie"
              className="rounded-xl2 bg-sand-100 p-6 hover:bg-sand-200 transition-colors"
            >
              <p className="font-display font-semibold text-lg text-ink-900">Лазерное отбеливание</p>
              <p className="text-crimson-500 font-medium mt-1">от {WHITENING_MIN_PRICE} сомони</p>
              <p className="text-sm text-ink-900/60 mt-2">Подмышки, бикини, колени, локти, лицо. Анти-акне.</p>
            </a>
            <a
              href="/omolozhenie"
              className="rounded-xl2 bg-sand-100 p-6 hover:bg-sand-200 transition-colors"
            >
              <p className="font-display font-semibold text-lg text-ink-900">Лазерное омоложение</p>
              <p className="text-crimson-500 font-medium mt-1">от {REJUVENATION_MIN_PRICE} сомони</p>
              <p className="text-sm text-ink-900/60 mt-2">Лицо, шея, декольте. Антикупероз.</p>
            </a>
          </div>

          <div className="mt-10">
            <a
              href="/#tseny"
              className="text-crimson-500 font-medium hover:underline"
            >
              Посмотреть тарифы STANDART / PREMIUM и курсы →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
