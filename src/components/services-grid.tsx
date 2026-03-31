"use client";

import { SectionReveal } from "./section-reveal";

const services = [
  {
    title: "Software Engineering",
    description:
      "Greenfield and iterative builds using modern cloud-native architectures. APIs, microservices, and data-intensive platforms.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Application Modernisation",
    description:
      "Lift legacy systems into maintainable, scalable modern stacks — without losing business continuity or institutional knowledge.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <line x1="14" y1="17.5" x2="21" y2="17.5" />
        <line x1="17.5" y1="14" x2="17.5" y2="21" />
      </svg>
    ),
  },
  {
    title: "Cloud Migration & Readiness",
    description:
      "Strategy, architecture, and execution for moving on-premise workloads to AWS, Azure, GCP, or Hetzner — securely and at pace.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        <polyline points="12 12 12 20" />
        <polyline points="9 17 12 20 15 17" />
      </svg>
    ),
  },
  {
    title: "Data Warehousing & Data Lakes",
    description:
      "End-to-end data warehouse and data lake design, build, and optimisation. From raw ingestion to star schemas — tool-agnostic and platform-independent.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: "Data Management & Governance",
    description:
      "Data quality, lineage, cataloguing, and governance frameworks. We help you trust your data and meet regulatory obligations including POPIA.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Business Intelligence & Analytics",
    description:
      "Dashboards and reporting with Tableau, Power BI, QlikView, and Qlik Sense. We work with every major BI tool — your data, your choice.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    title: "ETL & Data Integration",
    description:
      "Extract, transform, load pipelines using Informatica, Talend, SSIS, dbt, Airflow, and custom solutions. All major databases supported.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    title: "Data Virtualisation",
    description:
      "Unified data access without moving data — using traditional tools and AI-powered MCP integrations. Query across sources as one, in real time.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
      </svg>
    ),
  },
];

export function ServicesGrid() {
  return (
    <section id="services" style={{ background: "var(--color-light)" }}>
      <div
        className="mx-auto px-6 py-24"
        style={{ maxWidth: "var(--width-content)" }}
      >
        {/* Header */}
        <SectionReveal delay={0}>
          <div className="text-center mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--color-text-dark-2)" }}
            >
              Capabilities
            </p>
            <h2
              className="font-display font-bold leading-tight tracking-tight mb-4"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                color: "var(--color-text-dark)",
              }}
            >
              What we build &amp; how we think
            </h2>
            <p
              className="max-w-xl mx-auto text-base leading-relaxed"
              style={{ color: "var(--color-text-dark-2)" }}
            >
              From concept to production — we cover the full engineering
              lifecycle: architecture, build, integration, and ongoing data
              intelligence.
            </p>
          </div>
        </SectionReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <SectionReveal key={service.title} delay={index + 1}>
              <div
                className="service-card h-full rounded-lg p-8 border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: "#e4e4e8" }}
              >
                {/* Icon */}
                <div
                  className="mb-5 w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-300"
                  style={{
                    background: "var(--color-accent-dim)",
                    color: "var(--color-accent)",
                  }}
                >
                  {service.icon}
                </div>

                {/* Title */}
                <h3
                  className="font-display font-semibold text-base leading-snug mb-3"
                  style={{ color: "var(--color-text-dark)" }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-dark-2)" }}
                >
                  {service.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
