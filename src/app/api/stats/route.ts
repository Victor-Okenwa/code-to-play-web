import { NextResponse } from "next/server";
import {
  getAnalyticsOptIn,
  getUserStats,
  upsertUserStats,
} from "@/lib/analytics";
import { getRequestSession } from "@/lib/session";
import { parseStatsSnapshot } from "@/lib/stats";

export async function GET(request: Request) {
  const session = await getRequestSession(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const optedIn = await getAnalyticsOptIn(session.user.id);
  if (!optedIn) {
    return NextResponse.json({ optedIn: false });
  }

  const stats = await getUserStats(session.user.id);
  return NextResponse.json({
    optedIn: true,
    snapshot: stats?.snapshot ?? null,
    syncedAt: stats?.syncedAt.toISOString() ?? null,
  });
}

export async function PUT(request: Request) {
  const session = await getRequestSession(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const optedIn = await getAnalyticsOptIn(session.user.id);
  if (!optedIn) {
    return NextResponse.json(
      { error: "Analytics opt-in is off" },
      { status: 403 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const snapshot = parseStatsSnapshot(body);
  if (!snapshot) {
    return NextResponse.json({ error: "Invalid snapshot" }, { status: 400 });
  }

  const syncedAt = await upsertUserStats(session.user.id, snapshot);
  return NextResponse.json({
    optedIn: true,
    syncedAt: syncedAt.toISOString(),
  });
}
