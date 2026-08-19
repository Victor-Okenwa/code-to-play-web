"use client";

import { authClient } from "@/lib/auth-client";
import { POLAR_SLUG_PRO_MONTHLY, POLAR_SLUG_PRO_YEARLY } from "@/lib/polar";

type CheckoutInput = {
  slug?: string;
  products?: string[];
  metadata?: Record<string, string | number | boolean>;
};

type CheckoutResponse = {
  url?: string;
  data?: { url?: string };
  error?: { message?: string } | string;
};

function checkoutUrl(payload: CheckoutResponse | null) {
  return payload?.url ?? payload?.data?.url;
}

function checkoutError(payload: CheckoutResponse | null, fallback: string) {
  if (!payload) {
    return fallback;
  }
  if (typeof payload.error === "string") {
    return payload.error;
  }
  return payload.error?.message ?? fallback;
}

export async function startPolarCheckout(input: CheckoutInput) {
  if (
    input.slug === POLAR_SLUG_PRO_MONTHLY ||
    input.slug === POLAR_SLUG_PRO_YEARLY
  ) {
    const response = await fetch("/api/checkout/pro", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: input.slug }),
    });
    const payload = (await response.json().catch(() => null)) as {
      url?: string;
      error?: string;
    } | null;
    if (!response.ok || !payload?.url) {
      throw new Error(payload?.error ?? "Checkout could not start.");
    }
    window.location.href = payload.url;
    return;
  }
  const client = authClient as typeof authClient & {
    checkout?: (
      body: CheckoutInput & { redirect?: boolean },
    ) => Promise<{ data?: { url?: string }; error?: { message?: string } }>;
  };

  if (typeof client.checkout === "function") {
    const { data, error } = await client.checkout({
      ...input,
      redirect: false,
    });
    if (error?.message) {
      throw new Error(error.message);
    }
    if (data?.url) {
      window.location.href = data.url;
      return;
    }
  }

  const response = await fetch("/api/auth/checkout", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...input, redirect: false }),
  });
  const payload = (await response
    .json()
    .catch(() => null)) as CheckoutResponse | null;
  const url = checkoutUrl(payload);
  if (!response.ok || !url) {
    throw new Error(checkoutError(payload, "Checkout could not start."));
  }
  window.location.href = url;
}

export async function openPolarPortal() {
  const client = authClient as typeof authClient & {
    customer?: {
      portal?: (body?: {
        redirect?: boolean;
      }) => Promise<{ data?: { url?: string }; error?: { message?: string } }>;
    };
  };

  if (typeof client.customer?.portal === "function") {
    const { data, error } = await client.customer.portal({ redirect: false });
    if (error?.message) {
      throw new Error(error.message);
    }
    if (data?.url) {
      window.location.href = data.url;
      return;
    }
  }

  const response = await fetch("/api/auth/customer/portal", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ redirect: false }),
  });
  const payload = (await response
    .json()
    .catch(() => null)) as CheckoutResponse | null;
  const url = checkoutUrl(payload);
  if (!response.ok || !url) {
    throw new Error(checkoutError(payload, "Could not open billing portal."));
  }
  window.location.href = url;
}

export async function startPlaySpaceCheckout(quantity: number) {
  const response = await fetch("/api/checkout/play-space", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  const payload = (await response.json().catch(() => null)) as {
    url?: string;
    error?: string;
  } | null;
  if (!response.ok || !payload?.url) {
    throw new Error(payload?.error ?? "Play space checkout could not start.");
  }
  window.location.href = payload.url;
}
