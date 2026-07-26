'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { Review } from '@/lib/reviews';

function Avatar({ name, avatar }: { name: string; avatar?: string }) {
  if (avatar) {
    return (
      <img
        src={avatar}
        alt={name}
        className="h-10 w-10 rounded-full object-cover shrink-0"
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      className="h-10 w-10 rounded-full bg-crimson-100 text-crimson-600 flex items-center justify-center font-display font-semibold shrink-0"
    >
      {name.charAt(0)}
    </div>
  );
}

export default function CityReviews({
  reviews,
  cityLabel
}: {
  reviews: Review[];
  cityLabel: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  if (reviews.length === 0) return null;

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  return (
    <div className="mt-14">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-xl text-ink-900">
          Отзывы клиенток из {cityLabel}
        </h2>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll(-1)}
            aria-label="Предыдущие отзывы"
            className="h-9 w-9 flex items-center justify-center rounded-full border border-ink-900/15 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Следующие отзывы"
            className="h-9 w-9 flex items-center justify-center rounded-full border border-ink-900/15 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r, i) => (
          <div
            key={i}
            className="snap-start shrink-0 w-[260px] sm:w-[300px] rounded-xl2 bg-sand-100 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={r.name} avatar={r.avatar} />
              <p className="text-sm font-medium text-ink-900">{r.name}</p>
            </div>
            {r.rating && (
              <div className="flex gap-0.5 mb-2" aria-label={`Оценка ${r.rating} из 5`}>
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-crimson-500 text-crimson-500" />
                ))}
              </div>
            )}
            <p className="text-sm text-ink-900/75 leading-relaxed">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
