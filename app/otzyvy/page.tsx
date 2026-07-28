import type { Metadata } from 'next';
import { Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import { REVIEWS } from '@/lib/reviews';
import { MASTERS } from '@/lib/masters';
import { STUDIOS } from '@/lib/studios';

const SITE_URL = 'https://laserstella.com';

export const metadata: Metadata = {
  title: 'Отзывы о лазерной эпиляции STELLA — Душанбе и Худжанд',
  description:
    'Реальные отзывы клиенток STELLA о лазерной эпиляции в Душанбе и Худжанде: впечатления от процедур, мастеров и результата.',
  alternates: { canonical: `${SITE_URL}/otzyvy` }
};

function masterInfo(masterSlug?: string) {
  if (!masterSlug) return null;
  const master = MASTERS.find((m) => m.slug === masterSlug);
  if (!master) return null;
  const studio = STUDIOS.find((s) => s.id === master.studioId);
  return { master, studio };
}

function ReviewCard({
  review
}: {
  review: (typeof REVIEWS)[number];
}) {
  const info = masterInfo(review.masterSlug);
  return (
    <div className="rounded-xl2 bg-sand-100 p-6 break-inside-avoid mb-4">
      <div className="flex items-center gap-3 mb-3">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            className="h-10 w-10 rounded-full object-cover shrink-0"
          />
        ) : (
          <div
            aria-hidden="true"
            className="h-10 w-10 rounded-full bg-crimson-100 text-crimson-600 flex items-center justify-center font-display font-semibold shrink-0"
          >
            {review.name.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-ink-900">{review.name}</p>
          <p className="text-xs text-ink-900/50">{review.city}</p>
        </div>
      </div>
      {review.rating && (
        <div className="flex gap-0.5 mb-2" aria-label={`Оценка ${review.rating} из 5`}>
          {Array.from({ length: review.rating }).map((_, j) => (
            <Star key={j} size={13} className="fill-crimson-500 text-crimson-500" />
          ))}
        </div>
      )}
      <p className="text-sm text-ink-900/75 leading-relaxed">{review.text}</p>
      {info && (
        <a
          href={`/studii/${info.studio?.slug}`}
          className="mt-3 inline-block text-xs font-medium text-crimson-500 hover:underline"
        >
          Мастер {info.master.name}
          {info.studio ? ` · ${info.studio.city}` : ''}
        </a>
      )}
    </div>
  );
}

export default function OtzyvyPage() {
  const dushanbe = REVIEWS.filter((r) => r.city === 'Душанбе');
  const khujand = REVIEWS.filter((r) => r.city === 'Худжанд');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Отзывы', item: `${SITE_URL}/otzyvy` }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        <section className="bg-sand-50 py-14">
          <div className="container-page max-w-5xl">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 mb-2">
              Отзывы о лазерной эпиляции STELLA
            </h1>
            <p className="text-ink-900/70 max-w-xl mb-4">
              Клиентки делятся впечатлениями после каждого визита — за два года
              работы студий их накопились сотни. Здесь публикуем часть из них —
              как есть, без редактуры: о процедурах, мастерах и результате.
            </p>
            <p className="text-sm text-ink-900/50 mb-10">
              Хотите поделиться впечатлением? Напишите нам в WhatsApp после
              процедуры — или оставьте отзыв на карточке студии в
              Google/Яндекс.Картах, так его увидят и другие.
            </p>

            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              Душанбе
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mb-12">
              {dushanbe.map((r, i) => (
                <ReviewCard key={`d-${i}`} review={r} />
              ))}
            </div>

            <h2 className="font-display font-bold text-xl text-ink-900 mb-5">
              Худжанд
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
              {khujand.map((r, i) => (
                <ReviewCard key={`h-${i}`} review={r} />
              ))}
            </div>
          </div>
        </section>

        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
