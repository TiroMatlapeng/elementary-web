import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/services-grid";
import { ManifestoSection } from "@/components/manifesto-section";
import { DualPath } from "@/components/dual-path";
import { TrustSection } from "@/components/trust-section";
import { TechStack } from "@/components/tech-stack";
import { CTASection } from "@/components/cta-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <ManifestoSection />
      <DualPath />
      <TrustSection />
      <TechStack />
      <CTASection />
    </main>
  );
}
