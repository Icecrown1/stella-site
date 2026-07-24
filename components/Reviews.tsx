'use client';

import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS } from '@/lib/reviews';

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <section id="otzyvy" className="bg-sand-50 py-14 scroll-mt-20">
      <div className="container-page">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900">
            Отзывы наших клиентов
          </h2>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll(-1)}
              aria-label="Предыдущие отзывы"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-ink-900/15 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Следующие отзывы"
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
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-xl2 bg-sand-100 p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-crimson-100 shrink-0 overflow-hidden">
                  {r.avatar && (
                    <img
                      src={r.avatar}
                      alt={r.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-ink-900">{r.name}</p>
                  <p className="text-xs text-ink-900/50">{r.city}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2" role="img" aria-label="5 из 5 звёзд">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={13} className="fill-crimson-500 text-crimson-500" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-ink-900/75 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
