const DEFAULT_CALLBACK_URL = "/dashboard";

export function isSafeCallbackUrl(
  value: string | null | undefined,
): value is string {
  if (!value) {
    return false;
  }

  if (!value.startsWith("/")) {
    return false;
  }

  if (value.startsWith("//") || value.includes("://") || value.includes("\\")) {
    return false;
  }

  return true;
}

export function safeCallbackUrl(value: string | null | undefined): string {
  return isSafeCallbackUrl(value) ? value : DEFAULT_CALLBACK_URL;
}

export function callbackUrlFromSearchParam(
  value: string | string[] | undefined,
): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return safeCallbackUrl(raw);
}
