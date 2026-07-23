export const metadata = {
  title: 'Политика конфиденциальности — STELLA',
  description: 'Политика конфиденциальности студии лазерной эпиляции STELLA в Душанбе и Худжанде.',
};

export default function PrivacyPage() {
  return (
    <main className="container-page py-20 max-w-2xl">
      <h1 className="font-display font-bold text-3xl text-ink-900 mb-8">
        Политика конфиденциальности
      </h1>

      <div className="prose prose-sm text-ink-900/80 space-y-4">
        <p>
          Настоящая политика конфиденциальности определяет порядок сбора, хранения и использования
          персональных данных клиентов студии лазерной эпиляции <strong>STELLA</strong>
          (Душанбе и Худжанд, Республика Таджикистан).
        </p>

        <h2 className="font-display font-bold text-xl text-ink-900 mt-6">Какие данные мы собираем</h2>
        <p>
          При записи через форму на сайте мы собираем имя и номер телефона. Эти данные используются
          исключительно для подтверждения записи и связи с вами.
        </p>

        <h2 className="font-display font-bold text-xl text-ink-900 mt-6">Как мы используем данные</h2>
        <p>
          Данные используются только для организации визита в студию. Мы не передаём ваши данные
          третьим лицам и не используем их в маркетинговых целях без вашего согласия.
        </p>

        <h2 className="font-display font-bold text-xl text-ink-900 mt-6">Хранение данных</h2>
        <p>
          Персональные данные хранятся в защищённых системах и удаляются по вашему запросу.
          Для удаления данных обратитесь к администратору студии.
        </p>

        <h2 className="font-display font-bold text-xl text-ink-900 mt-6">Контакты</h2>
        <p>
          По вопросам конфиденциальности: <a href="tel:+992000000000" className="text-crimson-500">+992 … …</a>
        </p>
      </div>

      <a href="/" className="inline-block mt-10 text-crimson-500 font-medium hover:underline">
        ← На главную
      </a>
    </main>
  );
}
