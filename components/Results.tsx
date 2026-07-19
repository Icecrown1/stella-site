'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ZONES = ['Подмышки', 'Бикини', 'Ноги', 'Живот'];

export default function Results() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section id="rezultaty" className="bg-sand-50 py-14">
      <div className="container-page">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900">
            Результаты, которые говорят сами за себя
          </h2>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Предыдущие результаты"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-ink-900/15 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Следующие результаты"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-ink-900/15 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ZONES.map((zone) => (
            <div
              key={zone}
              className="snap-start shrink-0 w-[260px] sm:w-[290px] rounded-xl overflow-hidden bg-sand-100"
            >
              <div className="aspect-square w-full grid grid-cols-2">
                <div className="bg-crimson-100 flex items-center justify-center text-[11px] text-crimson-600/70">
                  До
                </div>
                <div className="bg-crimson-50 flex items-center justify-center text-[11px] text-crimson-600/70">
                  После
                </div>
                {/* TODO: /public/images/results/{zone}-before.webp и -after.webp */}
              </div>
              <p className="px-4 py-3 text-sm font-medium text-ink-900/80">{zone}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
