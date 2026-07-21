import type { Metadata } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700", "800"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "STELLA — лазерная эпиляция в Душанбе и Худжанде",
  description:
    "Лазерная эпиляция с Гарантией результата. Первая процедура — 100 сомони. Все мастера — женщины, приватность и деликатность. Студии в Душанбе и Худжанде.",
  alternates: {
    canonical: "https://laserstella.com/",
  },
  openGraph: {
    title: "STELLA — лазерная эпиляция в Душанбе и Худжанде",
    description:
      "Лазерная эпиляция с Гарантией результата. Первая процедура — 100 сомони. Все мастера — женщины.",
    url: "https://laserstella.com/",
    siteName: "STELLA",
    locale: "ru_TJ",
    type: "website",
    images: [
      {
        url: "https://laserstella.com/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "STELLA — студия лазерной эпиляции в Душанбе и Худжанде",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STELLA — лазерная эпиляция в Душанбе и Худжанде",
    description:
      "Лазерная эпиляция с Гарантией результата. Первая процедура — 100 сомони.",
    images: ["https://laserstella.com/images/og-cover.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
