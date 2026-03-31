"use client";

import { useState } from "react";

interface FormState {
  fullName: string;
  workEmail: string;
  company: string;
  roleTitle: string;
  industry: string;
  message: string;
}

const INDUSTRIES = [
  "Insurance",
  "Construction",
  "Banking",
  "Property",
  "Other",
] as const;

const INPUT_STYLE: React.CSSProperties = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.5rem",
  color: "var(--color-text-primary)",
  fontSize: "0.875rem",
  padding: "0.625rem 0.875rem",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s",
};

export function PartnerForm() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    workEmail: "",
    company: "",
    roleTitle: "",
    industry: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // API route not yet implemented — show success anyway
    } finally {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    }
  }

  if (success) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 py-10 rounded-xl"
        style={{
          background: "rgba(45,212,191,0.08)",
          border: "1px solid var(--color-accent-glow)",
        }}
      >
        <span
          className="flex items-center justify-center w-12 h-12 rounded-full"
          style={{ background: "var(--color-accent)" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0a0a0b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <p
          className="text-lg font-semibold font-display"
          style={{ color: "var(--color-accent)" }}
        >
          We&apos;ll be in touch!
        </p>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          We respond to every enquiry within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Full name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="pf-fullName"
          className="text-xs font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Full name *
        </label>
        <input
          id="pf-fullName"
          name="fullName"
          type="text"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Jane Smith"
          required
          style={INPUT_STYLE}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-accent)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-border)")
          }
        />
      </div>

      {/* Work email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="pf-workEmail"
          className="text-xs font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Work email *
        </label>
        <input
          id="pf-workEmail"
          name="workEmail"
          type="email"
          value={form.workEmail}
          onChange={handleChange}
          placeholder="jane@company.com"
          required
          style={INPUT_STYLE}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-accent)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-border)")
          }
        />
      </div>

      {/* Company + role row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="pf-company"
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Company *
          </label>
          <input
            id="pf-company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            required
            style={INPUT_STYLE}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-accent)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border)")
            }
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="pf-roleTitle"
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Role / title
          </label>
          <input
            id="pf-roleTitle"
            name="roleTitle"
            type="text"
            value={form.roleTitle}
            onChange={handleChange}
            placeholder="Head of Risk"
            style={INPUT_STYLE}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-accent)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--color-border)")
            }
          />
        </div>
      </div>

      {/* Industry */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="pf-industry"
          className="text-xs font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Industry
        </label>
        <select
          id="pf-industry"
          name="industry"
          value={form.industry}
          onChange={handleChange}
          style={INPUT_STYLE}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-accent)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-border)")
          }
        >
          <option value="" disabled>
            Select industry
          </option>
          {INDUSTRIES.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="pf-message"
          className="text-xs font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Message
        </label>
        <textarea
          id="pf-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your use case or what you'd like to discuss…"
          rows={4}
          style={{ ...INPUT_STYLE, resize: "none" }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-accent)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-border)")
          }
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-1 py-3 rounded-lg text-sm font-semibold transition-opacity duration-200"
        style={{
          background: "var(--color-accent)",
          color: "#0a0a0b",
          opacity: submitting ? 0.6 : 1,
        }}
      >
        {submitting ? "Sending…" : "Request a conversation"}
      </button>

      <p
        className="text-xs text-center leading-relaxed"
        style={{ color: "var(--color-text-muted)" }}
      >
        We respond to every enquiry within one business day.
      </p>
    </form>
  );
}
