import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0a0a0b",
        surface: "#141418",
        elevated: "#1c1c22",
        light: "#f5f5f7",
        "light-2": "#eaeaec",
        accent: "#2dd4bf",
        "accent-light": "#5ee7d4",
        "accent-dim": "rgba(45, 212, 191, 0.10)",
        "accent-glow": "rgba(45, 212, 191, 0.22)",
        "text-primary": "#f0f0f4",
        "text-secondary": "#9898a8",
        "text-muted": "#5c5c70",
        "text-dark": "#111114",
        "text-dark-2": "#3a3a4a",
        border: "rgba(255,255,255,0.06)",
        "border-hover": "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "20px",
        xl: "28px",
      },
      maxWidth: {
        content: "1160px",
      },
    },
  },
  plugins: [],
};

export default config;
