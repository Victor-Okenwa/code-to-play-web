import { NextResponse } from "next/server";
import {
  getPolar,
  isPolarConfigured,
  POLAR_NOT_CONFIGURED_MESSAGE,
  POLAR_SLUG_PRO_MONTHLY,
  POLAR_SLUG_PRO_YEARLY,
  polarAppOrigin,
  polarErrorMessage,
  polarProductIdForSlug,
} from "@/lib/polar";
import { getRequestSession } from "@/lib/session";

const PRO_SLUGS = new Set([POLAR_SLUG_PRO_MONTHLY, POLAR_SLUG_PRO_YEARLY]);

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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const slug =
    typeof body === "object" &&
    body !== null &&
    "slug" in body &&
    typeof body.slug === "string"
      ? body.slug
      : "";

  if (!PRO_SLUGS.has(slug)) {
    return NextResponse.json({ error: "Unknown Pro plan." }, { status: 400 });
  }

  const productId = polarProductIdForSlug(slug);
  if (!productId) {
    return NextResponse.json(
      { error: "That Pro plan is not configured." },
      { status: 503 },
    );
  }

  const origin = polarAppOrigin(request);

  try {
    const checkout = await getPolar().checkouts.create({
      externalCustomerId: session.user.id,
      products: [productId],
      successUrl: `${origin}/dashboard/subscription?checkout=success`,
      returnUrl: `${origin}/dashboard/subscription`,
      allowTrial: true,
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
      { error: polarErrorMessage(error) },
      { status: 502 },
    );
  }
}
