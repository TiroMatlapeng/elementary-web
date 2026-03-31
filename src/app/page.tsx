import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/services-grid";
import { TrustSection } from "@/components/trust-section";
import { TechStack } from "@/components/tech-stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <TrustSection />
      <TechStack />
    </main>
  );
}
