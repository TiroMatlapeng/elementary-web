import { NextResponse } from "next/server";
import { appendSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, mobile, email, city, role } = body;

  if (!firstName || !lastName || !mobile || !email || !city || !role) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  await appendSubmission("waitlist.json", {
    firstName, lastName, mobile, email, city, role,
  });

  return NextResponse.json({ success: true });
}
