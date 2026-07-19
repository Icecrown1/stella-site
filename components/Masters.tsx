'use client';

import { useRef } from 'react';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// TODO: добавить остальных мастеров, когда будут стаж/отзывы:
// Садбарг, Манижа, Ангелина, Сурайё, Парвона
const MASTERS = [
  { name: 'Муниса', experience: '3 года', reviews: 179 },
  { name: 'Ҳоҷарбегим', experience: '4 года', reviews: 191 },
  { name: 'Наргиза', experience: '4 года', reviews: 220 }
];

export default function Masters() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  return (
    <section id="kosmetologi" className="bg-sand-50 py-14 scroll-mt-20">
      <div className="container-page">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900">
            Наши косметологи
          </h2>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Предыдущие мастера"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-ink-900/15 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Следующие мастера"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-ink-900/15 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {MASTERS.map((m) => (
            <div key={m.name} className="snap-start shrink-0 w-[180px] text-center">
              <div className="aspect-square w-full rounded-xl2 bg-sand-100 mb-3" aria-hidden="true" />
              <p className="font-medium text-ink-900">{m.name}</p>
              <p className="text-xs text-ink-900/50">Опыт {m.experience}</p>
              <p className="flex items-center justify-center gap-1 text-xs text-ink-900/70 mt-1">
                <Star size={13} className="fill-crimson-500 text-crimson-500" />
                {m.reviews} отзывов
              </p>
            </div>
          ))}

          <a
            href="#zapis"
            className="snap-start shrink-0 w-[180px] rounded-xl2 bg-crimson-500 p-5 flex flex-col items-center justify-center text-center text-sand-50 hover:bg-crimson-600 transition-colors"
          >
            <span className="font-display font-semibold text-sm mb-2">
              Смотреть всех мастеров
            </span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
