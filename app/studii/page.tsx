import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { STUDIOS } from '@/lib/studios';
import { getMastersByStudio } from '@/lib/masters';

const SITE_URL = 'https://laserstella.com';

export const metadata: Metadata = {
  title: 'Студии STELLA — 4 адреса в Душанбе и Худжанде | Лазерная эпиляция',
  description:
    'Все студии лазерной эпиляции STELLA: три в Душанбе (Хусейнзода, Расулов, Завкибекова) и одна в Худжанде (проспект Р. Набиева). Адреса, ориентиры, мастера.',
  alternates: { canonical: `${SITE_URL}/studii` }
};

export default function StudiiPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Студии', item: `${SITE_URL}/studii` }
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
          <div className="container-page max-w-4xl">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 mb-2">
              Студии STELLA
            </h1>
            <p className="text-ink-900/70 max-w-lg mb-10">
              Четыре студии — три в Душанбе и одна в Худжанде. Везде одинаковый
              прайс, Гарантия гладкости и только мастера-женщины.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {STUDIOS.map((studio) => {
                const masters = getMastersByStudio(studio.id);
                return (
                  <a
                    key={studio.slug}
                    href={`/studii/${studio.slug}`}
                    className="rounded-xl2 bg-sand-100 overflow-hidden hover:bg-sand-200 transition-colors flex flex-col"
                  >
                    {studio.photo && (
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={studio.photo}
                          alt={`Студия STELLA, ${studio.address}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-wide text-crimson-500">
                        {studio.city}
                      </p>
                      <p className="font-display font-semibold text-lg text-ink-900 mt-1">
                        {studio.address}
                      </p>
                      <p className="text-sm text-ink-900/60 mt-2">{studio.landmark}</p>
                      {masters.length > 0 && (
                        <p className="text-sm text-ink-900/70 mt-3">
                          Мастера: {masters.map((m) => m.name).join(', ')}
                        </p>
                      )}
                      <span className="inline-block mt-4 text-sm font-medium text-crimson-500">
                        Подробнее о студии →
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="/dushanbe" className="text-crimson-500 font-medium hover:underline">
                Все студии Душанбе →
              </a>
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
