import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const STATE_FILE = "/Users/bzarnitz13/projects/money/dashboard_state.json";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const filePath = path.resolve(STATE_FILE);
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Could not read dashboard state" }, { status: 500 });
  }
}
