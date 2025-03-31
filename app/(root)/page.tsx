import { Hero } from "@/components/Hero";
import { Regions } from "@/components/Regions";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { NewDevelopmentsSection } from "@/components/NewDevelopments";

export default function Home() {
  return (
    <div>
      <Hero />
      <Regions />
      <FeaturedProperties />
      <NewDevelopmentsSection />
    </div>
  );
}
