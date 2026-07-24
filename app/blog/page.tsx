import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { POSTS } from '@/lib/posts';

const SITE_URL = 'https://laserstella.com';

export const metadata: Metadata = {
  title: 'Блог о лазерной эпиляции — STELLA',
  description:
    'Отвечаем на частые вопросы о лазерной эпиляции: боль, количество процедур, Гарантия гладкости и другие темы, которые волнуют наших клиенток.',
  alternates: { canonical: `${SITE_URL}/blog` }
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="bg-sand-50 py-14">
        <div className="container-page max-w-3xl">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 mb-2">
            Блог STELLA
          </h1>
          <p className="text-ink-900/70 max-w-lg mb-10">
            Отвечаем честно на вопросы, которые чаще всего слышим от клиенток
            — до и после записи.
          </p>

          <div className="space-y-4">
            {POSTS.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl2 bg-sand-100 p-6 hover:bg-sand-200 transition-colors"
              >
                <p className="font-display font-semibold text-lg text-ink-900">
                  {post.title}
                </p>
                <p className="text-sm text-ink-900/60 mt-2">{post.excerpt}</p>
                <p className="text-xs text-ink-900/40 mt-3">
                  {post.readMinutes} мин чтения
                </p>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
