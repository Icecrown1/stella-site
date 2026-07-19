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
            <img
              src="/images/garantiya-stamp.webp"
              alt="Гарантия гладкости"
              className="h-40 w-40 sm:h-48 sm:w-48 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
