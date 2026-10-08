// Общие блоки страниц новых процедур (/otbelivanie, /omolozhenie):
// прайс по зонам, вопросы-ответы, список «да / нельзя».
import type { CoursePrice } from '@/lib/procedures';

export type PriceRow = CoursePrice & { title: string; note?: string };

export function PriceList({ rows }: { rows: PriceRow[] }) {
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div
          key={r.title}
          className="rounded-xl2 bg-white/70 border border-ink-900/10 p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="font-display font-semibold text-ink-900">{r.title}</p>
            <p className="text-sm text-ink-900/60">
              разово <span className="font-semibold text-ink-900">{r.single} сомони</span>
            </p>
          </div>
          {r.note && <p className="mt-1 text-xs text-ink-900/50">{r.note}</p>}
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-crimson-500/10 px-3 py-1 text-crimson-600">
              Первый визит — <span className="font-semibold">{r.promo} сомони</span>
            </span>
            <span className="rounded-full bg-sand-100 px-3 py-1 text-ink-900/75">
              Курс 5: {r.per5} сомони / процедура
            </span>
          </div>
        </div>
      ))}

      <details className="rounded-xl2 bg-sand-100 p-4 sm:p-5 group">
        <summary className="cursor-pointer text-sm font-medium text-ink-900 list-none flex items-center justify-between">
          Все абонементы — на 3, 5 и 7 процедур
          <span className="text-crimson-500 transition-transform group-open:rotate-45 text-lg leading-none">
            +
          </span>
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-ink-900/50">
                <th className="py-2 pr-3 font-medium">Зона</th>
                <th className="py-2 pr-3 font-medium whitespace-nowrap">3 процедуры</th>
                <th className="py-2 pr-3 font-medium whitespace-nowrap">5 процедур</th>
                <th className="py-2 font-medium whitespace-nowrap">7 процедур</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.title} className="border-t border-ink-900/10 align-top">
                  <td className="py-2.5 pr-3 text-ink-900">{r.title}</td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">
                    {r.per3}
                    <span className="block text-xs text-ink-900/45">курс {r.total3}</span>
                  </td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">
                    {r.per5}
                    <span className="block text-xs text-ink-900/45">курс {r.total5}</span>
                  </td>
                  <td className="py-2.5 whitespace-nowrap">
                    {r.per7}
                    <span className="block text-xs text-ink-900/45">курс {r.total7}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-ink-900/50">
            Цена за процедуру в сомони. Чем длиннее курс, тем дешевле каждая
            процедура.
          </p>
        </div>
      </details>
    </div>
  );
}

export type FaqItem = { q: string; a: string };

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <div key={item.q} className="border-b border-ink-900/10 pb-4">
          <h3 className="font-medium text-ink-900">{item.q}</h3>
          <p className="mt-1.5 text-sm text-ink-900/70 leading-relaxed">{item.a}</p>
        </div>
      ))}
    </div>
  );
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex gap-2.5 text-sm text-ink-900/75 leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-500" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

// Блок «Где делают» — все четыре студии Таджикистана
export function StudiosLine() {
  return (
    <p className="text-sm text-ink-900/70 leading-relaxed">
      Во всех студиях STELLA:{' '}
      <a href="/studii/huseynzoda" className="text-crimson-500 hover:underline">
        Хусейнзода 29
      </a>
      ,{' '}
      <a href="/studii/rasulov" className="text-crimson-500 hover:underline">
        Расулова 9/1
      </a>
      ,{' '}
      <a href="/studii/zavkibekova" className="text-crimson-500 hover:underline">
        Завкибекова 10
      </a>{' '}
      в Душанбе и{' '}
      <a href="/studii/nabieva" className="text-crimson-500 hover:underline">
        проспект Р. Набиева
      </a>{' '}
      в Худжанде.
    </p>
  );
}
