import type { CustomerState } from "@polar-sh/sdk/models/components/customerstate.js";
import type { Order } from "@polar-sh/sdk/models/components/order.js";
import type { Subscription } from "@polar-sh/sdk/models/components/subscription.js";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { userEntitlements } from "@/db/schema";
import { isPlaySpaceProduct, isProProduct } from "@/lib/polar";
import {
  PLAY_SPACE_COOLDOWN_HOURS,
  PRO_EXTRA_PLAY_SPACES,
} from "@/lib/pricing";

export const PRO_GAME_IDS = ["call-stack", "merge-conflict"] as const;

export type UserEntitlements = {
  userId: string;
  isPro: boolean;
  polarSubscriptionId: string | null;
  proExpiresAt: Date | null;
  purchasedPlaySpaces: number;
  lastPlaySpacePurchasedAt: Date | null;
  updatedAt: Date;
};

export type EntitlementsPayload = {
  isPro: boolean;
  extraPlaySpaces: 0 | 2;
  purchasedPlaySpaces: number;
  playSpaceCooldownEndsAt: string | null;
  proGames: typeof PRO_GAME_IDS;
};

const EMPTY_ENTITLEMENTS: Omit<UserEntitlements, "userId" | "updatedAt"> = {
  isPro: false,
  polarSubscriptionId: null,
  proExpiresAt: null,
  purchasedPlaySpaces: 0,
  lastPlaySpacePurchasedAt: null,
};

function cooldownMs() {
  return PLAY_SPACE_COOLDOWN_HOURS * 60 * 60 * 1000;
}

export function playSpaceCooldownEndsAt(
  lastPurchase: Date | null,
): Date | null {
  if (!lastPurchase) {
    return null;
  }
  return new Date(lastPurchase.getTime() + cooldownMs());
}

export function playSpaceCooldownRemainingMs(lastPurchase: Date | null) {
  const endsAt = playSpaceCooldownEndsAt(lastPurchase);
  if (!endsAt) {
    return 0;
  }
  return Math.max(0, endsAt.getTime() - Date.now());
}

export function toEntitlementsPayload(
  row: UserEntitlements | null,
): EntitlementsPayload {
  const isPro = row?.isPro ?? false;
  const cooldownEnds = playSpaceCooldownEndsAt(
    row?.lastPlaySpacePurchasedAt ?? null,
  );

  return {
    isPro,
    extraPlaySpaces: isPro ? PRO_EXTRA_PLAY_SPACES : 0,
    purchasedPlaySpaces: row?.purchasedPlaySpaces ?? 0,
    playSpaceCooldownEndsAt: cooldownEnds?.toISOString() ?? null,
    proGames: PRO_GAME_IDS,
  };
}

function mapRow(row: typeof userEntitlements.$inferSelect): UserEntitlements {
  return {
    userId: row.userId,
    isPro: row.isPro,
    polarSubscriptionId: row.polarSubscriptionId,
    proExpiresAt: row.proExpiresAt,
    purchasedPlaySpaces: row.purchasedPlaySpaces,
    lastPlaySpacePurchasedAt: row.lastPlaySpacePurchasedAt,
    updatedAt: row.updatedAt,
  };
}

export async function getUserEntitlements(
  userId: string,
): Promise<UserEntitlements | null> {
  const db = await getDb();
  const [row] = await db
    .select()
    .from(userEntitlements)
    .where(eq(userEntitlements.userId, userId))
    .limit(1);

  return row ? mapRow(row) : null;
}

async function upsertEntitlements(
  userId: string,
  updates: Partial<Omit<UserEntitlements, "userId" | "updatedAt">>,
) {
  const db = await getDb();
  const now = new Date();
  const current = await getUserEntitlements(userId);
  const next = {
    ...EMPTY_ENTITLEMENTS,
    ...current,
    ...updates,
  };

  await db
    .insert(userEntitlements)
    .values({
      userId,
      isPro: next.isPro,
      polarSubscriptionId: next.polarSubscriptionId,
      proExpiresAt: next.proExpiresAt,
      purchasedPlaySpaces: next.purchasedPlaySpaces,
      lastPlaySpacePurchasedAt: next.lastPlaySpacePurchasedAt,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: userEntitlements.userId,
      set: {
        isPro: next.isPro,
        polarSubscriptionId: next.polarSubscriptionId,
        proExpiresAt: next.proExpiresAt,
        purchasedPlaySpaces: next.purchasedPlaySpaces,
        lastPlaySpacePurchasedAt: next.lastPlaySpacePurchasedAt,
        updatedAt: now,
      },
    });
}

function userIdFromCustomer(
  customer:
    | {
        externalId?: string | null;
      }
    | null
    | undefined,
) {
  return customer?.externalId ?? null;
}

function playSpacesFromOrder(order: Order) {
  const fromMeta = order.metadata.playSpaces;
  if (typeof fromMeta === "number" && fromMeta > 0) {
    return Math.floor(fromMeta);
  }
  if (typeof fromMeta === "string") {
    const parsed = Number.parseInt(fromMeta, 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }

  if (isPlaySpaceProduct(order.productId) && order.totalAmount > 0) {
    return Math.max(1, Math.round(order.totalAmount / 100));
  }

  return 1;
}

export async function applyPaidOrder(order: Order) {
  const userId = userIdFromCustomer(order.customer);
  if (!userId) {
    return;
  }

  if (isPlaySpaceProduct(order.productId)) {
    const current = await getUserEntitlements(userId);
    const quantity = playSpacesFromOrder(order);
    await upsertEntitlements(userId, {
      purchasedPlaySpaces: (current?.purchasedPlaySpaces ?? 0) + quantity,
      lastPlaySpacePurchasedAt: new Date(),
    });
    return;
  }

  if (isProProduct(order.productId) || order.subscriptionId) {
    await upsertEntitlements(userId, {
      isPro: true,
      polarSubscriptionId: order.subscriptionId,
      proExpiresAt: null,
    });
  }
}

export async function applySubscription(
  subscription: Subscription,
  isPro: boolean,
) {
  const userId = userIdFromCustomer(subscription.customer);
  if (!userId) {
    return;
  }

  await upsertEntitlements(userId, {
    isPro,
    polarSubscriptionId: isPro ? subscription.id : null,
    proExpiresAt: isPro
      ? (subscription.currentPeriodEnd ?? subscription.endsAt)
      : null,
  });
}

export async function applyCustomerState(state: CustomerState) {
  const userId = state.externalId;
  if (!userId) {
    return;
  }

  const active = state.activeSubscriptions ?? [];
  const granted = state.grantedBenefits ?? [];
  const isPro = active.length > 0 || granted.length > 0;
  const first = active[0];

  await upsertEntitlements(userId, {
    isPro,
    polarSubscriptionId: first?.id ?? null,
    proExpiresAt: first?.currentPeriodEnd ?? null,
  });
}
