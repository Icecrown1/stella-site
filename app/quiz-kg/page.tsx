import type { Metadata } from 'next';
import QuizAppKg from '@/components/QuizAppKg';

export const metadata: Metadata = {
  title: 'Твой план гладкости за 1 минуту — квиз STELLA Кыргызстан',
  description:
    'Ответь на 6 коротких вопросов — получи персональный план: рекомендованные зоны, цену курса в сомах и расчёт экономии. Студии STELLA в Бишкеке и Оше.',
  alternates: { canonical: 'https://laserstella.com/quiz-kg' },
  robots: { index: true, follow: true }
};

export default function QuizKgPage() {
  return <QuizAppKg />;
}
