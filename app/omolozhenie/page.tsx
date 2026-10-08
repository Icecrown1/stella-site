import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import {
  BulletList,
  FaqList,
  PriceList,
  PriceRow,
  StudiosLine,
  faqSchema
} from '@/components/ProcedureBlocks';
import {
  REJUVENATION_ITEMS,
  REJUVENATION_MIN_PRICE,
  REJUVENATION_MIN_PROMO,
  waLink
} from '@/lib/procedures';

const SITE_URL = 'https://laserstella.com';
const URL = `${SITE_URL}/omolozhenie`;
const HERO_PHOTO = '/images/studios/zavkibekova-cabinet-1.webp';

const TITLE = `Лазерное омоложение лица в Душанбе и Худжанде — от ${REJUVENATION_MIN_PRICE} сомони | STELLA`;
const DESCRIPTION = `Лазерное омоложение лица, шеи и декольте без уколов и восстановления: мягкий прогрев диодным лазером и профессиональные сыворотки Гельтек. Первый визит — от ${REJUVENATION_MIN_PROMO} сомони.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: 'STELLA',
    locale: 'ru_TJ',
    type: 'website',
    images: [{ url: `${SITE_URL}${HERO_PHOTO}`, width: 1200, height: 1600, alt: 'Кабинет STELLA' }]
  }
};

const PRICE_ROWS: PriceRow[] = REJUVENATION_ITEMS.map((i) => ({ ...i }));

const FOR_WHOM = [
  'Кожа стала менее упругой',
  'Появились мелкие морщины',
  'Тон неровный, кожа выглядит тусклой и уставшей',
  'Заметные расширенные поры'
];

const STEPS = [
  'Мастер очищает кожу и обсуждает с вами, что хочется изменить.',
  'Диодный лазер мягко прогревает кожу в щадящем режиме. Чувствуется тепло и лёгкое покалывание.',
  'На прогретую кожу мастер наносит сыворотки Гельтек под вашу задачу: гиалуроновую кислоту с экзосомами, пептидную сыворотку или сыворотку с витамином C и ниацинамидом.',
  'Процедура длится 30–60 минут в зависимости от зоны. Восстановление не нужно.'
];

const CONTRA = [
  'Беременность и кормление грудью',
  'Онкологические заболевания',
  'Обострение кожных заболеваний: розацеа, псориаз, экзема',
  'Герпес в активной фазе',
  'Свежие раны или ожоги в зоне процедуры',
  'Склонность к келоидным рубцам',
  'Острые инфекции и температура',
  'Свежий загар'
];

const AFTERCARE = [
  'SPF 30–50 каждый день во время курса.',
  'Первые сутки — мягкое умывание и увлажняющий крем.',
  '3–5 дней без сауны, бассейна и солярия.'
];

const FAQ = [
  {
    q: 'Больно ли делать лазерное омоложение?',
    a: 'Нет. Чувствуется тепло и лёгкое покалывание, обезболивание не нужно.'
  },
  {
    q: 'Когда будет виден результат?',
    a: 'Эффект нарастает постепенно. Курс — 3–6 процедур с интервалом 7–10 дней, и ещё 3–4 месяца после курса кожа продолжает обновляться. Поддерживающий курс достаточно проходить раз в год.'
  },
  {
    q: 'Нужно ли восстановление после процедуры?',
    a: 'Нет, после процедуры можно вернуться к своим делам. Первые сутки — только мягкое умывание и увлажнение.'
  },
  {
    q: 'Чем это отличается от уколов красоты?',
    a: 'Здесь нет инъекций: кожа обновляется за счёт мягкого прогрева лазером и профессиональных сывороток. Это вариант для тех, кто хочет улучшить кожу без уколов.'
  },
  {
    q: 'Можно ли делать летом?',
    a: 'Можно, если каждый день пользоваться кремом с SPF 30–50. Самый удачный сезон для курса — осень и зима.'
  },
  {
    q: 'Кто проводит процедуру?',
    a: 'Только женщины-мастера, в закрытом кабинете.'
  }
];

const WA_TEXT = 'Здравствуйте! Хочу записаться на лазерное омоложение по акции первого визита';

export default function OmolozheniePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Лазерное омоложение кожи',
    name: 'Лазерное омоложение лица, шеи и декольте',
    provider: { '@type': 'Organization', name: 'STELLA', url: SITE_URL },
    areaServed: ['Душанбе', 'Худжанд'],
    url: URL,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'TJS',
      lowPrice: String(REJUVENATION_MIN_PROMO),
      highPrice: String(Math.max(...REJUVENATION_ITEMS.map((i) => i.single)))
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Лазерное омоложение', item: URL }
    ]
  };

  return (
    <>
      {[serviceSchema, faqSchema(FAQ), breadcrumbSchema].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <Header />
      <main>
        <section className="bg-sand-50 py-14">
          <div className="container-page grid lg:grid-cols-[1.3fr,1fr] gap-10 items-start">
            <div className="max-w-2xl">
              <nav className="text-xs text-ink-900/50 mb-6" aria-label="Хлебные крошки">
                <a href="/" className="hover:text-crimson-500">Главная</a>
                {' / '}
                <span>Лазерное омоложение</span>
              </nav>

              <p className="text-xs uppercase tracking-[0.2em] text-crimson-500 mb-3">
                Новая процедура
              </p>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 leading-tight">
                Лазерное омоложение лица, шеи и декольте в Душанбе и Худжанде
              </h1>

              <div className="lg:hidden mt-6 aspect-[4/5] max-w-xs mx-auto rounded-xl2 overflow-hidden">
                <img
                  src={HERO_PHOTO}
                  alt="Кабинет STELLA, где проходит лазерное омоложение"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-display font-bold text-2xl text-crimson-500">
                  от {REJUVENATION_MIN_PRICE} сомони
                </span>
                <span className="text-sm text-ink-900/60">
                  первый визит — от {REJUVENATION_MIN_PROMO} сомони
                </span>
              </div>

              <p className="mt-6 text-ink-900/75 leading-relaxed">
                Кожа стала тусклой, проступили мелкие морщины и поры, и тональный
                крем уже не выручает. Мягкий прогрев лазером помогает коже
                вырабатывать собственный коллаген, а профессиональные сыворотки
                Гельтек благодаря теплу проникают глубже. Всё это без уколов,
                боли и восстановления.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={waLink(WA_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-crimson-500 px-7 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors"
                >
                  Записаться в WhatsApp
                </a>
                <a
                  href="#tseny"
                  className="rounded-full border border-crimson-500/30 px-6 py-3.5 text-sm font-medium text-crimson-500 hover:bg-crimson-500 hover:text-sand-50 transition-colors"
                >
                  Смотреть цены
                </a>
              </div>

              <div className="mt-12 rounded-xl2 bg-sand-100 p-6">
                <h2 className="font-display font-semibold text-lg text-ink-900 mb-4">
                  Кому подходит
                </h2>
                <BulletList items={FOR_WHOM} />
              </div>

              <div className="mt-12">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
                  Как проходит процедура
                </h2>
                <ol className="space-y-4">
                  {STEPS.map((s, i) => (
                    <li key={s} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-crimson-500 text-sm font-semibold text-sand-50">
                        {i + 1}
                      </span>
                      <p className="pt-1 text-sm text-ink-900/75 leading-relaxed">{s}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-12 rounded-xl2 bg-white/70 border-l-4 border-crimson-500/50 p-6">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-3">
                  Сколько процедур нужно
                </h2>
                <p className="text-sm text-ink-900/75 leading-relaxed">
                  Курс — 3–6 процедур с интервалом 7–10 дней. Эффект нарастает
                  постепенно и продолжает улучшаться ещё 3–4 месяца после курса:
                  кожа становится плотнее, тон ровнее, поры менее заметны.
                  Чтобы сохранить результат, поддерживающий курс проходят раз в
                  год.
                </p>
              </div>

              <div className="mt-12" id="tseny">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-2">
                  Цены на лазерное омоложение
                </h2>
                <p className="text-sm text-ink-900/60 mb-5">
                  Одинаковые во всех студиях Душанбе и Худжанда.
                </p>
                <PriceList rows={PRICE_ROWS} />
              </div>

              <div className="mt-12 rounded-xl2 bg-white/70 border-l-4 border-crimson-500/50 p-6" id="antikuperoz">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-3">
                  Антикупероз: покраснения и сосудистая сеточка
                </h2>
                <p className="text-sm text-ink-900/75 leading-relaxed">
                  Для кожи с покраснениями и заметными сосудиками есть отдельный
                  протокол. Это тот же мягкий прогрев лазером, только вместо
                  омолаживающих сывороток мастер наносит гель Гельтек с
                  троксерутином, который укрепляет сосуды и помогает уменьшить
                  покраснение.
                </p>
                <p className="mt-3 text-sm text-ink-900/60">
                  Стоимость зависит от площади — её назовёт администратор при
                  записи.
                </p>
              </div>

              <div className="mt-12 grid sm:grid-cols-2 gap-6">
                <div className="rounded-xl2 bg-sand-100 p-6">
                  <h2 className="font-display font-semibold text-lg text-ink-900 mb-4">
                    Кому процедура не подходит
                  </h2>
                  <BulletList items={CONTRA} />
                </div>
                <div className="rounded-xl2 bg-sand-100 p-6">
                  <h2 className="font-display font-semibold text-lg text-ink-900 mb-4">
                    Уход после процедуры
                  </h2>
                  <BulletList items={AFTERCARE} />
                </div>
              </div>

              <div className="mt-12">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-4">
                  Частые вопросы про омоложение
                </h2>
                <FaqList items={FAQ} />
              </div>

              <div className="mt-10 rounded-xl2 bg-sand-100 p-6">
                <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                  Где делают омоложение
                </h2>
                <StudiosLine />
              </div>

              <div className="mt-10 rounded-xl2 bg-crimson-500 p-6 text-sand-50">
                <p className="font-display font-bold text-xl">
                  Первый визит — от {REJUVENATION_MIN_PROMO} сомони
                </p>
                <p className="mt-2 text-sm text-sand-50/80">
                  Мастер оценит кожу, подберёт сыворотки и проведёт первую
                  процедуру. Курс покупать сразу не нужно.
                </p>
                <a
                  href={waLink(WA_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block rounded-full bg-sand-50 px-7 py-3.5 text-sm font-bold text-crimson-500 hover:bg-sand-100 transition-colors"
                >
                  Записаться в WhatsApp
                </a>
              </div>

              <p className="mt-8 text-sm text-ink-900/60">
                Ещё в STELLA:{' '}
                <a href="/otbelivanie" className="text-crimson-500 hover:underline">
                  лазерное отбеливание и анти-акне
                </a>{' '}
                и{' '}
                <a href="/uslugi" className="text-crimson-500 hover:underline">
                  лазерная эпиляция
                </a>
                .
              </p>
            </div>

            <div className="hidden lg:block sticky top-24 aspect-[4/5] rounded-xl2 overflow-hidden">
              <img
                src={HERO_PHOTO}
                alt="Кабинет STELLA, где проходит лазерное омоложение"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <BookingForm defaultZone="Лазерное омоложение" />
      </main>
      <Footer />
    </>
  );
}
