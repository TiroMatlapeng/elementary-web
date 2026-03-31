import { NextResponse } from "next/server";
import { addWaitlistEntry } from "@/lib/submissions";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, mobile, email, city, role } = body;

  if (!firstName || !lastName || !mobile || !email || !city || !role) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    await addWaitlistEntry({ firstName, lastName, mobile, email, city, role });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
