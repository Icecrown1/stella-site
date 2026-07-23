import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — STELLA",
  description:
    "Политика обработки персональных данных студии лазерной эпиляции STELLA.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-sand-50 py-14">
        <div className="container-page max-w-3xl">
          <h1 className="font-display font-bold text-3xl text-ink-900 mb-2">
            Политика конфиденциальности
          </h1>
          <p className="text-sm text-ink-900/50 mb-10">
            Действует для сайта laserstella.com студии STELLA
          </p>

          <div className="space-y-8 text-ink-900/80 text-sm leading-relaxed">
            <section>
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                1. Общие положения
              </h2>
              <p>
                Настоящая Политика определяет порядок обработки персональных
                данных посетителей сайта студии лазерной эпиляции STELLA (далее
                — «Студия»), работающей в Душанбе и Худжанде. Используя сайт и
                оставляя заявку на запись, вы соглашаетесь с условиями данной
                Политики.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                2. Какие данные мы собираем
              </h2>
              <p>Через форму записи на сайте мы получаем:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>имя, указанное вами в форме;</li>
                <li>номер телефона для связи;</li>
                <li>выбранную зону процедуры (при указании).</li>
              </ul>
              <p className="mt-2">
                Мы не запрашиваем и не собираем на сайте данные банковских карт,
                паспортные данные или иную специальную категорию персональных
                данных.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                3. Цели обработки данных
              </h2>
              <p>
                Данные, полученные через форму, используются исключительно для
                того, чтобы:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>связаться с вами и подтвердить запись на процедуру;</li>
                <li>
                  подобрать удобные дату, время и студию (Душанбе или Худжанд);
                </li>
                <li>проконсультировать по услугам и ответить на вопросы.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                4. Как передаются и где хранятся данные
              </h2>
              <p>
                Заявки с формы записи автоматически направляются администраторам
                Студии в защищённый корпоративный чат для оперативной обработки.
                Данные не передаются третьим лицам в рекламных целях и не
                продаются. При использовании CRM-систем (например, для учёта
                записей и истории визитов) данные могут храниться в
                соответствующей системе учёта клиентов Студии.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                5. Срок хранения и защита данных
              </h2>
              <p>
                Мы храним данные клиентов столько, сколько это необходимо для
                целей записи, оказания услуг и последующей связи (например,
                напоминаний о курсе процедур), и предпринимаем разумные меры для
                защиты данных от несанкционированного доступа.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                6. Ваши права
              </h2>
              <p>Вы вправе в любой момент:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>
                  запросить информацию о том, какие ваши данные у нас хранятся;
                </li>
                <li>попросить исправить неточные данные;</li>
                <li>отозвать согласие и запросить удаление ваших данных.</li>
              </ul>
              <p className="mt-2">
                Для этого напишите нам в WhatsApp или Instagram — контакты
                указаны в разделе «Контакты» на сайте.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                7. Файлы cookie и аналитика
              </h2>
              <p>
                Сайт может использовать технические файлы cookie и сервисы
                веб-аналитики (например, для подсчёта посещаемости) —
                исключительно для улучшения работы сайта. Эти данные не
                позволяют напрямую идентифицировать вас как личность.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                8. Изменения политики
              </h2>
              <p>
                Студия вправе обновлять данную Политику. Актуальная версия
                всегда доступна по этому адресу.
              </p>
            </section>

            <section>
              <h2 className="font-display font-semibold text-lg text-ink-900 mb-2">
                9. Контакты
              </h2>
              <p>
                По вопросам обработки персональных данных пишите в WhatsApp или
                Instagram STELLA — ссылки в футере сайта.
              </p>
            </section>
          </div>

          <p className="mt-12 text-xs text-ink-900/40 border-t border-ink-900/10 pt-6"></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
