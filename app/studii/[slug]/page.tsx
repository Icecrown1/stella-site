import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import CityReviews from '@/components/CityReviews';
import { STUDIOS, getStudioBySlug } from '@/lib/studios';
import { getMastersByStudio } from '@/lib/masters';
import { REVIEWS } from '@/lib/reviews';

const SITE_URL = 'https://laserstella.com';

export function generateStaticParams() {
  return STUDIOS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params
}: {
  params: { slug: string };
}): Metadata {
  const studio = getStudioBySlug(params.slug);
  if (!studio) return {};

  const url = `${SITE_URL}/studii/${studio.slug}`;

  return {
    title: studio.pageTitle,
    description: studio.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: studio.pageTitle,
      description: studio.metaDescription,
      url,
      siteName: 'STELLA',
      locale: 'ru_TJ',
      type: 'website',
      ...(studio.photo && {
        images: [{ url: `${SITE_URL}${studio.photo}`, width: 1200, height: 900, alt: studio.pageTitle }]
      })
    }
  };
}

export default function StudioPage({ params }: { params: { slug: string } }) {
  const studio = getStudioBySlug(params.slug);
  if (!studio) notFound();

  const masters = getMastersByStudio(studio.id);
  const masterSlugs = new Set(masters.map((m) => m.slug));
  const reviews = REVIEWS.filter(
    (r) => r.masterSlug && masterSlugs.has(r.masterSlug)
  );

  const url = `${SITE_URL}/studii/${studio.slug}`;
  const cityHref = studio.city === 'Душанбе' ? '/dushanbe' : '/hudzhand';
  const otherStudios = STUDIOS.filter((s) => s.slug !== studio.slug);

  const query = encodeURIComponent(`${studio.city}, ${studio.address}`);
  const yandexHref = studio.yandexMapUrl ?? `https://yandex.com/maps/?text=${query}`;
  const googleHref =
    studio.googleMapUrl ?? `https://www.google.com/maps/search/?api=1&query=${query}`;

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': `${SITE_URL}/#${studio.id}`,
    name: 'STELLA — лазерная эпиляция',
    url,
    description: studio.metaDescription,
    ...(studio.photo && { image: `${SITE_URL}${studio.photo}` }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: studio.address,
      addressLocality: studio.city,
      addressCountry: 'TJ'
    },
    areaServed: studio.city
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: studio.city, item: `${SITE_URL}${cityHref}` },
      { '@type': 'ListItem', position: 3, name: studio.address, item: url }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
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
              <a href={cityHref} className="hover:text-crimson-500">{studio.city}</a>
              {' / '}
              <span>{studio.address}</span>
            </nav>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 leading-tight">
              Студия STELLA — {studio.address}
            </h1>
            <p className="mt-2 text-ink-900/50">{studio.city}</p>

            <p className="mt-6 text-ink-900/75 leading-relaxed">{studio.intro}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              {studio.altegioUrl ? (
                <a
                  href={studio.altegioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-crimson-500 px-7 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors"
                >
                  Записаться онлайн — выбрать время
                </a>
              ) : (
                <a
                  href="#zapis"
                  className="rounded-full bg-crimson-500 px-7 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors"
                >
                  Записаться в эту студию
                </a>
              )}
              <a
                href={yandexHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-crimson-500/30 px-6 py-3.5 text-sm font-medium text-crimson-500 hover:bg-crimson-500 hover:text-sand-50 transition-colors"
              >
                Яндекс.Карты
              </a>
              <a
                href={googleHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-crimson-500/30 px-6 py-3.5 text-sm font-medium text-crimson-500 hover:bg-crimson-500 hover:text-sand-50 transition-colors"
              >
                Google Maps
              </a>
            </div>

            {studio.altegioUrl && (
              <p className="mt-3 text-xs text-ink-900/45">
                Онлайн-запись откроется в новом окне — там можно выбрать мастера,
                зону и удобное время. Если удобнее по звонку —{' '}
                <a href="#zapis" className="text-crimson-500 hover:underline">
                  оставьте заявку внизу страницы
                </a>
                .
              </p>
            )}

            {studio.photos && studio.photos.length > 0 && (
              <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {studio.photos.map((p) => (
                  <div key={p} className="aspect-[3/4] rounded-xl overflow-hidden">
                    <img
                      src={p}
                      alt={`Студия STELLA, ${studio.address}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 rounded-xl2 bg-sand-100 p-6">
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                Как нас найти
              </h2>
              <p className="text-sm text-ink-900/75 leading-relaxed">{studio.howToFind}</p>
              <p className="text-sm text-ink-900/50 mt-3">{studio.landmark}</p>
            </div>

            {masters.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
                  Мастера этой студии
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {masters.map((m) => (
                    <div key={m.slug} className="text-center">
                      <div className="aspect-square w-full rounded-xl2 overflow-hidden bg-sand-100 mb-3">
                        {m.photo ? (
                          <img
                            src={m.photo}
                            alt={`Мастер ${m.name}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-ink-900/30">
                            Фото скоро
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-ink-900">{m.name}</p>
                      {m.experience && (
                        <p className="text-xs text-ink-900/50">Опыт {m.experience}</p>
                      )}
                      {m.reviewsCount && (
                        <p className="text-xs text-ink-900/70 mt-0.5">
                          {m.reviewsCount} отзывов
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <CityReviews reviews={reviews} cityLabel={`студии на ${studio.address.split(',')[0]}`} />

            <div className="mt-12">
              <h2 className="font-display font-semibold text-sm text-ink-900/60 uppercase tracking-wide mb-3">
                Другие студии STELLA
              </h2>
              <div className="flex flex-col gap-2">
                {otherStudios.map((s) => (
                  <a
                    key={s.slug}
                    href={`/studii/${s.slug}`}
                    className="text-crimson-500 font-medium hover:underline"
                  >
                    {s.city} — {s.address}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
