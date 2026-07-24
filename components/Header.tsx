'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Menu, MessageCircle, X } from 'lucide-react';
import { ZONES } from '@/lib/zones';

const NAV_ITEMS = [
  { label: 'Цены', href: '/#tseny' },
  { label: 'Косметологи', href: '/#kosmetologi' },
  { label: 'Студии', href: '/#studii' },
  { label: 'Отзывы', href: '/#otzyvy' },
  { label: 'Контакты', href: '/#kontakty' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileUslugiOpen, setMobileUslugiOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Блокируем скролл фона, пока открыто мобильное меню
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-sand-50/95 backdrop-blur shadow-sm' : 'bg-sand-50'
      }`}
    >
      <div className="container-page flex items-center justify-between py-4">
        <a href="/" className="flex flex-col leading-none">
          <span className="font-display font-extrabold text-2xl tracking-tight text-crimson-500">
            STELLA
          </span>
          <span className="text-[11px] tracking-[0.2em] text-ink-900/60 uppercase mt-0.5">
            студия лазерной эпиляции
          </span>
        </a>

        {/* Десктопная навигация */}
        <nav className="hidden lg:flex items-center gap-7">
          <div className="relative group">
            <a
              href="/uslugi"
              className="flex items-center gap-1 text-sm font-medium text-ink-900/80 hover:text-crimson-500 transition-colors"
            >
              Услуги
              <ChevronDown
                size={14}
                className="transition-transform duration-200 group-hover:rotate-180"
                aria-hidden="true"
              />
            </a>

            <div className="absolute left-0 top-full w-56 pt-2 hidden group-hover:block">
              <div className="rounded-xl2 bg-sand-50 border border-ink-900/10 shadow-lg py-2 overflow-hidden">
                {ZONES.map((zone) => (
                  <a
                    key={zone.slug}
                    href={`/uslugi/${zone.slug}`}
                    className="flex items-center justify-between px-4 py-2.5 text-sm text-ink-900/80 hover:bg-sand-100 hover:text-crimson-500 transition-colors"
                  >
                    <span>{zone.name}</span>
                    <span className="text-xs text-ink-900/40">{zone.price}</span>
                  </a>
                ))}
                <a
                  href="/uslugi/kompleksy"
                  className="block px-4 py-2.5 text-sm text-ink-900/80 hover:bg-sand-100 hover:text-crimson-500 transition-colors"
                >
                  Комплексы зон
                </a>
                <div className="border-t border-ink-900/10 my-1" />
                <a
                  href="/uslugi"
                  className="block px-4 py-2.5 text-sm font-medium text-crimson-500 hover:bg-sand-100 transition-colors"
                >
                  Все услуги →
                </a>
              </div>
            </div>
          </div>

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

        <div className="flex items-center gap-2 sm:gap-3">
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
            href="/#zapis"
            className="rounded-full bg-crimson-500 px-4 py-2.5 sm:px-5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors whitespace-nowrap"
          >
            Записаться
          </a>

          {/* Кнопка гамбургер-меню — только на мобильных/планшетах */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={mobileOpen}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full border border-ink-900/15 text-ink-900/70 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Мобильное меню на весь экран */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-sand-50 overflow-y-auto">
          <div className="container-page flex items-center justify-between py-4">
            <a href="/" className="flex flex-col leading-none" onClick={() => setMobileOpen(false)}>
              <span className="font-display font-extrabold text-2xl tracking-tight text-crimson-500">
                STELLA
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Закрыть меню"
              className="h-10 w-10 flex items-center justify-center rounded-full border border-ink-900/15 text-ink-900/70"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav className="container-page flex flex-col gap-1 pb-10">
            <div>
              <button
                type="button"
                onClick={() => setMobileUslugiOpen((v) => !v)}
                className="w-full flex items-center justify-between py-4 text-lg font-medium text-ink-900 border-b border-ink-900/10"
              >
                Услуги
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${mobileUslugiOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {mobileUslugiOpen && (
                <div className="pl-4 flex flex-col divide-y divide-ink-900/5">
                  {ZONES.map((zone) => (
                    <a
                      key={zone.slug}
                      href={`/uslugi/${zone.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-3 text-sm text-ink-900/70"
                    >
                      <span>{zone.name}</span>
                      <span className="text-xs text-ink-900/40">{zone.price}</span>
                    </a>
                  ))}
                  <a
                    href="/uslugi/kompleksy"
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-sm text-ink-900/70"
                  >
                    Комплексы зон
                  </a>
                  <a
                    href="/uslugi"
                    onClick={() => setMobileOpen(false)}
                    className="py-3 text-sm font-medium text-crimson-500"
                  >
                    Все услуги →
                  </a>
                </div>
              )}
            </div>

            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 text-lg font-medium text-ink-900 border-b border-ink-900/10"
              >
                {item.label}
              </a>
            ))}

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="/#zapis"
                onClick={() => setMobileOpen(false)}
                className="text-center rounded-full bg-crimson-500 px-5 py-3.5 text-sm font-semibold text-sand-50"
              >
                Записаться
              </a>
              <a
                href="https://wa.me/message/CYJT333P3IPBG1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-crimson-500/30 px-5 py-3.5 text-sm font-semibold text-crimson-500"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Написать в WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
