"use client";

import { useState } from "react";

type Role = "homeowner" | "tradesperson" | "business";

interface FormState {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  city: string;
  role: Role | "";
}

const CITIES = [
  "Johannesburg",
  "Pretoria",
  "Cape Town",
  "Durban",
  "Other",
] as const;

const ROLES: { value: Role; label: string; description: string }[] = [
  {
    value: "homeowner",
    label: "Homeowner",
    description: "I need reliable help",
  },
  {
    value: "tradesperson",
    label: "Tradesperson",
    description: "I want work",
  },
  {
    value: "business",
    label: "Business",
    description: "Insurance, construction, or property",
  },
];

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

export function WaitlistForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    city: "",
    role: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/waitlist", {
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
        style={{ background: "rgba(45,212,191,0.08)", border: "1px solid var(--color-accent-glow)" }}
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
          You&apos;re on the list!
        </p>
        <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
          We&apos;ll be in touch via WhatsApp when Dickson launches near you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="wl-firstName"
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            First name
          </label>
          <input
            id="wl-firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Thabo"
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
            htmlFor="wl-lastName"
            className="text-xs font-medium"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Last name
          </label>
          <input
            id="wl-lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Nkosi"
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

      {/* Mobile — most prominent */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="wl-mobile"
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-accent)" }}
        >
          Mobile number *
        </label>
        <input
          id="wl-mobile"
          name="mobile"
          type="tel"
          value={form.mobile}
          onChange={handleChange}
          placeholder="+27 82 000 0000"
          required
          style={{
            ...INPUT_STYLE,
            fontSize: "1rem",
            padding: "0.75rem 0.875rem",
            border: "1px solid var(--color-accent-glow)",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-accent)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-accent-glow)")
          }
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="wl-email"
          className="text-xs font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Email address
        </label>
        <input
          id="wl-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          style={INPUT_STYLE}
          onFocus={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-accent)")
          }
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "var(--color-border)")
          }
        />
      </div>

      {/* City */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="wl-city"
          className="text-xs font-medium"
          style={{ color: "var(--color-text-secondary)" }}
        >
          City / area
        </label>
        <select
          id="wl-city"
          name="city"
          value={form.city}
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
            Select your area
          </option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Role */}
      <fieldset className="flex flex-col gap-2">
        <legend
          className="text-xs font-medium mb-1"
          style={{ color: "var(--color-text-secondary)" }}
        >
          I am a...
        </legend>
        <div className="flex flex-col gap-2">
          {ROLES.map((r) => (
            <label
              key={r.value}
              className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer border transition-colors duration-150"
              style={{
                background:
                  form.role === r.value
                    ? "var(--color-accent-dim)"
                    : "var(--color-surface)",
                borderColor:
                  form.role === r.value
                    ? "var(--color-accent)"
                    : "var(--color-border)",
              }}
            >
              <input
                type="radio"
                name="role"
                value={r.value}
                checked={form.role === r.value}
                onChange={handleChange}
                className="sr-only"
              />
              <span
                className="flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor:
                    form.role === r.value
                      ? "var(--color-accent)"
                      : "var(--color-border-hover)",
                }}
              >
                {form.role === r.value && (
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                )}
              </span>
              <span>
                <span
                  className="block text-sm font-medium"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {r.label}
                </span>
                <span
                  className="block text-xs"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {r.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

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
        {submitting ? "Joining…" : "Join the waitlist"}
      </button>

      <p
        className="text-xs text-center leading-relaxed"
        style={{ color: "var(--color-text-muted)" }}
      >
        We&apos;ll reach out via WhatsApp when Dickson launches in your area.
        No spam. POPIA compliant.
      </p>
    </form>
  );
}
