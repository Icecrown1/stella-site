export default function PromoStrip() {
  return (
    <section className="bg-sand-100">
      <div className="container-page">
        <div className="grid sm:grid-cols-[1fr,1.4fr,auto] items-center gap-6 rounded-xl2 bg-sand-50 py-6 px-6 sm:px-8">
          <div className="hidden sm:block aspect-[4/3] w-full overflow-hidden rounded-xl bg-crimson-100">
            {/* TODO: /public/images/promo-hands.webp */}
          </div>
          <div>
            <p className="font-display font-bold text-xl sm:text-2xl text-ink-900">
              Бикини + подмышки
            </p>
            <p className="font-display font-extrabold text-4xl sm:text-5xl text-crimson-500 mt-1">
              100 сомони
            </p>
            <p className="text-sm text-ink-900/60 mt-1">
              вместо <span className="line-through">350</span> сомони · только для новых клиенток
            </p>
          </div>
          <a
            href="#zapis"
            className="justify-self-start sm:justify-self-end rounded-full bg-crimson-500 px-6 py-3.5 text-sm font-semibold text-sand-50 hover:bg-crimson-600 transition-colors whitespace-nowrap"
          >
            Записаться
          </a>
        </div>
      </div>
    </section>
  );
}
