'use client';

import { useState } from 'react';

const TABS = ['Зоны', 'Комплексы', 'STANDART / PREMIUM'] as const;
type Tab = (typeof TABS)[number];

const ZONES = [
  { name: 'Бикини', price: 'от 160 сомони' },
  { name: 'Подмышки', price: 'от 150 сомони' },
  { name: 'Ноги полностью', price: 'от 250 сомони' },
  { name: 'Лицо', price: 'от 75 сомони' }
];

const COMPLEXES = [
  { name: 'Бикини + подмышки', price: 'от 260 сомони' },
  { name: 'Ноги + бикини', price: 'от 310 сомони' },
  { name: 'Всё тело', price: 'от 500 сомони' }
];

const PLANS = [
  {
    name: 'STANDART',
    price: 'по прайсу зоны',
    features: ['Разовая процедура', 'Базовая консультация']
  },
  {
    name: 'PREMIUM',
    price: 'для наших VIP-клиентов',
    features: [
      'Курс от 5 процедур',
      'Гарантия гладкости',
      'Беспроцентная рассрочка'
    ]
  }
];

export default function Pricing() {
  const [tab, setTab] = useState<Tab>('Зоны');

  return (
    <section id="tseny" className="bg-sand-50 py-14 scroll-mt-20">
      <div className="container-page">
        <h2 id="uslugi" className="font-display font-bold text-2xl sm:text-3xl text-ink-900 mb-6 scroll-mt-20">
          Услуги и цены
        </h2>

        <div className="flex gap-2 overflow-x-auto pb-1 mb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                tab === t
                  ? 'bg-crimson-500 text-sand-50'
                  : 'bg-sand-100 text-ink-900/70 hover:bg-sand-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Зоны' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ZONES.map((z) => (
              <ZoneCard key={z.name} {...z} />
            ))}
          </div>
        )}

        {tab === 'Комплексы' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {COMPLEXES.map((z) => (
              <ZoneCard key={z.name} {...z} />
            ))}
          </div>
        )}

        {tab === 'STANDART / PREMIUM' && (
          <div className="grid sm:grid-cols-2 gap-5">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl2 p-7 ${
                  p.name === 'PREMIUM'
                    ? 'bg-crimson-500 text-sand-50'
                    : 'bg-sand-100 text-ink-900'
                }`}
              >
                <p className="font-display font-bold text-xl">{p.name}</p>
                <p
                  className={`mt-1 text-sm ${
                    p.name === 'PREMIUM' ? 'text-sand-50/80' : 'text-ink-900/60'
                  }`}
                >
                  {p.price}
                </p>
                <ul className="mt-5 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span>—</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

function ZoneCard({ name, price }: { name: string; price: string }) {
  return (
    <div className="rounded-xl bg-sand-100 p-5 flex flex-col">
      <div className="aspect-square w-full rounded-lg bg-crimson-50 mb-4" aria-hidden="true" />
      <p className="font-medium text-ink-900">{name}</p>
      <p className="text-sm text-ink-900/60 mt-1">{price}</p>
      <a
        href="#zapis"
        className="mt-4 text-center rounded-full border border-crimson-500/30 text-crimson-500 text-sm font-medium py-2 hover:bg-crimson-500 hover:text-sand-50 transition-colors"
      >
        Подробнее
      </a>
    </div>
  );
}
