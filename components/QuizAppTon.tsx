'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  TONE_ZONES,
  ToneZoneId,
  buildTonePlan
} from '@/lib/quiz-pricing-whitening';

const WHATSAPP_NUMBER = '992977607711';

type Duration = 'recent' | 'year' | 'always';
type Tried = 'creams' | 'home' | 'scrubs' | 'nothing';
type Barrier = 'doubt' | 'burn' | 'shy' | 'price' | 'none';

const DURATIONS: { id: Duration; label: string }[] = [
  { id: 'recent', label: 'Заметила недавно' },
  { id: 'year', label: 'Больше года' },
  { id: 'always', label: 'Сколько себя помню' }
];

const TRIED: { id: Tried; label: string }[] = [
  { id: 'creams', label: 'Осветляющие кремы из интернета' },
  { id: 'home', label: 'Домашние средства — лимон, сода' },
  { id: 'scrubs', label: 'Скрабы и пилинги дома' },
  { id: 'nothing', label: 'Ничего — не знала, что это решается' }
];

const BARRIERS: { id: Barrier; label: string }[] = [
  { id: 'doubt', label: 'Не верю, что реально сработает' },
  { id: 'burn', label: 'Боюсь ожога или раздражения' },
  { id: 'shy', label: 'Стесняюсь показывать эти зоны' },
  { id: 'price', label: 'Думала, это очень дорого' },
  { id: 'none', label: 'Ничего — хочу попробовать' }
];

const TOTAL_QUESTIONS = 5;

function track(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event, ...data });
  }
}

export default function QuizAppTon() {
  // step: 0 старт, 1..5 вопросы, 6 контакт, 7 результат
  const [step, setStep] = useState(0);
  const [zones, setZones] = useState<ToneZoneId[]>([]);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [tried, setTried] = useState<Tried | null>(null);
  const [barrier, setBarrier] = useState<Barrier | null>(null);
  const [city, setCity] = useState<'Душанбе' | 'Худжанд' | null>(null);
  const [name, setName] = useState('');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [waOk, setWaOk] = useState(true);
  const [hp, setHp] = useState('');
  const [sending, setSending] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const u: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((k) => {
      const v = p.get(k);
      if (v) u[k] = v;
    });
    setUtm(u);
  }, []);

  // Таймер брони акционной цены: 30 минут, переживает перезагрузку.
  useEffect(() => {
    if (step !== 7) return;
    const KEY = 'stella_quiz_ton_deadline';
    let deadline = Number(localStorage.getItem(KEY) ?? 0);
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + 30 * 60 * 1000;
      localStorage.setItem(KEY, String(deadline));
    }
    const tick = () => {
      setSecondsLeft(Math.max(0, Math.floor((deadline - Date.now()) / 1000)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [step]);

  const timerText =
    secondsLeft !== null && secondsLeft > 0
      ? `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`
      : null;

  const plan = useMemo(() => buildTonePlan(zones), [zones]);
  const phoneComplete = phoneDigits.length === 9;

  const zoneLabels = zones
    .map((z) => TONE_ZONES.find((x) => x.id === z)?.label)
    .filter(Boolean)
    .join(' + ');
  const planLabel =
    plan.title === 'Твой набор зон' ? zoneLabels : `${plan.title} (${zoneLabels})`;

  const waText = encodeURIComponent(
    `Здравствуйте! Я прошла квиз по осветлению. Мой план: ${planLabel}. Хочу записаться на первый визит по акции за ${plan.promoPrice} сомони в ${city ?? 'Душанбе'}`
  );

  const go = (n: number) => {
    setStep(n);
    track('quiz_ton_step', { step: n });
    window.scrollTo({ top: 0 });
  };

  const pick = <T,>(setter: (v: T) => void, value: T, next: number) => {
    setter(value);
    go(next);
  };

  const submit = async () => {
    if (!phoneComplete || !name.trim() || sending) return;
    setSending(true);
    track('quiz_ton_submit');

    const payload = {
      source: 'Заявка из квиза «Ровный тон» (осветление)',
      name: name.trim(),
      phone: `+992 ${phoneDigits}`,
      whatsappOk: waOk,
      zones: zones.map((z) => TONE_ZONES.find((x) => x.id === z)?.label),
      method: TRIED.find((t) => t.id === tried)?.label,
      freq: DURATIONS.find((d) => d.id === duration)?.label,
      barrier: BARRIERS.find((b) => b.id === barrier)?.label,
      skin: '—',
      city,
      plan: plan.title,
      course9PerProc: plan.per5,
      utm,
      website: hp
    };

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {
      // результат показываем в любом случае
    }
    setSending(false);
    go(7);
  };

  const Progress = () =>
    step >= 1 && step <= TOTAL_QUESTIONS ? (
      <div className="mb-6">
        <p className="text-xs text-ink-900/50 mb-1.5">
          Вопрос {step} из {TOTAL_QUESTIONS}
        </p>
        <div className="h-1.5 rounded-full bg-ink-900/10 overflow-hidden">
          <div
            className="h-full bg-crimson-500 transition-all duration-300"
            style={{ width: `${(step / TOTAL_QUESTIONS) * 100}%` }}
          />
        </div>
      </div>
    ) : null;

  const Option = ({
    label,
    selected,
    onClick
  }: {
    label: string;
    selected?: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-xl border px-5 py-4 text-[15px] font-medium transition-colors ${
        selected
          ? 'border-crimson-500 bg-crimson-500 text-sand-50'
          : 'border-ink-900/15 bg-white/60 text-ink-900 hover:border-crimson-500/50'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-sand-50 flex flex-col">
      <div className="w-full max-w-md mx-auto px-5 py-8 flex-1">
        {/* Экран 0 — старт */}
        {step === 0 && (
          <div className="pt-10 text-center">
            <img
              src="/images/logo-crimson-full.webp"
              alt="STELLA — студия лазерной эпиляции"
              className="mx-auto h-16 w-auto"
            />
            <h1 className="mt-8 font-display font-extrabold text-3xl leading-tight text-ink-900">
              Ровный тон кожи — план за 1 минуту
            </h1>
            <p className="mt-4 text-ink-900/70 leading-relaxed">
              Потемнения на подмышках, бикини, коленях или локтях — решаемая
              задача. Ответь на 5 коротких вопросов — покажем твой план
              осветления и цену первого визита по акции 💫
            </p>
            <button
              onClick={() => go(1)}
              className="mt-8 w-full rounded-full bg-crimson-500 py-4 text-base font-semibold text-sand-50 hover:bg-crimson-600 transition-colors"
            >
              Начать
            </button>
            <p className="mt-3 text-xs text-ink-900/45">
              Бесплатно · без обязательств · результат сразу
            </p>
          </div>
        )}

        <Progress />

        {/* Вопрос 1 — зоны */}
        {step === 1 && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              Какие зоны хочешь осветлить?
            </h2>
            <div className="space-y-2.5">
              {TONE_ZONES.map((z) => (
                <Option
                  key={z.id}
                  label={z.label}
                  selected={zones.includes(z.id)}
                  onClick={() =>
                    setZones((prev) =>
                      prev.includes(z.id)
                        ? prev.filter((x) => x !== z.id)
                        : [...prev, z.id]
                    )
                  }
                />
              ))}
            </div>
            <button
              onClick={() => zones.length > 0 && go(2)}
              disabled={zones.length === 0}
              className="mt-6 w-full rounded-full bg-crimson-500 py-4 text-base font-semibold text-sand-50 disabled:opacity-50 transition-colors"
            >
              Дальше
            </button>
          </div>
        )}

        {/* Вопрос 2 — давность */}
        {step === 2 && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              Как давно замечаешь потемнение?
            </h2>
            <div className="space-y-2.5">
              {DURATIONS.map((d) => (
                <Option key={d.id} label={d.label} onClick={() => pick(setDuration, d.id, 3)} />
              ))}
            </div>
          </div>
        )}

        {/* Вопрос 3 — что пробовала */}
        {step === 3 && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              Что уже пробовала?
            </h2>
            <div className="space-y-2.5">
              {TRIED.map((t) => (
                <Option key={t.id} label={t.label} onClick={() => pick(setTried, t.id, 4)} />
              ))}
            </div>
          </div>
        )}

        {/* Вопрос 4 — барьер */}
        {step === 4 && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              Что останавливало от процедуры в студии?
            </h2>
            <div className="space-y-2.5">
              {BARRIERS.map((b) => (
                <Option key={b.id} label={b.label} onClick={() => pick(setBarrier, b.id, 5)} />
              ))}
            </div>
          </div>
        )}

        {/* Вопрос 5 — город */}
        {step === 5 && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              В каком городе ты живёшь?
            </h2>
            <div className="space-y-2.5">
              <Option label="Душанбе" onClick={() => pick(setCity, 'Душанбе', 6)} />
              <Option label="Худжанд" onClick={() => pick(setCity, 'Худжанд', 6)} />
            </div>
          </div>
        )}

        {/* Экран контакта */}
        {step === 6 && (
          <div>
            <h2 className="font-display font-bold text-2xl text-ink-900 mb-2">
              Готово! Куда прислать твой план?
            </h2>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium text-ink-900" htmlFor="q-name">
                  Имя
                </label>
                <input
                  id="q-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как к тебе обращаться"
                  className="mt-1.5 w-full rounded-lg border border-ink-900/15 bg-white/70 px-4 py-3.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-crimson-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-ink-900" htmlFor="q-phone">
                  Телефон / WhatsApp
                </label>
                <div className="mt-1.5 flex gap-2">
                  <span className="shrink-0 rounded-lg border border-ink-900/15 bg-white/70 px-3 py-3.5 text-[15px] text-ink-900/70">
                    +992
                  </span>
                  <input
                    id="q-phone"
                    type="tel"
                    inputMode="numeric"
                    value={phoneDigits}
                    onChange={(e) =>
                      setPhoneDigits(e.target.value.replace(/\D/g, '').slice(0, 9))
                    }
                    placeholder="93 364 0290"
                    className="w-full rounded-lg border border-ink-900/15 bg-white/70 px-4 py-3.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-crimson-500"
                  />
                </div>
                <p className="mt-1 text-xs text-ink-900/40">{phoneDigits.length}/9 цифр</p>
              </div>
              <input
                type="text"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                name="website"
              />
              <label className="flex items-start gap-2.5 text-sm text-ink-900/70">
                <input
                  type="checkbox"
                  checked={waOk}
                  onChange={(e) => setWaOk(e.target.checked)}
                  className="mt-0.5 accent-crimson-500"
                />
                Согласна получить расчёт в WhatsApp
              </label>
              <button
                onClick={submit}
                disabled={!phoneComplete || !name.trim() || sending}
                className="w-full rounded-full bg-crimson-500 py-4 text-base font-semibold text-sand-50 disabled:opacity-50 transition-colors"
              >
                {sending ? 'Считаем…' : 'Показать мой план'}
              </button>
              <p className="text-xs text-ink-900/45 text-center">
                Никакого спама — только твой расчёт и запись, если захочешь
              </p>
            </div>
          </div>
        )}

        {/* Экран результата */}
        {step === 7 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-ink-900 leading-tight">
                {name
                  ? `${name.trim().charAt(0).toUpperCase()}${name.trim().slice(1)}, для`
                  : 'Для'}{' '}
                твоих зон есть план осветления
              </h2>
              <p className="mt-2 text-sm text-ink-900/60">
                {plan.title === 'Твой набор зон' ? zoneLabels : plan.title}
                {' · '}осветляющий эффект — с первого визита
              </p>
              {barrier === 'doubt' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  Понимаем сомнения — поэтому ниже реальное фото после всего
                  одной процедуры.
                </p>
              )}
              {barrier === 'burn' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  Работаем на мягких профессиональных составах — арбутин и
                  транексамовая кислота, без агрессивных кислот. Параметры под
                  твой тип кожи + тест-зона на первом визите.
                </p>
              )}
              {barrier === 'shy' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  У нас только женщины-мастера, процедура проходит один на один
                  в закрытом кабинете.
                </p>
              )}
              {barrier === 'price' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  Поэтому первый визит — по акции, без покупки курса.
                </p>
              )}
              {tried === 'creams' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  И в отличие от кремов из интернета — здесь профессиональные
                  сертифицированные составы и мастер, который отвечает за
                  результат.
                </p>
              )}
              {tried === 'home' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  Лимон и сода часто только раздражают кожу — профессиональные
                  составы работают мягче и глубже.
                </p>
              )}
            </div>

            {/* ГЛАВНЫЙ ОФФЕР */}
            <div className="rounded-xl2 bg-crimson-500 p-5 text-sand-50">
              <p className="text-xs uppercase tracking-wide text-sand-50/70">
                Первый визит по акции
              </p>
              <p className="mt-2 font-display font-bold text-3xl">
                <span className="text-sand-50/50 line-through text-xl font-semibold mr-2">
                  {plan.regularPrice}
                </span>
                {plan.promoPrice} сомони
              </p>
              <p className="mt-1.5 text-sm text-sand-50/85">
                Все твои зоны + консультация мастера и тест-зона.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center rounded-full bg-sand-50 py-3.5 text-sm font-bold text-crimson-500 hover:bg-sand-100 transition-colors"
                onClick={() => track('quiz_ton_cta_whatsapp')}
              >
                Забронировать визит за {plan.promoPrice} сомони
              </a>
              {timerText && (
                <div className="mt-3 text-center">
                  <p className="text-xs text-sand-50/75">
                    ⏱ Отправь план сейчас — держим акционную цену за тобой
                  </p>
                  <p className="mt-1 font-display font-bold text-2xl tabular-nums tracking-wide">
                    {timerText}
                  </p>
                </div>
              )}
              <p className="mt-1.5 text-center text-xs text-sand-50/55">
                Сообщение с планом подставится автоматически
              </p>
            </div>

            {/* Фото-доказательство */}
            <div className="rounded-xl2 bg-white/70 p-5">
              <p className="text-xs uppercase tracking-wide text-ink-900/45">
                Реальный результат
              </p>
              <p className="mt-1 font-semibold text-ink-900">
                После одной процедуры
              </p>
              <div className="mt-3 rounded-xl overflow-hidden">
                <img
                  src="/images/quiz/whitening-ba.webp"
                  alt="Осветление подмышек — до и после одной процедуры"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-xs text-ink-900/50">
                Фото клиентки STELLA, публикуется с согласия. Результат
                индивидуален и зависит от типа кожи.
              </p>
            </div>

            {/* Курс */}
            <div className="rounded-xl2 bg-white/70 border-l-4 border-crimson-500/50 p-5">
              <p className="text-xs uppercase tracking-wide text-ink-900/45">
                Что дальше
              </p>
              <p className="mt-1 font-semibold text-ink-900">
                Стойкий результат — курс
              </p>
              <p className="mt-1.5 text-sm text-ink-900/70">
                Оптимальный курс — 5 процедур: {plan.per5} сомони / процедура
                ({plan.total5} за курс), интервал 7–10 дней. Есть курсы на 3 и 7
                процедур — мастер подберёт под твою кожу на первом визите.
              </p>
            </div>

            {/* Доверие */}
            <div className="rounded-xl2 bg-sand-100 border-l-4 border-amber-400/80 p-5">
              <p className="text-sm font-semibold text-ink-900">
                ⭐ Нам доверяют кожу тысячи клиенток
              </p>
              <p className="mt-2 text-sm text-ink-900/70 leading-relaxed">
                4 студии в Душанбе и Худжанде · сертифицированные мастера ·
                профессиональные составы Depiltouch
              </p>
              <a
                href="https://laserstella.com/otzyvy"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs font-medium text-crimson-500 hover:underline"
              >
                Отзывы о студиях STELLA →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
