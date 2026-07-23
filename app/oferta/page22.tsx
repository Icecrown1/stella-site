export const metadata = {
  title: "Публичная оферта — STELLA",
  description:
    "Публичная оферта на оказание услуг лазерной эпиляции студии STELLA в Душанбе и Худжанде.",
};

export default function OfertaPage() {
  return (
    <main className="container-page py-20 max-w-2xl">
      <h1 className="font-display font-bold text-3xl text-ink-900 mb-8">
        Публичная оферта
      </h1>

      <div className="prose prose-sm text-ink-900/80 space-y-4">
        <p>
          Настоящая публичная оферта является предложением студии лазерной
          эпиляции <strong>STELLA</strong> (Душанбе и Худжанд, Республика
          Таджикистан) заключить договор на оказание косметологических услуг на
          следующих условиях.
        </p>

        <h2 className="font-display font-bold text-xl text-ink-900 mt-6">
          Предмет договора
        </h2>
        <p>
          Студия обязуется оказать клиенту услуги лазерной эпиляции в
          соответствии с выбранной зоной и тарифом. Клиент обязуется оплатить
          услуги согласно действующему прайс-листу.
        </p>

        <h2 className="font-display font-bold text-xl text-ink-900 mt-6">
          Запись и отмена
        </h2>
        <p>
          Запись осуществляется через форму на сайте, по телефону или в
          мессенджерах. Отмена или перенос визита возможны не позднее чем за 2
          часа до назначенного времени.
        </p>

        <h2 className="font-display font-bold text-xl text-ink-900 mt-6">
          Гарантия гладкости
        </h2>
        <p>
          При приобретении курса от 5 процедур студия предоставляет Гарантию
          гладкости: если результат не достигнут, дополнительные процедуры
          проводятся бесплатно до получения оговорённого результата.
        </p>

        <h2 className="font-display font-bold text-xl text-ink-900 mt-6">
          Контакты
        </h2>
        <p>
          По вопросам договора:{" "}
          <a href="tel:+992000000000" className="text-crimson-500">
            +992 … …
          </a>
        </p>
      </div>

      <a
        href="/"
        className="inline-block mt-10 text-crimson-500 font-medium hover:underline"
      >
        ← На главную
      </a>
    </main>
  );
}
