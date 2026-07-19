'use client';

import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Услуги', href: '#uslugi' },
  { label: 'Цены', href: '#tseny' },
  { label: 'Косметологи', href: '#kosmetologi' },
  { label: 'Студии', href: '#studii' },
  { label: 'Отзывы', href: '#otzyvy' },
  { label: 'Контакты', href: '#kontakty' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-sand-50/95 backdrop-blur shadow-sm' : 'bg-sand-50'
      }`}
    >
      <div className="container-page flex items-center justify-between py-4">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-display font-extrabold text-2xl tracking-tight text-crimson-500">
            STELLA
          </span>
          <span className="text-[11px] tracking-[0.2em] text-ink-900/60 uppercase mt-0.5">
            студия лазерной эпиляции
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-900/80 hover:text-crimson-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/message/CYJT333P3IPBG1"
            aria-label="Написать в WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-crimson-500/30 text-crimson-500 hover:bg-crimson-500 hover:text-sand-50 transition-colors"
          >
            <MessageCircle size={18} aria-hidden="true" />
          </a>
          <a
            href="#zapis"
            className="rounded-full bg-crimson-500 px-5 py-2.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors"
          >
            Записаться
          </a>
        </div>
      </div>
    </header>
  );
}
