import type { Metadata } from 'next';
import QuizApp from '@/components/QuizApp';

export const metadata: Metadata = {
  title: 'Твой план гладкости за 1 минуту — квиз STELLA',
  description:
    'Ответь на 6 коротких вопросов — получи персональный план: рекомендованные зоны, цену курса с рассрочкой и расчёт экономии по сравнению с бритьём и шугарингом.',
  alternates: { canonical: 'https://laserstella.com/quiz' },
  robots: { index: true, follow: true }
};

export default function QuizPage() {
  return <QuizApp />;
}
