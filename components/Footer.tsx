import { Instagram, MessageCircle } from 'lucide-react';
import { STUDIOS } from '@/lib/studios';

const WHATSAPP_LINK = 'https://wa.me/message/CYJT333P3IPBG1';
const INSTAGRAM_LINK =
  'https://www.instagram.com/stella_tajikistan?igsh=dm04c2cyY2RobDU3&utm_source=qr';

export default function Footer() {
  return (
    <footer id="studii" className="bg-ink-900 text-sand-50/80 py-14 scroll-mt-20">
      <div id="kontakty" className="container-page grid sm:grid-cols-2 lg:grid-cols-4 gap-10 scroll-mt-20">
        <div>
          <img
            src="/images/logo-white.webp"
            alt="STELLA — студия лазерной эпиляции"
            className="h-8 w-auto"
          />
          <p className="text-xs tracking-widest uppercase text-sand-50/50 mt-2">
            студия лазерной эпиляции
          </p>
          <p className="mt-4 text-sm max-w-xs">
            Профессиональная лазерная эпиляция в Душанбе и Худжанде. Гладкая
            кожа с Гарантией результата.
          </p>
          <div className="flex gap-3 mt-5">
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-sand-50/20 hover:border-crimson-400 transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="h-9 w-9 flex items-center justify-center rounded-full border border-sand-50/20 hover:border-crimson-400 transition-colors"
            >
              <MessageCircle size={16} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className="text-sm font-semibold text-sand-50 mb-4">Студии</p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            {STUDIOS.map((s) => (
              <div key={s.id}>
                <a
                  href={s.city === 'Душанбе' ? '/dushanbe' : '/hudzhand'}
                  className="font-medium text-sand-50 hover:underline"
                >
                  {s.city}
                </a>
                <a href={`/studii/${s.slug}`} className="block text-sand-50/60 hover:text-sand-50/90">
                  {s.address}
                </a>
                <p className="text-sand-50/40 text-xs mt-0.5">{s.landmark}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-sand-50 mb-4">Меню</p>
          <ul className="space-y-2 text-sm mb-6">
            <li><a href="/uslugi" className="hover:text-sand-50">Услуги</a></li>
            <li><a href="/#tseny" className="hover:text-sand-50">Курсы и цены</a></li>
            <li><a href="/#kosmetologi" className="hover:text-sand-50">Косметологи</a></li>
            <li><a href="/#otzyvy" className="hover:text-sand-50">Отзывы</a></li>
            <li><a href="/blog" className="hover:text-sand-50">Блог</a></li>
          </ul>
          <a
            href="/#zapis"
            className="block text-center rounded-full bg-crimson-500 px-5 py-2.5 text-sm font-semibold text-sand-50 hover:bg-crimson-400 transition-colors"
          >
            Записаться
          </a>
        </div>
      </div>

      <div className="container-page mt-6 pt-6 border-t border-sand-50/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-sand-50/40">
        <p>© STELLA, 2024–2025</p>
        <div className="flex gap-5">
          <a href="/privacy" className="hover:text-sand-50/70">Политика конфиденциальности</a>
          <a href="/oferta" className="hover:text-sand-50/70">Публичная оферта</a>
        </div>
      </div>
    </footer>
  );
}
