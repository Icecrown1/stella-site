import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Results from '@/components/Results';
import BookingForm from '@/components/BookingForm';

const SITE_URL = 'https://laserstella.com';

export const metadata: Metadata = {
  title: 'Лазерная эпиляция всего тела в Душанбе — цена от 500 сомони | STELLA',
  description:
    'Сколько стоит лазерная эпиляция всего тела в Душанбе и Худжанде: комплекс «Всё тело» в STELLA — от 500 сомони за процедуру, все зоны за один визит. Гарантия гладкости на курс.',
  alternates: { canonical: `${SITE_URL}/uslugi/vsyo-telo` }
};

const FAQS = [
  {
    q: 'Сколько длится процедура на всё тело?',
    a: 'В среднем полтора-два часа в зависимости от плотности волос и набора зон — точнее мастер сориентирует на первой процедуре. Это всё равно быстрее, чем шугаринг всего тела.'
  },
  {
    q: 'Что входит в комплекс «Всё тело»?'
    ,
    a: 'Все основные зоны за один визит — ноги, бикини, подмышки, руки и другие по вашему запросу. Точный состав обсуждаете с администратором при записи: комплекс собирается под вас.'
  },
  {
    q: 'Выгоднее ли это, чем зоны по отдельности?',
    a: 'Да, в этом весь смысл комплекса: если складывать те же зоны по отдельному прайсу, за визит выйдет заметно дороже. Плюс экономия времени — один визит вместо нескольких.'
  },
  {
    q: 'Действует ли Гарантия гладкости на всё тело?',
    a: 'Да, курс из 9 процедур с Гарантией гладкости оформляется и на комплекс — условия те же, что и для отдельных зон.'
  }
];

export default function VsyoTeloPage() {
  const url = `${SITE_URL}/uslugi/vsyo-telo`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Лазерная эпиляция всего тела',
    provider: { '@type': 'Organization', name: 'STELLA — лазерная эпиляция' },
    areaServed: ['Душанбе', 'Худжанд'],
    url
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Услуги', item: `${SITE_URL}/uslugi` },
      { '@type': 'ListItem', position: 3, name: 'Всё тело', item: url }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                <span>Всё тело</span>
              </nav>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 leading-tight">
                Лазерная эпиляция всего тела в Душанбе и Худжанде
              </h1>

              <div className="lg:hidden mt-6 aspect-[4/5] max-w-xs mx-auto rounded-xl2 overflow-hidden">
                <img
                  src="/images/zones/complex-vsyo-telo.webp"
                  alt="Лазерная эпиляция всего тела"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="font-display font-bold text-2xl text-crimson-500">
                  от 500 сомони
                </span>
                <span className="text-sm text-ink-900/50">за процедуру · все зоны за один визит</span>
              </div>

              <p className="mt-6 text-ink-900/75 leading-relaxed">
                Комплекс «Всё тело» — самый выгодный формат в STELLA в пересчёте
                на зону: вместо того чтобы записываться и платить за каждую зону
                отдельно, вы проходите все основные зоны за один визит. Это
                любимый формат клиенток, которые решили закрыть вопрос гладкости
                полностью, а не по частям.
              </p>

              <a
                href="#zapis"
                className="mt-6 inline-block rounded-full bg-crimson-500 px-7 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors"
              >
                Записаться на всё тело
              </a>

              <div className="mt-10 rounded-xl2 bg-sand-100 p-6">
                <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                  Сколько стоит курс
                </h2>
                <p className="text-sm text-ink-900/75 leading-relaxed">
                  Разовая процедура — от 500 сомони. Для устойчивого результата
                  оформляется курс из 9 процедур с Гарантией гладкости: если
                  после курса результат ещё не идеален, следующие процедуры —
                  бесплатны. Про то, почему нужен именно курс, мы подробно
                  рассказали в статье{' '}
                  <a
                    href="/blog/skolko-nuzhno-procedur-lazernoy-epilyacii"
                    className="text-crimson-500 hover:underline"
                  >
                    «Сколько нужно процедур»
                  </a>
                  .
                </p>
              </div>

              <div className="mt-10">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-4">
                  Частые вопросы про всё тело
                </h2>
                <div className="space-y-5">
                  {FAQS.map((item) => (
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
                  Отдельные зоны и другие комплексы
                </h2>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/uslugi/kompleksy"
                    className="rounded-full border border-ink-900/15 px-4 py-2 text-sm text-ink-900/70 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
                  >
                    Комплексы зон
                  </a>
                  {[
                    ['bikini', 'Бикини'],
                    ['podmyshki', 'Подмышки'],
                    ['nogi', 'Ноги полностью'],
                    ['lico', 'Лицо']
                  ].map(([slug, name]) => (
                    <a
                      key={slug}
                      href={`/uslugi/${slug}`}
                      className="rounded-full border border-ink-900/15 px-4 py-2 text-sm text-ink-900/70 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden lg:block sticky top-24 aspect-[4/5] rounded-xl2 overflow-hidden">
              <img
                src="/images/zones/complex-vsyo-telo.webp"
                alt="Лазерная эпиляция всего тела в Душанбе"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <Results />
        <BookingForm defaultZone="Другое / уточню у администратора" />
      </main>
      <Footer />
    </>
  );
}
