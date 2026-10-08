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
  WHITENING_CLASSES,
  WHITENING_COMPLEXES,
  WHITENING_MIN_PRICE,
  WHITENING_MIN_PROMO,
  waLink
} from '@/lib/procedures';

const SITE_URL = 'https://laserstella.com';
const URL = `${SITE_URL}/otbelivanie`;
const HERO_PHOTO = '/images/studios/huseynzoda-cabinet-1.webp';

const TITLE = `Лазерное отбеливание кожи в Душанбе и Худжанде — от ${WHITENING_MIN_PRICE} сомони | STELLA`;
const DESCRIPTION = `Отбеливание подмышек, бикини, коленей, локтей и лица: диодный лазер и профессиональные составы Likoberon. Тон светлее уже после первой процедуры. Первый визит — от ${WHITENING_MIN_PROMO} сомони.`;

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
    images: [{ url: `${SITE_URL}/images/quiz/whitening-ba.webp`, width: 900, height: 1600, alt: 'Подмышки до и после одной процедуры отбеливания' }]
  }
};

const PRICE_ROWS: PriceRow[] = [
  { title: 'Подмышки или лицо', ...WHITENING_CLASSES.M },
  { title: 'Классическое бикини', note: 'и аногенитальная зона', ...WHITENING_CLASSES.S },
  {
    title: 'Колени, локти, глубокое бикини',
    note: 'и внутренняя поверхность бёдер, голени — за каждую зону',
    ...WHITENING_CLASSES.L
  },
  { title: 'Спина полностью', ...WHITENING_CLASSES.XL },
  ...WHITENING_COMPLEXES.map((c) => ({ ...c, title: `Комплекс: ${c.title.toLowerCase()}` }))
];

const STEPS = [
  'Мастер осматривает зону и делает тест на небольшом участке кожи.',
  'Диодный лазер мягко прогревает кожу. Чувствуется тепло и лёгкое покалывание.',
  'На прогретую кожу мастер наносит профессиональный осветляющий состав Likoberon — тепло помогает ему работать глубже.',
  'Процедура длится 30–60 минут в зависимости от зоны. Обезболивание и восстановление не нужны: можно сразу идти по делам.'
];

const CONTRA = [
  'Беременность и кормление грудью',
  'Онкологические заболевания',
  'Обострение кожных заболеваний: розацеа, псориаз, экзема',
  'Герпес в активной фазе',
  'Свежие раны, ожоги или раздражение в зоне процедуры',
  'Склонность к келоидным рубцам',
  'Острые инфекции и температура',
  'Свежий загар'
];

const AFTERCARE = [
  'SPF 30–50 на открытые участки каждый день во время курса: солнце запускает пигментацию заново.',
  'Первые сутки — мягкое очищение и увлажняющий крем.',
  '3–5 дней без сауны, бассейна и солярия.'
];

const FAQ = [
  {
    q: 'Больно ли делать лазерное отбеливание?',
    a: 'Нет. Чувствуется тепло и лёгкое покалывание. Обезболивание не нужно, восстановление тоже — после процедуры можно сразу идти по делам.'
  },
  {
    q: 'Когда будет виден результат?',
    a: 'Тон становится светлее уже после первой процедуры. Стойкий результат даёт курс из 3–7 процедур с интервалом 7–10 дней. Сколько процедур нужно именно вам, мастер скажет на первом визите.'
  },
  {
    q: 'Не будет ли ожога или раздражения?',
    a: 'Лазер работает в мягком режиме прогрева. Мастер подбирает параметры под ваш тип кожи и на первом визите делает тест-зону, а составы Likoberon — профессиональные, для работы в кабинете.'
  },
  {
    q: 'Можно ли делать отбеливание летом?',
    a: 'Можно, но солнцезащитный крем SPF 30–50 обязателен. Самый удачный сезон для курса — осень и зима, когда солнца меньше.'
  },
  {
    q: 'Чем это лучше отбеливающих кремов?',
    a: 'Кремы неизвестного состава из соцсетей и с рынка могут раздражать кожу, а за результат никто не отвечает. У нас профессиональные составы, и мастер подбирает протокол под вашу кожу и следит за её реакцией.'
  },
  {
    q: 'Кто проводит процедуру?',
    a: 'Только женщины-мастера, в закрытом кабинете. Отбеливание интимной зоны для нас обычная работа, неловко не будет.'
  },
  {
    q: 'Можно ли записаться на акцию, если я уже хожу к вам на эпиляцию?',
    a: 'Да. Цена первого визита действует для всех, кто впервые пробует отбеливание, в том числе для клиенток эпиляции.'
  }
];

const WA_TEXT = 'Здравствуйте! Хочу записаться на лазерное отбеливание по акции первого визита';

export default function OtbelivaniePage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Лазерное отбеливание кожи',
    name: 'Лазерное отбеливание и анти-акне',
    provider: { '@type': 'Organization', name: 'STELLA', url: SITE_URL },
    areaServed: ['Душанбе', 'Худжанд'],
    url: URL,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'TJS',
      lowPrice: String(WHITENING_MIN_PROMO),
      highPrice: String(WHITENING_CLASSES.XL.single)
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Лазерное отбеливание', item: URL }
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
                <span>Лазерное отбеливание</span>
              </nav>

              <p className="text-xs uppercase tracking-[0.2em] text-crimson-500 mb-3">
                Новая процедура
              </p>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 leading-tight">
                Лазерное отбеливание кожи в Душанбе и Худжанде
              </h1>

              <div className="lg:hidden mt-6 aspect-[4/5] max-w-xs mx-auto rounded-xl2 overflow-hidden">
                <img
                  src={HERO_PHOTO}
                  alt="Кабинет STELLA, где проходит лазерное отбеливание"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-display font-bold text-2xl text-crimson-500">
                  от {WHITENING_MIN_PRICE} сомони
                </span>
                <span className="text-sm text-ink-900/60">
                  первый визит — от {WHITENING_MIN_PROMO} сомони
                </span>
              </div>

              <p className="mt-6 text-ink-900/75 leading-relaxed">
                Тёмные подмышки, колени, локти или бикини видны каждый раз,
                когда поднимаешь руки или надеваешь что-то короткое, и из-за них
                многие выбирают закрытую одежду даже в жару. Кожа темнеет там,
                где её постоянно трут одежда и бритва, поэтому это очень частая
                история и к чистоплотности отношения не имеет. Мягкий прогрев
                лазером вместе с профессиональным осветляющим составом делает тон
                светлее уже с первой процедуры.
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
                  href="/quiz-ton"
                  className="rounded-full border border-crimson-500/30 px-6 py-3.5 text-sm font-medium text-crimson-500 hover:bg-crimson-500 hover:text-sand-50 transition-colors"
                >
                  Рассчитать свой план за 1 минуту
                </a>
              </div>
              <p className="mt-3 text-xs text-ink-900/50">
                Процедуру проводит женщина-мастер в закрытом кабинете.
              </p>

              {/* Как проходит */}
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
                <figure className="mt-6">
                  <div className="rounded-xl2 overflow-hidden">
                    <img
                      src="/images/procedures/likoberon.webp"
                      alt="Профессиональные составы Likoberon в студии STELLA"
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-ink-900/50">
                    Составы Likoberon в студии STELLA на Завкибекова.
                  </figcaption>
                </figure>
              </div>

              {/* Результат */}
              <div className="mt-12 grid sm:grid-cols-[1fr,1.1fr] gap-6 items-start">
                <figure className="rounded-xl2 overflow-hidden max-w-[280px] mx-auto sm:mx-0">
                  <img
                    src="/images/quiz/whitening-ba.webp"
                    alt="Подмышки до и после одной процедуры лазерного отбеливания"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </figure>
                <div>
                  <h2 className="font-display font-bold text-xl text-ink-900 mb-3">
                    Результат после одной процедуры
                  </h2>
                  <p className="text-sm text-ink-900/75 leading-relaxed">
                    Тон становится светлее уже после первого визита, а стойкий
                    результат даёт курс с интервалом 7–10 дней:
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-ink-900/75">
                    <li>
                      <span className="font-semibold text-ink-900">3 процедуры</span> — лёгкое
                      выравнивание тона и сияние кожи;
                    </li>
                    <li>
                      <span className="font-semibold text-ink-900">5 процедур</span> — оптимальный
                      курс при заметной пигментации и следах постакне;
                    </li>
                    <li>
                      <span className="font-semibold text-ink-900">7 процедур</span> — для тёмных
                      зон с давней пигментацией: подмышки, бикини, локти, колени.
                    </li>
                  </ul>
                  <p className="mt-3 text-xs text-ink-900/50">
                    На фото — подмышки до и после одной процедуры. Фото клиентки
                    STELLA, публикуется с её согласия. Результат зависит от типа
                    кожи.
                  </p>
                </div>
              </div>

              {/* Цены */}
              <div className="mt-12" id="tseny">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-2">
                  Цены на лазерное отбеливание
                </h2>
                <p className="text-sm text-ink-900/60 mb-5">
                  Одинаковые во всех студиях Душанбе и Худжанда. Можно собрать
                  свой набор зон — администратор посчитает цену комплекса.
                </p>
                <PriceList rows={PRICE_ROWS} />
              </div>

              {/* Анти-акне */}
              <div className="mt-12 rounded-xl2 bg-white/70 border-l-4 border-crimson-500/50 p-6" id="anti-akne">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-3">
                  Анти-акне: воспаления, поры и следы постакне
                </h2>
                <p className="text-sm text-ink-900/75 leading-relaxed">
                  Если на лице или спине воспаления, расширенные поры и следы от
                  прыщей, мастер работает по протоколу анти-акне. Это тот же
                  мягкий прогрев лазером, только вместо осветляющей маски
                  наносятся составы Гельтек с азелаиновой и салициловой кислотами
                  и противовоспалительным пептидом.
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm">
                  <span className="rounded-lg bg-sand-100 px-3 py-1.5 text-ink-900/75">
                    Лицо — {WHITENING_CLASSES.M.single} сомони, первый визит {WHITENING_CLASSES.M.promo}
                  </span>
                  <span className="rounded-lg bg-sand-100 px-3 py-1.5 text-ink-900/75">
                    Спина — {WHITENING_CLASSES.XL.single} сомони, первый визит {WHITENING_CLASSES.XL.promo}
                  </span>
                </div>
                <p className="mt-4 text-xs text-ink-900/55 leading-relaxed">
                  Подходит при акне лёгкой и средней степени. Если воспалений
                  много и они болезненные, сначала нужен дерматолог — мастер
                  подскажет на консультации.
                </p>
              </div>

              {/* Противопоказания и уход */}
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

              {/* FAQ */}
              <div className="mt-12">
                <h2 className="font-display font-bold text-xl text-ink-900 mb-4">
                  Частые вопросы про отбеливание
                </h2>
                <FaqList items={FAQ} />
              </div>

              <div className="mt-10 rounded-xl2 bg-sand-100 p-6">
                <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                  Где делают отбеливание
                </h2>
                <StudiosLine />
              </div>

              <div className="mt-10 rounded-xl2 bg-crimson-500 p-6 text-sand-50">
                <p className="font-display font-bold text-xl">
                  Начните с первого визита — от {WHITENING_MIN_PROMO} сомони
                </p>
                <p className="mt-2 text-sm text-sand-50/80">
                  Мастер оценит кожу, сделает тест-зону и первую процедуру. Курс
                  покупать сразу не нужно.
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
                <a href="/omolozhenie" className="text-crimson-500 hover:underline">
                  лазерное омоложение лица, шеи и декольте
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
                alt="Кабинет STELLA, где проходит лазерное отбеливание"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <BookingForm defaultZone="Лазерное отбеливание" />
      </main>
      <Footer />
    </>
  );
}
