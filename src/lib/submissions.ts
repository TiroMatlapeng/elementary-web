import { neon } from "@neondatabase/serverless";

function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  return neon(databaseUrl);
}

export async function addWaitlistEntry(data: {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  city: string;
  role: string;
}) {
  const sql = getDb();
  await sql`
    INSERT INTO waitlist (first_name, last_name, mobile, email, city, role)
    VALUES (${data.firstName}, ${data.lastName}, ${data.mobile}, ${data.email}, ${data.city}, ${data.role})
  `;
}

export async function addPartnerEnquiry(data: {
  fullName: string;
  email: string;
  company: string;
  role?: string;
  industry: string;
  message?: string;
}) {
  const sql = getDb();
  await sql`
    INSERT INTO partner_enquiries (full_name, email, company, role, industry, message)
    VALUES (${data.fullName}, ${data.email}, ${data.company}, ${data.role ?? null}, ${data.industry}, ${data.message ?? null})
  `;
}
