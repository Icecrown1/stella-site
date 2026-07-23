'use client';

import { useState } from 'react';

export default function BookingForm({ defaultZone }: { defaultZone?: string }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get('name'),
      phone: form.get('phone'),
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
      <div className="container-page grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-sand-50">
            Записаться на первую процедуру
          </h2>
          <p className="mt-3 text-sand-50/80 max-w-md">
            Оставьте имя, телефон и зону — администратор перезвонит и подберёт
            удобное время в Душанбе или Худжанде.
          </p>
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
              <input
                id="phone"
                name="phone"
                required
                type="tel"
                className="mt-1.5 w-full rounded-lg border border-ink-900/15 bg-sand-100/60 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-crimson-500"
                placeholder="+992 __ ___ ____"
              />
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
              disabled={status === 'loading'}
              className="w-full rounded-full bg-crimson-500 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Отправляем…' : 'Отправить заявку'}
            </button>
            {status === 'error' && (
              <p className="text-sm text-crimson-600">
                Не получилось отправить — позвоните нам напрямую или напишите в WhatsApp.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
