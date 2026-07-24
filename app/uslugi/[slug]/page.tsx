import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Results from '@/components/Results';
import BookingForm from '@/components/BookingForm';
import { ZONES, getZoneBySlug } from '@/lib/zones';

const SITE_URL = 'https://laserstella.com';

export function generateStaticParams() {
  return ZONES.map((zone) => ({ slug: zone.slug }));
}

export function generateMetadata({
  params
}: {
  params: { slug: string };
}): Metadata {
  const zone = getZoneBySlug(params.slug);
  if (!zone) return {};

  const url = `${SITE_URL}/uslugi/${zone.slug}`;

  return {
    title: zone.metaTitle,
    description: zone.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: zone.metaTitle,
      description: zone.metaDescription,
      url,
      siteName: 'STELLA',
      locale: 'ru_TJ',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}${zone.photo}`,
          width: 1122,
          height: 1402,
          alt: zone.h1
        }
      ]
    }
  };
}

export default function ZonePage({ params }: { params: { slug: string } }) {
  const zone = getZoneBySlug(params.slug);
  if (!zone) notFound();

  const otherZones = ZONES.filter((z) => z.slug !== zone.slug);
  const url = `${SITE_URL}/uslugi/${zone.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `Лазерная эпиляция — ${zone.name}`,
    provider: { '@type': 'Organization', name: 'STELLA — лазерная эпиляция' },
    areaServed: ['Душанбе', 'Худжанд'],
    url
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: `${SITE_URL}/uslugi` },
      { '@type': 'ListItem', position: 3, name: zone.name, item: url }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        <section className="bg-sand-50 py-14">
          <div className="container-page grid lg:grid-cols-[1.3fr,1fr] gap-10 items-start">
            <div className="max-w-2xl">
              <nav className="text-xs text-ink-900/50 mb-6" aria-label="Хлебные крошки">
                <a href="/" className="hover:text-crimson-500">Главная</a>
                {' / '}
                <a href="/uslugi" className="hover:text-crimson-500">Услуги</a>
                {' / '}
                <span>{zone.name}</span>
              </nav>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 leading-tight">
                {zone.h1}
              </h1>

              <div className="lg:hidden mt-6 aspect-[4/5] max-w-xs mx-auto rounded-xl2 overflow-hidden">
                <img
                  src={zone.photo}
                  alt={zone.h1}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="font-display font-bold text-2xl text-crimson-500">
                  {zone.price}
                </span>
                <span className="text-sm text-ink-900/50">
                  Процедура — {zone.procedureTime}
                </span>
              </div>

              <p className="mt-6 text-ink-900/75 leading-relaxed">{zone.intro}</p>

              <a
                href="#zapis"
                className="mt-6 inline-block rounded-full bg-crimson-500 px-7 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors"
              >
                Записаться на процедуру
              </a>

              <div className="mt-10 rounded-xl2 bg-sand-100 p-6">
                <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                  Сколько нужно процедур
                </h2>
                <p className="text-sm text-ink-900/75 leading-relaxed">
                  {zone.sessionsNote}
                </p>
              </div>

              <div className="mt-10">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-4">
                  Частые вопросы про {zone.name.toLowerCase()}
                </h2>
                <div className="space-y-5">
                  {zone.faqs.map((item) => (
                    <div key={item.q} className="border-b border-ink-900/10 pb-4">
                      <p className="font-medium text-ink-900">{item.q}</p>
                      <p className="mt-1.5 text-sm text-ink-900/70 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="font-display font-semibold text-sm text-ink-900/60 uppercase tracking-wide mb-3">
                  Другие зоны
                </h2>
                <div className="flex flex-wrap gap-2">
                  {otherZones.map((z) => (
                    <a
                      key={z.slug}
                      href={`/uslugi/${z.slug}`}
                      className="rounded-full border border-ink-900/15 px-4 py-2 text-sm text-ink-900/70 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
                    >
                      {z.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden lg:block sticky top-24 aspect-[4/5] rounded-xl2 overflow-hidden">
              <img
                src={zone.photo}
                alt={zone.h1}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <Results />
        <BookingForm defaultZone={zone.name} />
      </main>
      <Footer />
    </>
  );
}
