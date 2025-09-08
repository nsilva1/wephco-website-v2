import { Hero } from "@/components/Hero";
import { Regions } from "@/components/Regions";
import { BackgroundStory } from "@/components/BackgroundStory";
import { NewDevelopmentsSection } from "@/components/NewDevelopments";
import { BecomeAgent } from "@/components/BecomeAgent";
import { Partners } from "@/components/Partners";
import { Press } from "@/components/Press";
import { ContactUs } from "@/components/ContactUs";
import { Footer } from "@/components/Footer";
import { VisionAndMission } from "@/components/VisionAndMission";
import { FAQ } from "@/components/FAQ";
import { NewsletterSignup } from "@/components/Newsletter";

export default function Home() {
  return (
    <div>
      <Hero />
      <VisionAndMission />
      <BackgroundStory />
      <NewDevelopmentsSection />
      <BecomeAgent />
      <Partners />
      <Press />
      <NewsletterSignup />
      <ContactUs />
      <FAQ />
      <Footer />
    </div>
  );
}
