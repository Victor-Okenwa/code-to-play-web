import { NextResponse } from "next/server";

import { type CatalogJob, runCatalogJob } from "@/lib/extension-catalog";
import { authorizeOpsRequest } from "@/lib/ops-auth";

function isCatalogJob(value: string): value is CatalogJob {
  return value === "stats" || value === "changelog";
}

export async function POST(request: Request) {
  if (!authorizeOpsRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jobParam = new URL(request.url).searchParams.get("job") ?? "stats";
  if (!isCatalogJob(jobParam)) {
    return NextResponse.json({ error: "Unknown job" }, { status: 400 });
  }

  const result = await runCatalogJob(jobParam, true);
  return NextResponse.json(result);
}
