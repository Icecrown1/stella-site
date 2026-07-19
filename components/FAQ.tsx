'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const QUESTIONS = [
  {
    q: 'Больно ли делать лазерную эпиляцию?',
    a: 'Современные лазеры делают процедуру практически безболезненной — ощущается лёгкое тепло. При высокой чувствительности используем охлаждение и щадящие настройки мощности.'
  },
  {
    q: 'Все ли мастера — женщины?',
    a: 'Да, во всех студиях STELLA процедуры проводят только женщины-косметологи. Это принципиальная позиция студии.'
  },
  {
    q: 'Вызывает ли лазерная эпиляция рак?',
    a: 'Нет. Лазер воздействует точечно на волосяной фолликул через световую энергию и не проникает вглубь тканей — это не рентген и не ионизирующее излучение.'
  },
  {
    q: 'Можно ли делать в интимных зонах?',
    a: 'Да, процедура проводится максимально деликатно и приватно, с уважением к личным границам клиентки.'
  },
  {
    q: 'Сколько процедур нужно для результата?',
    a: 'В среднем курс состоит из 9 процедур — количество зависит от типа и густоты волос. При покупке курса действует Гарантия гладкости.'
  },
  {
    q: 'Можно ли во время месячных?',
    a: 'Да, это не противопоказание для большинства зон, кроме непосредственно зоны бикини в эти дни — уточните у администратора при записи.'
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-sand-50 py-14">
      <div className="container-page">
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 mb-8">
          Ответы на частые вопросы
        </h2>

        <div className="grid md:grid-cols-2 gap-x-10">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-ink-900/10 py-4">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-ink-900">{item.q}</span>
                  <span className="shrink-0 text-crimson-500">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <p className="mt-3 text-sm text-ink-900/70 leading-relaxed">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
