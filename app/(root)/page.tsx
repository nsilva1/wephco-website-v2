import { Hero } from '@/components/Hero';
import { FeaturedProperties } from '@/components/FeaturedProperties';
import { VisionAndMission } from '@/components/VisionAndMission';
import { Partners } from '@/components/Partners';
import { FAQ } from '@/components/FAQ';
import { ContactUs } from '@/components/ContactUs';

export default function Home() {
  return (
    <div className="bg-background-dark text-white font-display overflow-hidden">
      <Hero />
      <VisionAndMission />
      <FeaturedProperties numberOfProperties={3} viewMore={true} />
      <Partners />
      <FAQ />
      <ContactUs />
    </div>
  );
}
