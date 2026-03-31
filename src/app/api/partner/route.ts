import { NextResponse } from "next/server";
import { addPartnerEnquiry } from "@/lib/submissions";

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, email, company, role, industry, message } = body;

  if (!fullName || !email || !company || !industry) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  try {
    await addPartnerEnquiry({ fullName, email, company, role, industry, message });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Partner enquiry error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
