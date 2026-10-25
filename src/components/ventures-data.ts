export type VentureTier = "live" | "dev";

export interface Venture {
  name: string;
  description?: string;
  tier: VentureTier;
}

// Names only for anything unreleased: no description on a "dev" venture.
export const VENTURES: Venture[] = [
  {
    name: "Modiri",
    description: "Vetted handyman marketplace — SAPS-checked, referenced, insured.",
    tier: "live",
  },
  { name: "LeungoERP", tier: "dev" },
  { name: "Moreki", tier: "dev" },
  { name: "Caring", tier: "dev" },
];
