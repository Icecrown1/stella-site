import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import CityReviews from '@/components/CityReviews';
import { getStudiosByCity } from '@/lib/studios';
import { REVIEWS } from '@/lib/reviews';

const SITE_URL = 'https://laserstella.com';
const CITY = 'Худжанд' as const;

export const metadata: Metadata = {
  title: 'Лазерная эпиляция в Худжанде — студия STELLA, Гарантия результата',
  description:
    'Лазерная эпиляция в Худжанде: студия STELLA — проспект Р. Набиева, ЖК «Худжанд Сити», салон «Бурда», 2 этаж. Только мастера-женщины.',
  alternates: { canonical: `${SITE_URL}/hudzhand` }
};

export default function HudzhandPage() {
  const studios = getStudiosByCity(CITY);
  const reviews = REVIEWS.filter((r) => r.city === CITY);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Худжанд', item: `${SITE_URL}/hudzhand` }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        <section className="bg-sand-50 py-14">
          <div className="container-page max-w-3xl">
            <nav className="text-xs text-ink-900/50 mb-6" aria-label="Хлебные крошки">
              <a href="/" className="hover:text-crimson-500">Главная</a>
              {' / '}
              <span>Худжанд</span>
            </nav>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 leading-tight">
              Лазерная эпиляция в Худжанде
            </h1>
            <p className="mt-6 text-ink-900/75 leading-relaxed max-w-2xl">
              Студия STELLA в Худжанде работает по тому же прайсу и с той же
              Гарантией гладкости, что и студии в Душанбе. Все процедуры
              проводит женщина-косметолог, в приватной обстановке.
            </p>

            <a
              href="#zapis"
              className="mt-6 inline-block rounded-full bg-crimson-500 px-7 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors"
            >
              Записаться в студию в Худжанде
            </a>

            <div className="mt-10 grid gap-4 max-w-md">
              {studios.map((s) => {
                const query = encodeURIComponent(`Худжанд, ${s.address}`);
                const yandexHref = s.yandexMapUrl ?? `https://yandex.com/maps/?text=${query}`;
                const googleHref = s.googleMapUrl ?? `https://www.google.com/maps/search/?api=1&query=${query}`;
                return (
                  <div key={s.id} className="rounded-xl2 bg-sand-100 overflow-hidden">
                    {s.photo && (
                      <div className="aspect-[4/3] w-full overflow-hidden">
                        <img src={s.photo} alt={s.address} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="font-medium text-ink-900">{s.address}</p>
                      <p className="text-sm text-ink-900/60 mt-2">{s.landmark}</p>
                      <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <a
                          href={yandexHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-crimson-500 hover:underline"
                        >
                          Яндекс.Карты
                        </a>
                        <a
                          href={googleHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-crimson-500 hover:underline"
                        >
                          Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <CityReviews reviews={reviews} cityLabel="Худжанда" />

            <div className="mt-10">
              <a href="/dushanbe" className="text-crimson-500 font-medium hover:underline">
                Студии в Душанбе →
              </a>
            </div>
          </div>
        </section>

        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
