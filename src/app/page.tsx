import { Hero } from "@/components/hero";
import { DualPath } from "@/components/dual-path";
import { ServicesGrid } from "@/components/services-grid";
import { TrustSection } from "@/components/trust-section";
import { TechStack } from "@/components/tech-stack";

export default function Home() {
  return (
    <main>
      <Hero />
      <DualPath />
      <ServicesGrid />
      <TrustSection />
      <TechStack />
    </main>
  );
}
