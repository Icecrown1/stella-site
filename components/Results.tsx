'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ZONES = [
  { label: 'Подмышки', slug: 'podymshki' },
  { label: 'Бикини',   slug: 'bikini'    },
  { label: 'Ноги',     slug: 'nogi'      },
  { label: 'Живот',    slug: 'zhivot'    }
];

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
          {ZONES.map(({ label, slug }) => (
            <div
              key={slug}
              className="snap-start shrink-0 w-[260px] sm:w-[290px] rounded-xl overflow-hidden bg-sand-100"
            >
              <div className="aspect-square w-full grid grid-cols-2">
                <div className="relative overflow-hidden">
                  <img
                    src={`/images/results/${slug}-before.webp`}
                    alt={`${label} — до`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-semibold text-ink-900/60 bg-sand-50/80 rounded px-1">До</span>
                </div>
                <div className="relative overflow-hidden">
                  <img
                    src={`/images/results/${slug}-after.webp`}
                    alt={`${label} — после`}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1.5 right-2 text-[10px] font-semibold text-ink-900/60 bg-sand-50/80 rounded px-1">После</span>
                </div>
              </div>
              <p className="px-4 py-3 text-sm font-medium text-ink-900/80">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
