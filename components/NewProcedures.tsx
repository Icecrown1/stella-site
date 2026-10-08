import {
  REJUVENATION_MIN_PRICE,
  REJUVENATION_MIN_PROMO,
  WHITENING_MIN_PRICE,
  WHITENING_MIN_PROMO
} from '@/lib/procedures';

// Блок «Новые процедуры» на главной: две карточки, ведущие на
// /otbelivanie и /omolozhenie. Эпиляция остаётся основным продуктом,
// поэтому блок компактный и стоит после цен на эпиляцию.
const CARDS = [
  {
    href: '/otbelivanie',
    title: 'Лазерное отбеливание',
    text: 'Подмышки, бикини, колени, локти и лицо. Тон светлее уже после первой процедуры.',
    price: `от ${WHITENING_MIN_PRICE} сомони`,
    promo: `первый визит от ${WHITENING_MIN_PROMO}`,
    extra: 'Анти-акне — для кожи с воспалениями и следами постакне'
  },
  {
    href: '/omolozhenie',
    title: 'Лазерное омоложение',
    text: 'Лицо, шея и декольте: упругость, ровный тон, менее заметные поры. Без уколов и восстановления.',
    price: `от ${REJUVENATION_MIN_PRICE} сомони`,
    promo: `первый визит от ${REJUVENATION_MIN_PROMO}`,
    extra: 'Антикупероз — для кожи с покраснениями и сосудистой сеточкой'
  }
];

export default function NewProcedures() {
  return (
    <section className="bg-sand-50 py-14" id="novye-protsedury">
      <div className="container-page">
        <p className="text-xs uppercase tracking-[0.2em] text-crimson-500 mb-2">
          Новое в STELLA
        </p>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900">
          Не только эпиляция
        </h2>
        <p className="mt-2 text-ink-900/65 max-w-xl">
          На том же лазере теперь делаем отбеливание и омоложение кожи — во всех
          студиях Душанбе и Худжанда.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {CARDS.map((c) => (
            <a
              key={c.href}
              href={c.href}
              className="group rounded-xl2 bg-sand-100 p-6 hover:bg-sand-200 transition-colors flex flex-col"
            >
              <p className="font-display font-semibold text-xl text-ink-900">{c.title}</p>
              <p className="mt-2 text-sm text-ink-900/70 leading-relaxed">{c.text}</p>
              <p className="mt-3 text-xs text-ink-900/50">{c.extra}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-display font-bold text-lg text-crimson-500">{c.price}</span>
                <span className="rounded-full bg-crimson-500/10 px-3 py-1 text-xs text-crimson-600">
                  {c.promo}
                </span>
              </div>
              <span className="mt-4 text-sm font-medium text-crimson-500 group-hover:underline">
                Подробнее →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
