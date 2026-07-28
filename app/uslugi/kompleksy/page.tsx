import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';

const SITE_URL = 'https://laserstella.com';

export const metadata: Metadata = {
  title: 'Комплексы зон лазерной эпиляции в Душанбе — от 260 сомони | STELLA',
  description:
    'Комплексы зон лазерной эпиляции STELLA: бикини + подмышки, ноги + бикини, всё тело. Выгоднее, чем оплачивать зоны по отдельности.',
  alternates: { canonical: `${SITE_URL}/uslugi/kompleksy` }
};

const COMPLEXES = [
  {
    name: 'Бикини + подмышки',
    price: 'от 260 сомони',
    photo: '/images/zones/complex-bikini-podymshki.webp',
    note: 'Самый популярный комплекс — обе зоны за один визит.'
  },
  {
    name: 'Ноги + бикини',
    price: 'от 310 сомони',
    photo: '/images/zones/complex-nogi-bikini.webp',
    note: 'Логичное сочетание для тех, кто готовится к лету или отпуску.'
  },
  {
    name: 'Всё тело',
    price: 'от 500 сомони',
    photo: '/images/zones/complex-vsyo-telo.webp',
    note: 'Максимальная выгода на процедуру по сравнению с оплатой зон отдельно.',
    href: '/uslugi/vsyo-telo'
  }
];

export default function KompleksyPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: `${SITE_URL}/uslugi` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Комплексы зон',
        item: `${SITE_URL}/uslugi/kompleksy`
      }
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
            <nav className="text-xs text-ink-900/50 mb-6" aria-label="Хлебные крошки">
              <a href="/" className="hover:text-crimson-500">Главная</a>
              {' / '}
              <a href="/uslugi" className="hover:text-crimson-500">Услуги</a>
              {' / '}
              <span>Комплексы зон</span>
            </nav>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 mb-4">
              Комплексы зон лазерной эпиляции
            </h1>
            <p className="text-ink-900/75 max-w-lg mb-10">
              Если нужно больше одной зоны — комплекс выходит выгоднее, чем
              оплачивать каждую отдельно, и удобнее: всё за один визит.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {COMPLEXES.map((c) => (
                <div key={c.name} className="rounded-xl2 bg-sand-100 overflow-hidden">
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img src={c.photo} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <p className="font-display font-semibold text-lg text-ink-900">
                      {c.name}
                    </p>
                    <p className="text-crimson-500 font-medium mt-1">{c.price}</p>
                    <p className="text-sm text-ink-900/60 mt-3">{c.note}</p>
                    {'href' in c && c.href && (
                      <a
                        href={c.href}
                        className="mt-3 inline-block text-sm font-medium text-crimson-500 hover:underline"
                      >
                        Подробнее про всё тело →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-ink-900/50 mr-2 self-center">
                Или по отдельной зоне:
              </span>
              {['bikini', 'podmyshki', 'nogi', 'lico'].map((slug) => (
                <a
                  key={slug}
                  href={`/uslugi/${slug}`}
                  className="rounded-full border border-ink-900/15 px-4 py-2 text-sm text-ink-900/70 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
                >
                  {{ bikini: 'Бикини', podmyshki: 'Подмышки', nogi: 'Ноги полностью', lico: 'Лицо' }[slug]}
                </a>
              ))}
            </div>
          </div>
        </section>

        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
