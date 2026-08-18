import { eq } from "drizzle-orm";
import { db } from "@/db";
import { userAnalytics, userStats } from "@/db/schema";
import {
  parseStoredSnapshot,
  type StatsSnapshot,
  type StoredUserStats,
} from "@/lib/stats";

export async function getAnalyticsOptIn(userId: string): Promise<boolean> {
  const [row] = await db
    .select()
    .from(userAnalytics)
    .where(eq(userAnalytics.userId, userId))
    .limit(1);

  return row?.optedIn ?? false;
}

export async function setAnalyticsOptIn(
  userId: string,
  optedIn: boolean,
): Promise<void> {
  const now = new Date();

  await db
    .insert(userAnalytics)
    .values({
      userId,
      optedIn,
      optedInAt: optedIn ? now : null,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: userAnalytics.userId,
      set: {
        optedIn,
        optedInAt: optedIn ? now : null,
        updatedAt: now,
      },
    });

  if (!optedIn) {
    await db.delete(userStats).where(eq(userStats.userId, userId));
  }
}

export async function getUserStats(
  userId: string,
): Promise<StoredUserStats | null> {
  const [row] = await db
    .select()
    .from(userStats)
    .where(eq(userStats.userId, userId))
    .limit(1);

  if (!row) {
    return null;
  }

  const snapshot = parseStoredSnapshot(row.snapshot);
  if (!snapshot) {
    return null;
  }

  return {
    snapshot,
    syncedAt: row.syncedAt,
  };
}

export async function upsertUserStats(
  userId: string,
  snapshot: StatsSnapshot,
): Promise<Date> {
  const syncedAt = new Date();

  await db
    .insert(userStats)
    .values({
      userId,
      snapshot: JSON.stringify(snapshot),
      syncedAt,
    })
    .onConflictDoUpdate({
      target: userStats.userId,
      set: {
        snapshot: JSON.stringify(snapshot),
        syncedAt,
      },
    });

  return syncedAt;
}
