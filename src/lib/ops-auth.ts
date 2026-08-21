import { timingSafeEqual } from "node:crypto";

/**
 * Shared gate for operational endpoints (cron jobs, config diagnostics).
 * Requires `Authorization: Bearer <CRON_SECRET>`.
 */
export function authorizeOpsRequest(request: Request): boolean {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    return false;
  }

  const header = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  const left = Buffer.from(header);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}
