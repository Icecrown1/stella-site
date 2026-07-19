import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PromoStrip from '@/components/PromoStrip';
import Guarantee from '@/components/Guarantee';
import Results from '@/components/Results';
import Pricing from '@/components/Pricing';
import Masters from '@/components/Masters';
import Reviews from '@/components/Reviews';
import FAQ from '@/components/FAQ';
import BookingForm from '@/components/BookingForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <PromoStrip />
      <Guarantee />
      <Results />
      <Pricing />
      <Masters />
      <Reviews />
      <FAQ />
      <BookingForm />
      <Footer />
    </main>
  );
}
