'use client';

import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Шохона',
    city: 'Душанбе',
    text: 'Хочу выразить искреннюю благодарность вашему салону за высокий уровень сервиса! Процедура лазерной эпиляции прошла очень комфортно. Отдельное спасибо мастеру за внимательность, аккуратность и профессиональный подход. Всё было подробно объяснено, а во время процедуры я чувствовала себя спокойно и комфортно. С нетерпением жду окончательного результата. Спасибо за качественное обслуживание и заботу о клиентах!'
  },
  {
    name: 'Нилуфар',
    city: 'Худжанд',
    text: 'Всё прошло отлично, это уже не первый раз, когда я посещаю ваши процедуры, и каждый раз остаюсь очень довольна. Мастер настоящий профессионал: очень внимательная, доброжелательная и всегда относится с заботой. Спасибо за прекрасный результат, обязательно приду ещё.'
  },
  {
    name: 'Шахноза',
    city: 'Худжанд',
    text: 'Манижа очень любезная, всё мне подробно рассказала, аккуратно работала, бережно и внимательно относится к своей работе. Мне понравилось, у меня не было дискомфорта с ней.'
  },
  {
    name: 'Эъзоза',
    city: 'Худжанд',
    text: 'Она очень вежливый мастер своего дела. Процедура прошла приятно, даже хотелось немного спать.'
  },
  {
    name: 'Клиентка',
    city: 'Душанбе · мастер Муниса',
    text: 'Хочу выразить огромную благодарность мастеру Мунисе! Я осталась в полном восторге от своего визита. Она очень внимательная, вежливая и доброжелательная, с первых минут создала комфортную и спокойную атмосферу. Во время процедуры всё подробно объясняла, постоянно интересовалась моим самочувствием, была очень аккуратной и профессиональной. С огромным удовольствием буду приходить именно к Мунисе снова и обязательно порекомендую её своим знакомым.'
  }
];

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
                <div className="h-10 w-10 rounded-full bg-crimson-100 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-ink-900">{r.name}</p>
                  <p className="text-xs text-ink-900/50">{r.city}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-2" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={13} className="fill-crimson-500 text-crimson-500" />
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
