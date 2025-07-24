import Hero from '@/components/Hero';
import SearchSection from '@/components/SearchSection';
import FeaturedGuides from '@/components/FeaturedGuides';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <SearchSection />
      <FeaturedGuides />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
