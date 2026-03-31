import { NextResponse } from "next/server";
import { appendSubmission } from "@/lib/submissions";

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, email, company, role, industry, message } = body;

  if (!fullName || !email || !company || !industry) {
    return NextResponse.json(
      { error: "Required fields missing" },
      { status: 400 }
    );
  }

  await appendSubmission("partners.json", {
    fullName, email, company, role, industry, message,
  });

  return NextResponse.json({ success: true });
}
