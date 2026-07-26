'use client';

import { useRef } from 'react';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { MASTERS } from '@/lib/masters';
import { STUDIOS } from '@/lib/studios';

export default function Masters() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  const studioLabel = (studioId: string) => {
    const s = STUDIOS.find((st) => st.id === studioId);
    if (!s) return '';
    return `${s.city} · ${s.address.split(',')[0]}`;
  };

  const studioSlug = (studioId: string) =>
    STUDIOS.find((st) => st.id === studioId)?.slug;

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
          {MASTERS.map((m) => {
            const slug = studioSlug(m.studioId);
            return (
              <div key={m.slug} className="snap-start shrink-0 w-[180px] text-center">
                <div className="aspect-square w-full rounded-xl2 overflow-hidden bg-sand-100 mb-3">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={`Мастер ${m.name}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-ink-900/30">
                      Фото скоро
                    </div>
                  )}
                </div>
                <p className="font-medium text-ink-900">{m.name}</p>
                {slug ? (
                  <a
                    href={`/studii/${slug}`}
                    className="block text-xs text-crimson-500/80 hover:text-crimson-500 mt-0.5"
                  >
                    {studioLabel(m.studioId)}
                  </a>
                ) : (
                  <p className="text-xs text-ink-900/50 mt-0.5">{studioLabel(m.studioId)}</p>
                )}
                {m.experience && (
                  <p className="text-xs text-ink-900/50 mt-0.5">Опыт {m.experience}</p>
                )}
                {m.reviewsCount && (
                  <p className="flex items-center justify-center gap-1 text-xs text-ink-900/70 mt-0.5">
                    <Star size={13} className="fill-crimson-500 text-crimson-500" />
                    {m.reviewsCount} отзывов
                  </p>
                )}
              </div>
            );
          })}

          <a
            href="/#zapis"
            className="snap-start shrink-0 w-[180px] rounded-xl2 bg-crimson-500 p-5 flex flex-col items-center justify-center text-center text-sand-50 hover:bg-crimson-600 transition-colors"
          >
            <span className="font-display font-semibold text-sm mb-2">
              Записаться к мастеру
            </span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
