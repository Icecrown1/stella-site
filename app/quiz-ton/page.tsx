import type { Metadata } from 'next';
import QuizAppTon from '@/components/QuizAppTon';

export const metadata: Metadata = {
  title: 'Осветление тёмных зон — твой план за 1 минуту | STELLA',
  description:
    'Потемнения на подмышках, бикини, коленях или локтях — решаемая задача. Пройди короткий квиз и получи персональный план лазерного осветления с ценой первого визита по акции.',
  alternates: { canonical: 'https://laserstella.com/quiz-ton' },
  robots: { index: true, follow: true }
};

export default function QuizTonPage() {
  return <QuizAppTon />;
}
