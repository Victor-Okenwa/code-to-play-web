import { NextResponse } from "next/server";

import { authorizeOpsRequest } from "@/lib/ops-auth";
import { polarAccessToken, polarProductIds, polarServer } from "@/lib/polar";

export const dynamic = "force-dynamic";

const POLAR_API = {
  production: "https://api.polar.sh",
  sandbox: "https://sandbox-api.polar.sh",
} as const;

/** Reports the shape of a secret without revealing it. */
function describe(name: string) {
  const raw = process.env[name];
  const trimmed = raw?.trim() ?? "";
  return {
    present: trimmed.length > 0,
    length: trimmed.length,
    needsTrim: raw !== undefined && raw !== trimmed,
  };
}

async function probe(baseUrl: string, token: string) {
  try {
    const response = await fetch(`${baseUrl}/v1/products/?limit=1`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { status: response.status, ok: response.ok };
  } catch (error) {
    return {
      status: 0,
      ok: false,
      error: error instanceof Error ? error.message : "fetch failed",
    };
  }
}

async function probeProducts(baseUrl: string, token: string) {
  const entries = Object.entries(polarProductIds());
  const results = await Promise.all(
    entries.map(async ([key, id]) => {
      if (!id) {
        return [key, { id: null, status: null }] as const;
      }
      const response = await fetch(`${baseUrl}/v1/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return [key, { id, status: response.status }] as const;
    }),
  );
  return Object.fromEntries(results);
}

export async function GET(request: Request) {
  if (!authorizeOpsRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = polarAccessToken();
  const server = polarServer();

  const secrets = {
    POLAR_SERVER: describe("POLAR_SERVER"),
    POLAR_ACCESS_TOKEN: describe("POLAR_ACCESS_TOKEN"),
    POLAR_WEBHOOK_SECRET: describe("POLAR_WEBHOOK_SECRET"),
    POLAR_PRODUCT_PRO_MONTHLY: describe("POLAR_PRODUCT_PRO_MONTHLY"),
    POLAR_PRODUCT_PRO_YEARLY: describe("POLAR_PRODUCT_PRO_YEARLY"),
    POLAR_PRODUCT_PER_SPACE: describe("POLAR_PRODUCT_PER_SPACE"),
    BETTER_AUTH_URL: describe("BETTER_AUTH_URL"),
    BETTER_AUTH_SECRET: describe("BETTER_AUTH_SECRET"),
    CRON_SECRET: describe("CRON_SECRET"),
  };

  if (!token) {
    return NextResponse.json({
      serverInUse: server,
      tokenBelongsTo: "no token",
      secrets,
    });
  }

  const [production, sandbox] = await Promise.all([
    probe(POLAR_API.production, token),
    probe(POLAR_API.sandbox, token),
  ]);

  const tokenBelongsTo = production.ok
    ? "production"
    : sandbox.ok
      ? "sandbox"
      : "neither";

  return NextResponse.json({
    serverInUse: server,
    tokenBelongsTo,
    mismatch: tokenBelongsTo !== "neither" && tokenBelongsTo !== server,
    probe: { production, sandbox },
    products:
      tokenBelongsTo === "neither"
        ? null
        : await probeProducts(POLAR_API[tokenBelongsTo], token),
    secrets,
  });
}
