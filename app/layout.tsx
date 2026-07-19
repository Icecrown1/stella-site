import type { Metadata } from 'next';
import { Unbounded, Manrope } from 'next/font/google';
import './globals.css';

const display = Unbounded({
  subsets: ['latin', 'cyrillic'],
  weight: ['500', '700', '800'],
  variable: '--font-display'
});

const body = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'STELLA — лазерная эпиляция в Душанбе и Худжанде с Гарантией результата',
  description:
    'Лазерная эпиляция в Душанбе и Худжанде. Первая процедура — 100 сомони. Гарантия гладкости, все мастера — женщины, приватность и деликатность.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
