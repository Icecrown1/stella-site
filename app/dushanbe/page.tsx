import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import CityReviews from '@/components/CityReviews';
import { getStudiosByCity } from '@/lib/studios';
import { REVIEWS } from '@/lib/reviews';

const SITE_URL = 'https://laserstella.com';
const CITY = 'Душанбе' as const;

export const metadata: Metadata = {
  title: 'Лазерная эпиляция в Душанбе — 3 студии STELLA, Гарантия результата',
  description:
    'Лазерная эпиляция в Душанбе: 3 студии STELLA — ул. Хусейнзода 29, Расулов 9/1, Завкибекова 10. Только мастера-женщины, Гарантия гладкости.',
  alternates: { canonical: `${SITE_URL}/dushanbe` }
};

export default function DushanbePage() {
  const studios = getStudiosByCity(CITY);
  const reviews = REVIEWS.filter((r) => r.city === CITY);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Душанбе', item: `${SITE_URL}/dushanbe` }
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
              <span>Душанбе</span>
            </nav>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 leading-tight">
              Лазерная эпиляция в Душанбе
            </h1>
            <p className="mt-6 text-ink-900/75 leading-relaxed max-w-2xl">
              В Душанбе у STELLA три студии — можно выбрать ту, что ближе к
              дому или работе. Во всех студиях одинаковый прайс, одна и та же
              Гарантия гладкости на курсе, и в каждой процедуры проводят
              только женщины-косметологи.
            </p>

            <a
              href="#zapis"
              className="mt-6 inline-block rounded-full bg-crimson-500 px-7 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors"
            >
              Записаться в студию в Душанбе
            </a>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {studios.map((s) => {
                const query = encodeURIComponent(`Душанбе, ${s.address}`);
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

            <CityReviews reviews={reviews} cityLabel="Душанбе" />

            <div className="mt-10">
              <a href="/hudzhand" className="text-crimson-500 font-medium hover:underline">
                Студия в Худжанде →
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
