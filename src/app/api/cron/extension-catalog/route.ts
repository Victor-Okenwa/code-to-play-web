import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

import { type CatalogJob, runCatalogJob } from "@/lib/extension-catalog";

function isCatalogJob(value: string): value is CatalogJob {
  return value === "stats" || value === "changelog";
}

function authorizeCron(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return false;
  }

  const header = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  const left = Buffer.from(header);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  if (!authorizeCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jobParam = new URL(request.url).searchParams.get("job") ?? "stats";
  if (!isCatalogJob(jobParam)) {
    return NextResponse.json({ error: "Unknown job" }, { status: 400 });
  }

  const result = await runCatalogJob(jobParam, true);
  return NextResponse.json(result);
}
