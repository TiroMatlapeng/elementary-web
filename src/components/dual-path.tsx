"use client";

import Link from "next/link";
import { SectionReveal } from "@/components/section-reveal";
import { DicksonLogo } from "@/components/dickson-logo";

function CodeBracketsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 10L4 20l10 10" />
      <path d="M26 10l10 10-10 10" />
    </svg>
  );
}

interface PathCardProps {
  href: string;
  label: string;
  title: string;
  description: string;
  linkText: string;
  icon: React.ReactNode;
  delay: number;
}

function PathCard({
  href,
  label,
  title,
  description,
  linkText,
  icon,
  delay,
}: PathCardProps) {
  return (
    <SectionReveal delay={delay}>
      <Link
        href={href}
        className="group block rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-accent-glow)] hover:shadow-[0_8px_40px_var(--color-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-base)]"
      >
        {/* Icon container */}
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-elevated)] text-[var(--color-text-secondary)] transition-colors duration-300 group-hover:bg-[var(--color-accent-dim)] group-hover:text-[var(--color-accent)]">
          {icon}
        </div>

        {/* Label */}
        <p className="mb-2 font-body text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          {label}
        </p>

        {/* Title */}
        <h3 className="mb-3 font-display text-3xl font-bold text-[var(--color-text-primary)]">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-6 font-body text-base leading-relaxed text-[var(--color-text-secondary)]">
          {description}
        </p>

        {/* Link */}
        <span className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-[var(--color-accent)] transition-gap duration-200 group-hover:gap-2.5">
          {linkText}
        </span>
      </Link>
    </SectionReveal>
  );
}

export function DualPath() {
  return (
    <section id="products" className="py-10 pb-24">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        {/* Section header */}
        <SectionReveal delay={0}>
          <div className="mb-12">
            <p className="mb-2 font-body text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              What we do
            </p>
            <h2 className="font-display text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Two sides of Elementary
            </h2>
            <p className="mt-3 font-body text-lg text-[var(--color-text-secondary)]">
              We build products. We build for you.
            </p>
          </div>
        </SectionReveal>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <PathCard
            href="/dickson"
            label="Our product"
            title="Dickson"
            description="A vetted handyman marketplace built for South Africa — connecting homeowners with skilled, trusted tradespeople. Every professional is background-checked and rated."
            linkText="Learn more →"
            icon={
              <DicksonLogo className="h-10 w-10" />
            }
            delay={1}
          />

          <PathCard
            href="/#services"
            label="Our services"
            title="Engineering for enterprise"
            description="Custom software engineering, legacy system modernisation, cloud migration, and data solutions — purpose-built for insurance, construction, and banking clients."
            linkText="Explore services →"
            icon={
              <CodeBracketsIcon className="h-10 w-10" />
            }
            delay={2}
          />
        </div>
      </div>
    </section>
  );
}
