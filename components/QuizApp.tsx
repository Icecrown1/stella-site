'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ZONES,
  ZoneId,
  buildPlan,
  fiveYearSpend,
  FREQ_OPTIONS
} from '@/lib/quiz-pricing';

const WHATSAPP_NUMBER = '992977607711';
const ALTEGIO_KHUJAND = 'https://n1413217.alteg.io';

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
  { id: 'shy', label: 'Стеснение / неловко' },
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

export default function QuizApp() {
  // step: 0 старт, 1..6 вопросы, 7 контакт, 8 результат
  const [step, setStep] = useState(0);
  const [zones, setZones] = useState<ZoneId[]>([]);
  const [method, setMethod] = useState<Method | null>(null);
  const [freqLabel, setFreqLabel] = useState<string | null>(null);
  const [freqPerYear, setFreqPerYear] = useState<number | null>(null);
  const [barrier, setBarrier] = useState<Barrier | null>(null);
  const [skin, setSkin] = useState<string | null>(null);
  const [city, setCity] = useState<'Душанбе' | 'Худжанд' | null>(null);
  const [name, setName] = useState('');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [waOk, setWaOk] = useState(true);
  const [hp, setHp] = useState(''); // honeypot
  const [sending, setSending] = useState(false);
  const [utm, setUtm] = useState<Record<string, string>>({});

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const u: Record<string, string> = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((k) => {
      const v = p.get(k);
      if (v) u[k] = v;
    });
    setUtm(u);
  }, []);

  const plan = useMemo(() => buildPlan(zones, city ?? 'Душанбе'), [zones, city]);
  const spend5y = useMemo(
    () =>
      method && method !== 'none' && freqPerYear
        ? fiveYearSpend(method, freqPerYear)
        : null,
    [method, freqPerYear]
  );
  const course9Total = plan.course9Total;
  const savings = spend5y !== null ? spend5y - course9Total : null;

  const phoneComplete = phoneDigits.length === 9;

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
      phone: `+992 ${phoneDigits}`,
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
    `Здравствуйте! Я прошла квиз. Мой план: ${planLabel}, курс 9 процедур — ${plan.course9Total} сомони. Хочу записаться в ${city ?? 'Душанбе'}`
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
              Где тебе удобнее?
            </h2>
            <div className="space-y-2.5">
              <Option label="Душанбе" onClick={() => pick(setCity, 'Душанбе', 7)} />
              <Option label="Худжанд" onClick={() => pick(setCity, 'Худжанд', 7)} />
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
        {step === 8 && (
          <div className="space-y-4">
            <h2 className="font-display font-extrabold text-2xl text-ink-900">
              {name
                ? `${name.trim().charAt(0).toUpperCase()}${name.trim().slice(1)}, твой`
                : 'Твой'}{' '}
              план гладкости 💫
            </h2>

            {/* 1. Персональный блок по барьеру */}
            {barrier === 'pain' && (
              <div className="rounded-xl2 bg-white/70 p-5">
                <p className="font-semibold text-ink-900">Это спокойнее, чем ты думаешь</p>
                <p className="mt-1.5 text-sm text-ink-900/70 leading-relaxed">
                  Аппарат охлаждает кожу до ~0° в момент вспышки — большинство
                  описывает ощущение как тёплые щелчки. Можно начать с одной
                  зоны за 75 сомони и убедиться самой.
                </p>
              </div>
            )}
            {barrier === 'shy' && (
              <div className="rounded-xl2 bg-white/70 p-5">
                <p className="font-semibold text-ink-900">Только женщины и полная приватность</p>
                <p className="mt-1.5 text-sm text-ink-900/70 leading-relaxed">
                  В STELLA работают только женщины-мастера, процедуры проходят в
                  отдельных закрытых кабинетах, используются одноразовые
                  материалы.
                </p>
              </div>
            )}
            {barrier === 'doubt' && (
              <div className="rounded-xl2 bg-white/70 p-5">
                <p className="font-semibold text-ink-900">Результат — с письменной гарантией</p>
                <p className="mt-1.5 text-sm text-ink-900/70 leading-relaxed">
                  Гарантия действует на курс из 9 процедур: если после 9
                  оплаченных процедур результата нет — продолжаем бесплатно,
                  пока результат не будет достигнут.
                </p>
              </div>
            )}

            {/* 2. План */}
            <div className="rounded-xl2 bg-white/70 p-5">
              <p className="text-xs uppercase tracking-wide text-ink-900/50">Твои зоны</p>
              <p className="mt-1 text-sm text-ink-900/80">
                {zones.map((z) => ZONES.find((x) => x.id === z)?.label).join(', ')}
              </p>
              <p className="mt-3 font-display font-semibold text-lg text-ink-900">
                {plan.title}
              </p>
              <p className="mt-1.5 text-sm text-ink-900/70">
                Обычно нужно 6–9 процедур с интервалом ~1 месяц — точное число
                мастер уточнит на первом визите.
              </p>
            </div>

            {/* 3. Цена курса */}
            <div className="rounded-xl2 bg-crimson-500 p-5 text-sand-50">
              <p className="text-xs uppercase tracking-wide text-sand-50/70">
                Курс 9 процедур · Гарантия: доводим до результата
              </p>
              <p className="mt-2 font-display font-bold text-2xl">
                {plan.course9PerProc} сомони / процедура
              </p>
              <p className="mt-1 text-sm text-sand-50/80">
                Курс целиком — {plan.course9Total} сомони · рассрочка на 3–4
                платежа без процентов (~{Math.round(plan.course9Total / 4)}
                {' '}сомони/платёж)
              </p>
              <p className="mt-2 text-xs text-sand-50/60">
                Есть также курсы на 5 и 7 процедур
              </p>
            </div>

            {/* 4. Экономия */}
            {method === 'none' ? (
              <div className="rounded-xl2 bg-white/70 p-5">
                <p className="font-semibold text-ink-900">Твоё время тоже ресурс</p>
                <p className="mt-1.5 text-sm text-ink-900/70">
                  ~15 минут в неделю на удаление волос × 5 лет = 65 часов твоей
                  жизни. Курс освобождает их насовсем.
                </p>
              </div>
            ) : savings !== null && savings > 0 ? (
              <div className="rounded-xl2 bg-white/70 p-5">
                <p className="font-semibold text-ink-900">Твоя экономия за 5 лет</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl bg-ink-900/5 p-3">
                    <p className="text-xs text-ink-900/50">Текущий способ, 5 лет</p>
                    <p className="font-display font-bold text-lg text-ink-900">
                      ~{spend5y} с.
                    </p>
                  </div>
                  <div className="rounded-xl bg-crimson-500/10 p-3">
                    <p className="text-xs text-ink-900/50">Курс STELLA</p>
                    <p className="font-display font-bold text-lg text-crimson-500">
                      {course9Total} с.
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-center font-semibold text-ink-900">
                  Экономия — ~{savings} сомони 🎉
                </p>
                {method === 'shave' && (
                  <p className="mt-3 text-sm text-ink-900/70 leading-relaxed">
                    И это только деньги. Вместе с бритвой уходят порезы,
                    раздражение и вросшие волосы — кожа перестаёт жить в режиме
                    постоянного стресса.
                  </p>
                )}
              </div>
            ) : spend5y !== null ? (
              <div className="rounded-xl2 bg-white/70 p-5">
                <p className="text-sm text-ink-900/70">
                  На текущем способе за 5 лет уйдёт ~{spend5y} сомони — и волосы
                  будут возвращаться снова. Курс решает вопрос надолго.
                </p>
                {method === 'shave' && (
                  <p className="mt-3 text-sm text-ink-900/70 leading-relaxed">
                    И это только деньги. Вместе с бритвой уходят порезы,
                    раздражение и вросшие волосы — кожа перестаёт жить в режиме
                    постоянного стресса.
                  </p>
                )}
              </div>
            ) : null}

            {/* 5. CTA */}
            <div className="rounded-xl2 bg-white/70 p-5">
              <p className="font-semibold text-ink-900">
                Начни с первого визита по акции — {plan.promoPrice} сомони
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-full text-center rounded-full bg-crimson-500 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors"
                onClick={() => track('quiz_cta_whatsapp')}
              >
                Записаться в WhatsApp
              </a>
              <a
                href={
                  city === 'Худжанд' ? ALTEGIO_KHUJAND : 'https://laserstella.com/#zapis'
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block w-full text-center rounded-full border border-crimson-500/40 py-3.5 text-sm font-semibold text-crimson-500 hover:bg-crimson-500 hover:text-sand-50 transition-colors"
                onClick={() => track('quiz_cta_online')}
              >
                Записаться онлайн
              </a>
              <p className="mt-2 text-center text-xs text-ink-900/45">
                Сообщение с твоим планом уже подставится — просто отправь его
              </p>
            </div>

            {/* 6. Доверие */}
            <div className="rounded-xl2 bg-white/70 p-5 text-center">
              <p className="text-xs text-ink-900/50">
                4 студии в Таджикистане · сертифицированные мастера · трёхволновой
                лазер ADSS FG2000B
              </p>
              <p className="mt-3 text-sm text-ink-900/70 italic leading-relaxed">
                «Процедура прошла очень комфортно. Всё было подробно объяснено, а
                во время процедуры я чувствовала себя спокойно» — Шохона, Душанбе
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
