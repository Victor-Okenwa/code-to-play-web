import { Polar } from "@polar-sh/sdk";

export const POLAR_SLUG_PRO_MONTHLY = "pro-monthly";
export const POLAR_SLUG_PRO_YEARLY = "pro-yearly";
export const POLAR_SLUG_PLAY_SPACE = "play-space";

export type PolarServer = "sandbox" | "production";

export function polarServer(): PolarServer {
  return process.env.POLAR_SERVER === "production" ? "production" : "sandbox";
}

export function polarProductIds() {
  return {
    proMonthly: process.env.POLAR_PRODUCT_PRO_MONTHLY ?? "",
    proYearly: process.env.POLAR_PRODUCT_PRO_YEARLY ?? "",
    playSpace: process.env.POLAR_PRODUCT_PER_SPACE ?? "",
  };
}

export function polarCheckoutProducts() {
  const ids = polarProductIds();
  return [
    { slug: POLAR_SLUG_PRO_MONTHLY, productId: ids.proMonthly },
    { slug: POLAR_SLUG_PRO_YEARLY, productId: ids.proYearly },
    { slug: POLAR_SLUG_PLAY_SPACE, productId: ids.playSpace },
  ].filter((product) => product.productId.length > 0);
}

export function isPlaySpaceProduct(productId: string | null | undefined) {
  const playSpaceId = polarProductIds().playSpace;
  return Boolean(playSpaceId && productId === playSpaceId);
}

export function isProProduct(productId: string | null | undefined) {
  const ids = polarProductIds();
  return Boolean(
    productId && (productId === ids.proMonthly || productId === ids.proYearly),
  );
}

export function polarAppOrigin(request: Request) {
  const configured = process.env.BETTER_AUTH_URL;
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // Use the incoming request origin below.
    }
  }
  return new URL(request.url).origin;
}

export function polarProductIdForSlug(slug: string) {
  const ids = polarProductIds();
  if (slug === POLAR_SLUG_PRO_MONTHLY) {
    return ids.proMonthly;
  }
  if (slug === POLAR_SLUG_PRO_YEARLY) {
    return ids.proYearly;
  }
  if (slug === POLAR_SLUG_PLAY_SPACE) {
    return ids.playSpace;
  }
  return "";
}

export function getPolar() {
  return new Polar({
    accessToken: process.env.POLAR_ACCESS_TOKEN ?? "",
    server: polarServer(),
  });
}
