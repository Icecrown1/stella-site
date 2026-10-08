'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ZONES,
  ZoneId,
  CityKg,
  buildPlanKg,
  fiveYearSpend,
  FREQ_OPTIONS
} from '@/lib/quiz-pricing-kg';

// Коды стран для номера клиентки: аудитория КГ часто с симками соседей
const COUNTRY_CODES = [
  { code: '+996', country: 'Кыргызстан', digits: 9, placeholder: '700 123 456' },
  { code: '+7', country: 'Россия / Казахстан', digits: 10, placeholder: '900 123 4567' },
  { code: '+998', country: 'Узбекистан', digits: 9, placeholder: '90 123 4567' },
  { code: '+992', country: 'Таджикистан', digits: 9, placeholder: '93 364 0290' }
];

const WHATSAPP_BY_CITY: Record<CityKg, string> = {
  Бишкек: '996704109106',
  Ош: '996553109106'
};
const GIS_REVIEWS_URL =
  'https://2gis.kg/bishkek/firm/70000001095135365/tab/reviews';

type Method = 'shave' | 'sugaring' | 'cream' | 'none';
type Barrier = 'pain' | 'price' | 'shy' | 'doubt' | 'busy';

const METHODS: { id: Method; label: string }[] = [
  { id: 'shave', label: 'Бритва' },
  { id: 'sugaring', label: 'Шугаринг / воск' },
  { id: 'cream', label: 'Крем-депилятор' },
  { id: 'none', label: 'Почти никак — надоело всё' }
];

const BARRIERS: { id: Barrier; label: string }[] = [
  { id: 'pain', label: 'Боюсь, что будет больно' },
  { id: 'price', label: 'Думала, это очень дорого' },
  { id: 'shy', label: 'Стесняюсь / неловко' },
  { id: 'doubt', label: 'Не верю, что будет результат' },
  { id: 'busy', label: 'Ничего — просто не доходили руки' }
];

const SKINS: { id: string; label: string }[] = [
  { id: 'light_dark', label: 'Светлая кожа, тёмные волосы' },
  { id: 'dark_dark', label: 'Смуглая кожа, тёмные волосы' },
  { id: 'light_hair', label: 'Светлые / рыжие волосы' },
  { id: 'unknown', label: 'Не знаю — пусть оценит мастер' }
];

const TOTAL_QUESTIONS = 6;

function track(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined') {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event, ...data });
  }
}

export default function QuizAppKg() {
  // step: 0 старт, 1..6 вопросы, 7 контакт, 8 результат
  const [step, setStep] = useState(0);
  const [zones, setZones] = useState<ZoneId[]>([]);
  const [method, setMethod] = useState<Method | null>(null);
  const [freqLabel, setFreqLabel] = useState<string | null>(null);
  const [freqPerYear, setFreqPerYear] = useState<number | null>(null);
  const [barrier, setBarrier] = useState<Barrier | null>(null);
  const [skin, setSkin] = useState<string | null>(null);
  const [city, setCity] = useState<CityKg | null>(null);
  const [name, setName] = useState('');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [countryCode, setCountryCode] = useState(COUNTRY_CODES[0].code);
  const selectedCode =
    COUNTRY_CODES.find((c) => c.code === countryCode) ?? COUNTRY_CODES[0];
  const [waOk, setWaOk] = useState(true);
  const [hp, setHp] = useState(''); // honeypot
  const [sending, setSending] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  // Таймер брони акционной цены: 30 минут, переживает перезагрузку страницы.
  // По истечении просто скрывается — запись не блокируем.
  useEffect(() => {
    if (step !== 8) return;
    const KEY = 'stella_quiz_kg_deadline';
    let deadline = Number(localStorage.getItem(KEY) ?? 0);
    if (!deadline || deadline < Date.now()) {
      deadline = Date.now() + 30 * 60 * 1000;
      localStorage.setItem(KEY, String(deadline));
    }
    const tick = () => {
      const left = Math.max(0, Math.floor((deadline - Date.now()) / 1000));
      setSecondsLeft(left);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [step]);

  const timerText =
    secondsLeft !== null && secondsLeft > 0
      ? `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`
      : null;

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const u: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((k) => {
      const v = p.get(k);
      if (v) u[k] = v;
    });
    setUtm(u);
  }, []);

  const plan = useMemo(() => buildPlanKg(zones), [zones]);
  const spend5y = useMemo(
    () =>
      method && method !== 'none' && freqPerYear
        ? fiveYearSpend(method, freqPerYear)
        : null,
    [method, freqPerYear]
  );
  const course9Total = plan.course9Total;
  const savings = spend5y !== null ? spend5y - course9Total : null;

  const phoneComplete = phoneDigits.length === selectedCode.digits;

  const go = (n: number) => {
    setStep(n);
    track('quiz_step', { step: n });
    window.scrollTo({ top: 0 });
  };

  const pick = <T,>(setter: (v: T) => void, value: T, next: number) => {
    setter(value);
    go(next);
  };

  const submit = async () => {
    if (!phoneComplete || !name.trim() || sending) return;
    setSending(true);
    track('quiz_submit');

    const payload = {
      name: name.trim(),
      country: 'kg',
      phone: `${countryCode} ${phoneDigits}`,
      whatsappOk: waOk,
      zones: zones.map((z) => ZONES.find((x) => x.id === z)?.label),
      method: METHODS.find((m) => m.id === method)?.label,
      freq: freqLabel ?? '—',
      barrier: BARRIERS.find((b) => b.id === barrier)?.label,
      skin: SKINS.find((s) => s.id === skin)?.label,
      city,
      plan: plan.title,
      course9PerProc: plan.course9PerProc,
      savings5y: savings,
      utm,
      website: hp // honeypot
    };

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {
      // Результат показываем в любом случае (требование ТЗ)
    }
    setSending(false);
    go(8);
  };

  const zoneLabels = zones
    .map((z) => ZONES.find((x) => x.id === z)?.label)
    .filter(Boolean)
    .join(' + ');
  const planLabel =
    plan.title === 'Твой набор зон' ? zoneLabels : `${plan.title} (${zoneLabels})`;
  const waText = encodeURIComponent(
    `Здравствуйте! Я прошла квиз. Мой план: ${planLabel}. Хочу записаться на первый визит по акции за ${plan.promoPrice} сом в ${city ?? 'Бишкек'}`
  );

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
              Узнай свой план гладкости за 1 минуту
            </h1>
            <p className="mt-4 text-ink-900/70 leading-relaxed">
              Ответь на 6 коротких вопросов — и мы посчитаем, какие зоны,
              сколько процедур и сколько это стоит именно для тебя. А ещё —
              сколько ты сэкономишь по сравнению с бритьём 💫
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

        {/* Вопрос 1 — зоны (мультивыбор) */}
        {step === 1 && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              Какие зоны тебя беспокоят?
            </h2>
            <div className="space-y-2.5">
              {ZONES.map((z) => (
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

        {/* Вопрос 2 — способ */}
        {step === 2 && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              Как ты сейчас удаляешь волосы?
            </h2>
            <div className="space-y-2.5">
              {METHODS.map((m) => (
                <Option
                  key={m.id}
                  label={m.label}
                  onClick={() => pick(setMethod, m.id, m.id === 'none' ? 4 : 3)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Вопрос 3 — частота (варианты зависят от способа; при «почти никак» пропускается) */}
        {step === 3 && method && method !== 'none' && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              {method === 'sugaring'
                ? 'Как часто обычно делаешь шугаринг или воск?'
                : method === 'cream'
                ? 'Как часто пользуешься кремом?'
                : 'Как часто приходится браться за бритву?'}
            </h2>
            <div className="space-y-2.5">
              {(FREQ_OPTIONS[method] ?? []).map((f) => (
                <Option
                  key={f.id}
                  label={f.label}
                  onClick={() => {
                    setFreqLabel(f.label);
                    setFreqPerYear(f.perYear);
                    go(4);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Вопрос 4 — барьер */}
        {step === 4 && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              Что до сих пор останавливало тебя от лазерной эпиляции?
            </h2>
            <div className="space-y-2.5">
              {BARRIERS.map((b) => (
                <Option key={b.id} label={b.label} onClick={() => pick(setBarrier, b.id, 5)} />
              ))}
            </div>
          </div>
        )}

        {/* Вопрос 5 — кожа/волосы */}
        {step === 5 && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              Какое сочетание ближе к твоему?
            </h2>
            <div className="space-y-2.5">
              {SKINS.map((s) => (
                <Option key={s.id} label={s.label} onClick={() => pick(setSkin, s.id, 6)} />
              ))}
            </div>
          </div>
        )}

        {/* Вопрос 6 — город */}
        {step === 6 && (
          <div>
            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              В каком городе ты живёшь?
            </h2>
            <div className="space-y-2.5">
              <Option label="Бишкек" onClick={() => pick(setCity, 'Бишкек', 7)} />
              <Option label="Ош" onClick={() => pick(setCity, 'Ош', 7)} />
            </div>
          </div>
        )}

        {/* Экран контакта */}
        {step === 7 && (
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
                  <select
                    aria-label="Код страны"
                    value={countryCode}
                    onChange={(e) => {
                      setCountryCode(e.target.value);
                      setPhoneDigits('');
                    }}
                    className="shrink-0 rounded-lg border border-ink-900/15 bg-white/70 px-3 py-3.5 text-[15px] text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-500"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    id="q-phone"
                    type="tel"
                    inputMode="numeric"
                    value={phoneDigits}
                    onChange={(e) =>
                      setPhoneDigits(
                        e.target.value.replace(/\D/g, '').slice(0, selectedCode.digits)
                      )
                    }
                    placeholder={selectedCode.placeholder}
                    className="w-full rounded-lg border border-ink-900/15 bg-white/70 px-4 py-3.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-crimson-500"
                  />
                </div>
                <p className="mt-1 text-xs text-ink-900/40">
                  {selectedCode.country} · {phoneDigits.length}/{selectedCode.digits} цифр
                </p>
              </div>
              {/* honeypot — скрыт от людей */}
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
                Согласен(на) получить расчёт в WhatsApp
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

        {/* Экран результата — структура по аудиту конверсии:
            персональный план → главный оффер (акция+таймер+CTA) →
            курс с гарантией → экономия только в плюс → доказательства */}
        {step === 8 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-extrabold text-2xl text-ink-900 leading-tight">
                {name
                  ? `${name.trim().charAt(0).toUpperCase()}${name.trim().slice(1)}, тебе`
                  : 'Тебе'}{' '}
                подойдёт{' '}
                {plan.title === 'Твой набор зон'
                  ? `комплекс «${zoneLabels}»`
                  : plan.title}
              </h2>
              <p className="mt-2 text-sm text-ink-900/60">
                {plan.title !== 'Твой набор зон' && (
                  <>
                    {zones
                      .map((z) => ZONES.find((x) => x.id === z)?.label)
                      .join(', ')}
                    {' · '}
                  </>
                )}
                обычно 6–9 процедур с интервалом ~месяц
              </p>
              {barrier === 'pain' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  И не переживай: аппарат охлаждает кожу до ~0° в момент вспышки
                  — большинство описывает ощущения как тёплые щелчки.
                </p>
              )}
              {barrier === 'shy' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  Процедуры проходят один на один с мастером в закрытом
                  кабинете — деликатно и без посторонних.
                </p>
              )}
              {barrier === 'doubt' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  Результат закреплён письменной гарантией — она ниже.
                </p>
              )}
              {barrier === 'price' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  Поэтому начать можно с акционного первого визита — без покупки
                  курса.
                </p>
              )}
              {barrier === 'busy' && (
                <p className="mt-2 text-sm text-ink-900/70">
                  Хорошая новость: первый шаг займёт всего пару минут.
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
                {plan.promoPrice} сом
              </p>
              <p className="mt-1.5 text-sm text-sand-50/85">
                Все твои зоны + консультация мастера.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_BY_CITY[city ?? 'Бишкек']}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center rounded-full bg-sand-50 py-3.5 text-sm font-bold text-crimson-500 hover:bg-sand-100 transition-colors"
                onClick={() => track('quiz_cta_whatsapp')}
              >
                Забронировать визит за {plan.promoPrice} сом
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

            {/* Курс — продолжение, не ценник */}
            <div className="rounded-xl2 bg-white/70 border-l-4 border-crimson-500/50 p-5">
              <p className="text-xs uppercase tracking-wide text-ink-900/45">
                Что дальше
              </p>
              <p className="mt-1 font-semibold text-ink-900">
                Курс до полной гладкости
              </p>
              <p className="mt-1.5 text-sm text-ink-900/70">
                {plan.course9PerProc} сом / процедура на курсе из 9 процедур
                · есть беспроцентная рассрочка.
              </p>
              <p className="mt-3 rounded-lg bg-crimson-500/10 px-3.5 py-2.5 text-sm text-ink-900/85">
                🛡 Если после полного курса результата не будет — продолжим
                бесплатно. Это письменная гарантия.
              </p>
            </div>

            {/* Экономия — только когда она реально в плюс */}
            {savings !== null && savings > 0 ? (
              <div className="rounded-xl2 border-2 border-crimson-500/30 bg-crimson-500/5 p-5">
                <p className="text-xs uppercase tracking-wide text-crimson-500/80">
                  Твоя выгода
                </p>
                <p className="mt-1 font-semibold text-ink-900">Экономия за 5 лет</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl bg-ink-900/5 p-3">
                    <p className="text-xs text-ink-900/50">Текущий способ, 5 лет</p>
                    <p className="font-display font-bold text-lg text-ink-900">
                      ~{spend5y} сом
                    </p>
                  </div>
                  <div className="rounded-xl bg-crimson-500/10 p-3">
                    <p className="text-xs text-ink-900/50">Курс STELLA</p>
                    <p className="font-display font-bold text-lg text-crimson-500">
                      {course9Total} сом
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-center">
                  <span className="inline-block rounded-full bg-crimson-500 px-4 py-1.5 text-sm font-bold text-sand-50">
                    Экономия — ~{savings} сом 🎉
                  </span>
                </p>
                {method === 'shave' && (
                  <p className="mt-3 text-sm text-ink-900/70 leading-relaxed">
                    И это только деньги. Вместе с бритвой уходят порезы,
                    раздражение и вросшие волосы — кожа перестаёт жить в режиме
                    постоянного стресса.
                  </p>
                )}
              </div>
            ) : method === 'shave' ? (
              <div className="rounded-xl2 border-2 border-crimson-500/20 bg-crimson-500/5 p-5">
                <p className="text-xs uppercase tracking-wide text-crimson-500/80">
                  Твоя выгода
                </p>
                <p className="mt-1 font-semibold text-ink-900">Что уходит вместе с бритвой</p>
                <p className="mt-1.5 text-sm text-ink-900/70 leading-relaxed">
                  Порезы, раздражение и вросшие волосы — кожа перестаёт жить в
                  режиме постоянного стресса, а «побриться перед выходом»
                  исчезает из списка дел насовсем.
                </p>
              </div>
            ) : method === 'sugaring' ? (
              <div className="rounded-xl2 border-2 border-crimson-500/20 bg-crimson-500/5 p-5">
                <p className="text-xs uppercase tracking-wide text-crimson-500/80">
                  Твоя выгода
                </p>
                <p className="mt-1 font-semibold text-ink-900">Без боли по расписанию</p>
                <p className="mt-1.5 text-sm text-ink-900/70 leading-relaxed">
                  Больше не нужно отращивать волосы между визитами и терпеть
                  боль каждый месяц — после курса кожа гладкая сама по себе.
                </p>
              </div>
            ) : method === 'cream' ? (
              <div className="rounded-xl2 border-2 border-crimson-500/20 bg-crimson-500/5 p-5">
                <p className="text-xs uppercase tracking-wide text-crimson-500/80">
                  Твоя выгода
                </p>
                <p className="mt-1 font-semibold text-ink-900">Без запаха и раздражения</p>
                <p className="mt-1.5 text-sm text-ink-900/70 leading-relaxed">
                  Никаких резких запахов, риска раздражения и повторов каждую
                  неделю — курс закрывает вопрос системно.
                </p>
              </div>
            ) : (
              <div className="rounded-xl2 border-2 border-crimson-500/20 bg-crimson-500/5 p-5">
                <p className="text-xs uppercase tracking-wide text-crimson-500/80">
                  Твоя выгода
                </p>
                <p className="mt-1 font-semibold text-ink-900">Твоё время тоже ресурс</p>
                <p className="mt-1.5 text-sm text-ink-900/70">
                  ~15 минут в неделю на удаление волос × 5 лет = 65 часов твоей
                  жизни. Курс освобождает их насовсем.
                </p>
              </div>
            )}

            {/* Доказательства — реальный рейтинг 2ГИС */}
            <div className="rounded-xl2 bg-sand-100 border-l-4 border-amber-400/80 p-5">
              <p className="text-sm font-semibold text-ink-900">
                ⭐ 5.0 — сотни отзывов на 2ГИС
              </p>
              <p className="mt-2 text-sm text-ink-900/70 italic leading-relaxed">
                «Результат увидела сразу после первой процедуры, спасибо
                мастеру!» — Aiperim M., Бишкек
              </p>
              <a
                href={GIS_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs font-medium text-crimson-500 hover:underline"
              >
                Читать отзывы на 2ГИС →
              </a>
            </div>

            <p className="text-center text-xs text-ink-900/45">
              5 студий в Кыргызстане — Бишкек и Ош · сертифицированные мастера ·
              трёхволновой лазер
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
