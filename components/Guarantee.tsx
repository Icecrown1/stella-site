export default function Guarantee() {
  return (
    <section className="bg-sand-50 py-14">
      <div className="container-page">
        <div className="grid md:grid-cols-[1.3fr,auto] gap-10 items-center rounded-xl2 bg-sand-100 p-8 sm:p-12">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-ink-900">
              Гарантия гладкости
            </h2>
            <p className="mt-4 text-ink-900/75 max-w-lg">
              Покупая курс из 9 процедур, мы гарантируем: доводим вас до
              результата.
            </p>
            <p className="mt-3 font-semibold text-ink-900 max-w-lg">
              Если для достижения гладкости потребуется больше процедур — они
              будут для вас бесплатными.
            </p>
            <p className="mt-4 text-xs text-ink-900/50">
              * подробности у администратора
            </p>
          </div>

          <div className="justify-self-center shrink-0">
            <GuaranteeBadge />
          </div>
        </div>
      </div>
    </section>
  );
}

function GuaranteeBadge() {
  const text = 'ГАРАНТИЯ ГЛАДКОСТИ • ГАРАНТИЯ ГЛАДКОСТИ • ';
  const chars = text.split('');
  const radius = 68;

  return (
    <div className="relative h-40 w-40 sm:h-48 sm:w-48" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
        viewBox="0 0 160 160"
      >
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#A81530"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <text fill="#A81530" fontSize="9.5" fontWeight="600" letterSpacing="1.5">
          <textPath href="#badge-circle" startOffset="0%">
            {chars.map((c, i) => (
              <tspan key={i}>{c}</tspan>
            ))}
          </textPath>
        </text>
        <defs>
          <path
            id="badge-circle"
            d={`M 80 ${80 - radius} A ${radius} ${radius} 0 1 1 ${80 - 0.01} ${
              80 - radius
            }`}
            fill="none"
          />
        </defs>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border border-crimson-500/40 bg-sand-50">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2 L14 9 L21 9 L15.5 13.5 L17.5 21 L12 16.5 L6.5 21 L8.5 13.5 L3 9 L10 9 Z"
              fill="#A81530"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
