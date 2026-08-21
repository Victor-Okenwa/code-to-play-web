import { NextResponse } from "next/server";
import {
  getUserEntitlements,
  playSpaceCooldownRemainingMs,
} from "@/lib/entitlements";
import {
  getPolar,
  isPolarConfigured,
  POLAR_NOT_CONFIGURED_MESSAGE,
  polarErrorMessage,
  polarProductIds,
} from "@/lib/polar";
import {
  PLAY_SPACE_COOLDOWN_HOURS,
  PLAY_SPACE_MAX,
  PLAY_SPACE_MIN,
  PLAY_SPACE_PRICE,
} from "@/lib/pricing";
import { getRequestSession } from "@/lib/session";

function parseQuantity(value: unknown) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(n) || n < PLAY_SPACE_MIN || n > PLAY_SPACE_MAX) {
    return null;
  }
  return n;
}

export async function POST(request: Request) {
  const session = await getRequestSession(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isPolarConfigured()) {
    return NextResponse.json(
      { error: POLAR_NOT_CONFIGURED_MESSAGE },
      { status: 503 },
    );
  }

  const playSpaceId = polarProductIds().playSpace;
  if (!playSpaceId) {
    return NextResponse.json(
      { error: "Play space product is not configured" },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const quantity = parseQuantity(
    typeof body === "object" && body !== null && "quantity" in body
      ? body.quantity
      : undefined,
  );
  if (quantity === null) {
    return NextResponse.json(
      {
        error: `Buy ${PLAY_SPACE_MIN} to ${PLAY_SPACE_MAX} play spaces at a time.`,
      },
      { status: 400 },
    );
  }

  const entitlements = await getUserEntitlements(session.user.id);
  const remainingMs = playSpaceCooldownRemainingMs(
    entitlements?.lastPlaySpacePurchasedAt ?? null,
  );
  if (remainingMs > 0) {
    const hours = Math.ceil(remainingMs / (60 * 60 * 1000));
    const minutes = Math.max(1, Math.ceil(remainingMs / (60 * 1000)));
    const remaining =
      remainingMs < 60 * 60 * 1000
        ? `${minutes} more minute${minutes === 1 ? "" : "s"}`
        : `${hours} more hour${hours === 1 ? "" : "s"}`;
    return NextResponse.json(
      {
        error: `Play space purchases are locked for about ${remaining} (${PLAY_SPACE_COOLDOWN_HOURS}-hour cooldown).`,
        playSpaceCooldownEndsAt: new Date(
          Date.now() + remainingMs,
        ).toISOString(),
      },
      { status: 429 },
    );
  }

  const origin = new URL(request.url).origin;

  try {
    const checkout = await getPolar().checkouts.create({
      externalCustomerId: session.user.id,
      products: [playSpaceId],
      successUrl: `${origin}/dashboard/subscription?checkout=success`,
      returnUrl: `${origin}/dashboard/subscription`,
      metadata: { playSpaces: quantity },
      prices: {
        [playSpaceId]: [
          {
            amountType: "fixed",
            priceAmount: Math.round(quantity * PLAY_SPACE_PRICE * 100),
          },
        ],
      },
    });

    if (!checkout.url) {
      return NextResponse.json(
        { error: "Polar did not return a checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: checkout.url });
  } catch (error) {
    return NextResponse.json(
      {
        error: polarErrorMessage(error, "Play space checkout could not start."),
      },
      { status: 502 },
    );
  }
}
