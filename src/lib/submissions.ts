import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // directory exists
  }
}

export async function appendSubmission(
  file: string,
  data: Record<string, unknown>
) {
  await ensureDir();
  const filePath = path.join(DATA_DIR, file);

  let existing: Record<string, unknown>[] = [];
  try {
    const content = await fs.readFile(filePath, "utf-8");
    existing = JSON.parse(content);
  } catch {
    // file doesn't exist yet
  }

  existing.push({
    ...data,
    submittedAt: new Date().toISOString(),
  });

  await fs.writeFile(filePath, JSON.stringify(existing, null, 2));
}
