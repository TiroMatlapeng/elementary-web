/**
 * Maps the Elementary `/modiri` waitlist form payload to the Modiri backend
 * `WaitlistRegistrationRequest` shape.
 *
 * Single source of truth for the wire shape is the canonical fixture:
 *   modiri/contracts/fixtures/rest/waitlist_registration_request.json
 * mirrored for tests at: src/test/fixtures/waitlist_registration_request.json
 *
 * Contract: modiri/docs/contracts/rest-api.md → "Waitlist".
 */

/** The role values the Elementary form can submit (waitlist-form.tsx). */
export type ElementaryRole = "homeowner" | "tradesperson" | "business";

/** The canonical Modiri waitlist track enum (only the three a website can send). */
export type WaitlistTrack = "HOMEOWNER" | "ARTISAN" | "COMPANY";

/** Raw, untrusted body shape posted by the form. All fields optional/unknown. */
export interface ElementaryWaitlistBody {
  firstName?: unknown;
  lastName?: unknown;
  mobile?: unknown;
  email?: unknown;
  city?: unknown;
  role?: unknown;
}

/** The body sent on the wire to POST /api/v1/waitlist. Matches the fixture exactly. */
export interface WaitlistRegistrationRequest {
  name: string;
  email: string;
  mobile: string | null;
  city: string | null;
  track: WaitlistTrack;
}

/** Thrown when the form payload cannot be mapped to a valid Modiri request. */
export class WaitlistMappingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WaitlistMappingError";
  }
}

const ROLE_TO_TRACK: Readonly<Record<ElementaryRole, WaitlistTrack>> = {
  homeowner: "HOMEOWNER",
  tradesperson: "ARTISAN",
  business: "COMPANY",
};

const SENTINEL_OTHER_CITY = "Other";

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Pure mapping function — no I/O. Throws {@link WaitlistMappingError} on a
 * missing required field or an unknown role so the route can return 400.
 */
export function mapWaitlistRequest(
  body: ElementaryWaitlistBody
): WaitlistRegistrationRequest {
  const firstName = asTrimmedString(body.firstName);
  const lastName = asTrimmedString(body.lastName);
  const email = asTrimmedString(body.email);
  const rawCity = asTrimmedString(body.city);
  const rawMobile = asTrimmedString(body.mobile);
  const role = asTrimmedString(body.role);

  const name = [firstName, lastName].filter(Boolean).join(" ");
  if (!name) {
    throw new WaitlistMappingError("First or last name is required");
  }
  if (!email) {
    throw new WaitlistMappingError("Email is required");
  }
  if (!role) {
    throw new WaitlistMappingError("Role is required");
  }

  const track = ROLE_TO_TRACK[role as ElementaryRole];
  if (!track) {
    throw new WaitlistMappingError(`Unknown role: ${role}`);
  }

  const mobile = rawMobile || null;
  const city = !rawCity || rawCity === SENTINEL_OTHER_CITY ? null : rawCity;

  return { name, email, mobile, city, track };
}
