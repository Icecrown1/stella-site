import { ShieldCheck, HeartHandshake, Sparkles, MapPin } from 'lucide-react';

const TRUST_POINTS = [
  { icon: Sparkles, label: 'Все мастера — женщины' },
  { icon: HeartHandshake, label: 'Безопасно и без боли' },
  { icon: ShieldCheck, label: 'Приватность и деликатность' },
  { icon: MapPin, label: 'Душанбе и Худжанд' }
];

export default function Hero() {
  return (
    <section id="top" className="bg-sand-50">
      <div className="container-page grid lg:grid-cols-2 gap-10 items-center py-12 lg:py-20">
        <div>
          <p className="text-sm font-semibold tracking-wide text-crimson-500 uppercase mb-4">
            Лазерная эпиляция в Душанбе и Худжанде
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl xl:text-6xl leading-[1.05] text-ink-900">
            Гладкая кожа
            <br />
            <span className="text-crimson-500">с Гарантией</span>
            <br />
            результата
          </h1>
          <p className="mt-6 text-lg text-ink-900/75 max-w-md">
            Доводим до идеального результата. Даже если для этого понадобится
            больше процедур — они для вас бесплатны.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#zapis"
              className="rounded-full bg-crimson-500 px-7 py-4 text-base font-semibold text-sand-50 hover:bg-crimson-600 transition-colors shadow-lg shadow-crimson-500/20"
            >
              Записаться — бикини + подмышки за 100 сомони
            </a>
            <div className="text-sm text-ink-900/60">
              вместо <span className="line-through">350</span> сомони
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 max-w-md">
            {TRUST_POINTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5 text-sm text-ink-900/75">
                <Icon size={18} className="mt-0.5 shrink-0 text-crimson-500" aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl2 bg-crimson-600">
            {/* TODO: заменить на реальное фото модели, /public/images/hero-model.webp */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-8">
              <p className="text-sand-100/70 text-sm">
                Фото модели · placeholder
                <br />
                hero-model.webp, 900×1125
              </p>
            </div>
            <svg
              className="absolute -right-10 -bottom-10 opacity-30"
              width="220"
              height="220"
              viewBox="0 0 220 220"
              aria-hidden="true"
            >
              <path
                d="M110 0 L130 90 L220 110 L130 130 L110 220 L90 130 L0 110 L90 90 Z"
                fill="#FBF3E7"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
