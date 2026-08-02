'use client';

import { useState } from 'react';
import { STUDIOS } from '@/lib/studios';

// Коды стран для формы записи. Первым — Таджикистан (основная аудитория).
const COUNTRY_CODES = [
  { code: '+992', country: 'Таджикистан', digits: 9, placeholder: '93 364 0290' },
  { code: '+998', country: 'Узбекистан', digits: 9, placeholder: '90 123 4567' },
  { code: '+996', country: 'Кыргызстан', digits: 9, placeholder: '700 123 456' },
  { code: '+7', country: 'Россия / Казахстан', digits: 10, placeholder: '900 123 4567' }
];

export default function BookingForm({ defaultZone }: { defaultZone?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code);
  const [phoneDigits, setPhoneDigits] = useState('');

  const selected =
    COUNTRY_CODES.find((c) => c.code === countryCode) ?? COUNTRY_CODES[0];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, selected.digits);
    setPhoneDigits(digits);
  };

  const phoneComplete = phoneDigits.length === selected.digits;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneComplete) return;
    setStatus('loading');

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      phone: `${countryCode} ${phoneDigits}`,
      zone: form.get('zone')
    };

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setStatus(res.ok ? 'ok' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="zapis" className="bg-crimson-500 py-16 scroll-mt-20">
      <div className="container-page grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-sand-50">
            Записаться на процедуру
          </h2>
          <p className="mt-3 text-sand-50/80 max-w-md">
            Быстрее всего — онлайн-запись: выбираете студию, мастера и удобное
            время сами, в пару кликов.
          </p>

          <div className="mt-6 space-y-2.5">
            {STUDIOS.map(
              (s) =>
                s.altegioUrl && (
                  <a
                    key={s.id}
                    href={s.altegioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl bg-sand-50/10 hover:bg-sand-50/20 border border-sand-50/20 px-5 py-3.5 transition-colors"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-sand-50">
                        {s.city} — {s.address.split(',')[0]}
                      </span>
                      <span className="block text-xs text-sand-50/60 mt-0.5">
                        {s.landmark.replace('Ориентир: ', '')}
                      </span>
                    </span>
                    <span className="shrink-0 ml-4 text-sm font-semibold text-sand-50">
                      Выбрать время →
                    </span>
                  </a>
                )
            )}
          </div>
        </div>

        {status === 'ok' ? (
          <div className="rounded-xl2 bg-sand-50 p-8 text-center">
            <p className="font-display font-semibold text-lg text-ink-900">
              Заявка отправлена
            </p>
            <p className="mt-2 text-sm text-ink-900/70">
              Мы свяжемся с вами в ближайшее время.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-xl2 bg-sand-50 p-7 space-y-4">
            <div>
              <p className="font-display font-semibold text-ink-900">
                Или оставьте заявку
              </p>
              <p className="text-sm text-ink-900/60 mt-1">
                Администратор перезвонит и подберёт удобное время сам.
              </p>
            </div>

            <div>
              <label htmlFor="name" className="text-sm font-medium text-ink-900">
                Имя
              </label>
              <input
                id="name"
                name="name"
                required
                type="text"
                className="mt-1.5 w-full rounded-lg border border-ink-900/15 bg-sand-100/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-500"
                placeholder="Как к вам обращаться"
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-sm font-medium text-ink-900">
                Телефон
              </label>
              <div className="mt-1.5 flex gap-2">
                <select
                  aria-label="Код страны"
                  value={countryCode}
                  onChange={(e) => {
                    setCountryCode(e.target.value);
                    setPhoneDigits('');
                  }}
                  className="shrink-0 rounded-lg border border-ink-900/15 bg-sand-100/60 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-500"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code}
                    </option>
                  ))}
                </select>
                <input
                  id="phone"
                  name="phone"
                  required
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  value={phoneDigits}
                  onChange={handlePhoneChange}
                  className="w-full rounded-lg border border-ink-900/15 bg-sand-100/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-500"
                  placeholder={selected.placeholder}
                />
              </div>
              <p className="mt-1 text-xs text-ink-900/40">
                {selected.country} · {phoneDigits.length}/{selected.digits} цифр
              </p>
            </div>

            <div>
              <label htmlFor="zone" className="text-sm font-medium text-ink-900">
                Зона
              </label>
              <select
                id="zone"
                name="zone"
                defaultValue={defaultZone ?? 'Бикини'}
                className="mt-1.5 w-full rounded-lg border border-ink-900/15 bg-sand-100/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-500"
              >
                <option>Бикини</option>
                <option>Подмышки</option>
                <option>Ноги полностью</option>
                <option>Лицо</option>
                <option>Другое / уточню у администратора</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || !phoneComplete}
              className="w-full rounded-full bg-crimson-500 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Отправляем…' : 'Отправить заявку'}
            </button>
            {status === 'error' && (
              <p className="text-sm text-crimson-600">
                Не получилось отправить — напишите нам в WhatsApp.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
