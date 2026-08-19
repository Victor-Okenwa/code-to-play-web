import { NextResponse } from "next/server";
import { getUserEntitlements, toEntitlementsPayload } from "@/lib/entitlements";
import { getRequestSession } from "@/lib/session";

export async function GET(request: Request) {
  const session = await getRequestSession(request);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const row = await getUserEntitlements(session.user.id);
  return NextResponse.json(toEntitlementsPayload(row));
}
