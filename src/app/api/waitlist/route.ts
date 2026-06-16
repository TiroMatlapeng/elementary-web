import { NextResponse } from "next/server";
import {
  mapWaitlistRequest,
  WaitlistMappingError,
} from "@/lib/waitlist-mapping";

// Must run on Node (not Edge): server-side fetch to the Modiri backend, reads
// a server-only env var. Never a NEXT_PUBLIC_* — the URL stays off the client.
export const runtime = "nodejs";

const DEFAULT_MODIRI_API_URL = "https://api.modiri.co.za";

/** Shape of the Modiri response envelope: { data, message, status, timestamp }. */
interface ModiriEnvelope {
  status?: string;
  message?: string;
}

export async function POST(request: Request) {
  // 1. Parse the body defensively — a malformed JSON body must be a 400, not a throw.
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  // 2. Map the form payload → Modiri WaitlistRegistrationRequest.
  let payload;
  try {
    payload = mapWaitlistRequest(rawBody as Record<string, unknown>);
  } catch (error) {
    if (error instanceof WaitlistMappingError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }

  // 3. Forward server-side to the Modiri waitlist API (no CORS — server-to-server).
  const baseUrl = process.env.MODIRI_API_URL ?? DEFAULT_MODIRI_API_URL;
  const endpoint = `${baseUrl}/api/v1/waitlist`;

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    // Network failure reaching Modiri — surface as an upstream error, log server-side.
    console.error("Waitlist forward — network error reaching Modiri:", error);
    return NextResponse.json(
      { error: "Could not reach the waitlist service. Please try again." },
      { status: 502 }
    );
  }

  // 4. Validate the envelope. Treat non-2xx OR status !== "success" as failure.
  let envelope: ModiriEnvelope | null = null;
  try {
    envelope = (await res.json()) as ModiriEnvelope;
  } catch {
    envelope = null;
  }

  if (!res.ok || envelope?.status !== "success") {
    console.error(
      "Waitlist forward — Modiri rejected the registration:",
      res.status,
      envelope?.status,
      envelope?.message
    );
    return NextResponse.json(
      { error: "We could not add you to the waitlist. Please try again." },
      { status: 502 }
    );
  }

  // 5. Success — no Elementary DB write; Modiri is the single source of truth.
  return NextResponse.json({ success: true });
}
