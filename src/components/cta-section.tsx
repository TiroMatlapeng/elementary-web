"use client";

import { useState } from "react";
import { SectionReveal } from "@/components/section-reveal";
import { WaitlistForm } from "@/components/waitlist-form";
import { PartnerForm } from "@/components/partner-form";

type ActiveTab = "waitlist" | "partner";

const BENEFITS = [
  {
    text: "Every worker SAPS vetted — zero criminal records, zero exceptions",
  },
  {
    text: "Insured work — not happy, get reimbursed. Real money, not credit",
  },
  {
    text: "Dickson Van — transport for workers who need it, so they actually arrive",
  },
  {
    text: "WhatsApp updates — we'll keep you in the loop, not your spam folder",
  },
] as const;

const TAB_CONFIG: { id: ActiveTab; label: string }[] = [
  { id: "waitlist", label: "Join the Waitlist" },
  { id: "partner", label: "Partner with Dickson" },
];

const FORM_CONTENT: Record<
  ActiveTab,
  { heading: string; subtitle: string }
> = {
  waitlist: {
    heading: "Be first to know.",
    subtitle:
      "Dickson is launching city by city. Drop your details and we'll reach out the moment we're live near you.",
  },
  partner: {
    heading: "Let's talk business.",
    subtitle:
      "Insurance, construction, banking, or property — if your industry touches homes, Dickson belongs in your workflow.",
  },
};

export function CTASection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("waitlist");

  return (
    <section
      id="contact"
      className="py-24 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div
        className="mx-auto px-6 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-start"
        style={{ maxWidth: "var(--width-content)" }}
      >
        {/* Left column — value prop */}
        <SectionReveal delay={0}>
          <div>
            <div
              className="border-t-2 w-12 mb-6"
              style={{ borderColor: "var(--color-accent)" }}
            />
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--color-accent)" }}
            >
              Get in touch
            </p>
            <h2
              className="font-display font-bold leading-tight mb-4"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                color: "var(--color-text-primary)",
              }}
            >
              Get involved early
            </h2>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Dickson is purpose-built for the South African market — vetted
              tradespeople, real accountability, and a platform that works for
              everyone from homeowners to insurers.
            </p>

            <ul className="flex flex-col gap-4">
              {BENEFITS.map((b) => (
                <li key={b.text} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "var(--color-accent-dim)" }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="10 3 5 8.5 2 5.5" />
                    </svg>
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {b.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        {/* Right column — tabbed card */}
        <SectionReveal delay={1}>
          <div
            className="rounded-xl p-8 border"
            style={{
              background: "var(--color-elevated)",
              borderColor: "var(--color-border-hover)",
            }}
          >
            {/* Pill tab toggle */}
            <div
              className="flex p-1 rounded-full border mb-8"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              {TAB_CONFIG.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 py-2 px-4 rounded-full text-xs font-medium transition-all duration-200"
                    style={{
                      background: isActive
                        ? "var(--color-elevated)"
                        : "transparent",
                      color: isActive
                        ? "var(--color-text-primary)"
                        : "var(--color-text-muted)",
                      border: isActive
                        ? "1px solid var(--color-border-hover)"
                        : "1px solid transparent",
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Heading + subtitle */}
            <div className="mb-6">
              <h3
                className="font-display font-bold text-xl mb-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                {FORM_CONTENT[activeTab].heading}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {FORM_CONTENT[activeTab].subtitle}
              </p>
            </div>

            {/* Form */}
            {activeTab === "waitlist" ? <WaitlistForm /> : <PartnerForm />}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
