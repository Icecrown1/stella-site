import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingForm from '@/components/BookingForm';
import PhotoPlaceholder from '@/components/PhotoPlaceholder';
import { POSTS, getPostBySlug } from '@/lib/posts';
import { getZoneBySlug } from '@/lib/zones';

const SITE_URL = 'https://laserstella.com';

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url,
      siteName: 'STELLA',
      locale: 'ru_TJ',
      type: 'article',
      images: [
        {
          url: `${SITE_URL}/images/og-cover.jpg`,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    }
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const otherPosts = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedZones = (post.relatedZoneSlugs ?? [])
    .map((slug) => getZoneBySlug(slug))
    .filter(Boolean);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'STELLA — лазерная эпиляция' },
    publisher: { '@type': 'Organization', name: 'STELLA — лазерная эпиляция' },
    mainEntityOfPage: url
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Блог', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Header />
      <main>
        <article className="bg-sand-50 py-14">
          <div className="container-page max-w-2xl">
            <nav className="text-xs text-ink-900/50 mb-6" aria-label="Хлебные крошки">
              <a href="/" className="hover:text-crimson-500">Главная</a>
              {' / '}
              <a href="/blog" className="hover:text-crimson-500">Блог</a>
            </nav>

            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-ink-900 leading-tight">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-ink-900/50">{post.readMinutes} мин чтения</p>

            {post.coverImage && (
              <div className="mt-6">
                {post.coverImage.photo ? (
                  <div
                    className={`w-full rounded-xl2 overflow-hidden ${
                      post.coverImage.aspect === 'square'
                        ? 'aspect-square max-w-sm mx-auto'
                        : post.coverImage.aspect === 'portrait'
                        ? 'aspect-[4/5] max-w-xs mx-auto'
                        : 'aspect-video'
                    }`}
                  >
                    <img
                      src={post.coverImage.photo}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <PhotoPlaceholder
                    note={post.coverImage.placeholderNote}
                    aspect={post.coverImage.aspect}
                  />
                )}
              </div>
            )}

            <div className="mt-8 space-y-6">
              {post.sections.map((section, i) => (
                <div key={i}>
                  {section.heading && (
                    <h2 className="font-display font-semibold text-xl text-ink-900 mb-3">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-ink-900/75 leading-relaxed mb-3">
                      {p}
                    </p>
                  ))}
                  {section.image && (
                    <div className="my-4">
                      {section.image.photo ? (
                        <div
                          className={`w-full rounded-xl2 overflow-hidden ${
                            section.image.aspect === 'square'
                              ? 'aspect-square max-w-sm mx-auto'
                              : section.image.aspect === 'portrait'
                              ? 'aspect-[4/5] max-w-xs mx-auto'
                              : 'aspect-video'
                          }`}
                        >
                          <img
                            src={section.image.photo}
                            alt={section.heading ?? post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <PhotoPlaceholder
                          note={section.image.placeholderNote}
                          aspect={section.image.aspect}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {relatedZones.length > 0 && (
              <div className="mt-10">
                <p className="text-sm font-medium text-ink-900/60 uppercase tracking-wide mb-3">
                  Смотрите также
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedZones.map((zone) => (
                    <a
                      key={zone!.slug}
                      href={`/uslugi/${zone!.slug}`}
                      className="rounded-full border border-ink-900/15 px-4 py-2 text-sm text-ink-900/70 hover:border-crimson-500 hover:text-crimson-500 transition-colors"
                    >
                      {zone!.name} — {zone!.price}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {otherPosts.length > 0 && (
              <div className="mt-10 border-t border-ink-900/10 pt-8">
                <p className="text-sm font-medium text-ink-900/60 uppercase tracking-wide mb-3">
                  Другие статьи
                </p>
                <div className="flex flex-col gap-2">
                  {otherPosts.map((p) => (
                    <a
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="text-crimson-500 font-medium hover:underline"
                    >
                      {p.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        <BookingForm />
      </main>
      <Footer />
    </>
  );
}
