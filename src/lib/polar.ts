import { Polar } from "@polar-sh/sdk";

export const POLAR_SLUG_PRO_MONTHLY = "pro-monthly";
export const POLAR_SLUG_PRO_YEARLY = "pro-yearly";
export const POLAR_SLUG_PLAY_SPACE = "play-space";

export type PolarServer = "sandbox" | "production";

/**
 * Secrets piped into `wrangler secret put` often carry a trailing newline or
 * CR, which silently breaks exact comparisons and Bearer headers.
 */
function env(name: string) {
  return process.env[name]?.trim() ?? "";
}

export function polarServer(): PolarServer {
  return env("POLAR_SERVER").toLowerCase() === "production"
    ? "production"
    : "sandbox";
}

export function polarAccessToken() {
  return env("POLAR_ACCESS_TOKEN");
}

export function isPolarConfigured() {
  return polarAccessToken().length > 0;
}

export const POLAR_NOT_CONFIGURED_MESSAGE =
  "Billing is not configured on this deployment. Set POLAR_ACCESS_TOKEN and POLAR_SERVER on the Worker.";

export function polarErrorMessage(
  error: unknown,
  fallback = "Checkout could not start.",
) {
  if (error instanceof Error && error.message) {
    const cause =
      error.cause instanceof Error && error.cause.message
        ? error.cause.message
        : null;
    return cause ? `${error.message}: ${cause}` : error.message;
  }
  return fallback;
}

export function polarProductIds() {
  return {
    proMonthly: env("POLAR_PRODUCT_PRO_MONTHLY"),
    proYearly: env("POLAR_PRODUCT_PRO_YEARLY"),
    playSpace: env("POLAR_PRODUCT_PER_SPACE"),
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
  const configured = env("BETTER_AUTH_URL");
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
    accessToken: polarAccessToken(),
    server: polarServer(),
  });
}
