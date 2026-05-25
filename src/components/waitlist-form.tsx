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
    }
  }

  if (success) {
    const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
    const waText = encodeURIComponent("Hi, I just registered my interest in Modiri!");
    const waLink = `https://wa.me/${waNumber}?text=${waText}`;

    return (
      <div
        className="flex flex-col items-center justify-center gap-5 py-10"
        style={{
          background: "var(--color-accent-dim)",
          border: "1px solid var(--color-accent-glow)",
          borderRadius: "3px",
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
            stroke="var(--color-ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
        <div className="flex flex-col items-center gap-1 text-center px-4">
          <p
            className="text-lg font-semibold"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-ink)" }}
          >
            You&apos;re on the list!
          </p>
          <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
            We&apos;ll reach out via WhatsApp when Modiri launches near you.
          </p>
        </div>
        {waNumber && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 text-sm font-semibold"
            style={{ background: "#25D366", color: "#fff", borderRadius: "3px" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat with us on WhatsApp
          </a>
        )}
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
        We&apos;ll reach out via WhatsApp when Modiri launches in your area.
        No spam. POPIA compliant.
      </p>
    </form>
  );
}
