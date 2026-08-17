import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DeviceAuthorizeCard } from "@/components/auth/device-authorize-card";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Link editor — Code to Play",
  description: "Approve a Code to Play editor sign-in request.",
};

function firstSearchParam(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw?.trim() ?? "";
}

export default async function DevicePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const userCode = firstSearchParam(params.user_code);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const callbackURL = userCode
      ? `/device?user_code=${encodeURIComponent(userCode)}`
      : "/device";
    redirect(`/signin?callbackURL=${encodeURIComponent(callbackURL)}`);
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:py-16">
      <DeviceAuthorizeCard initialUserCode={userCode} />
    </main>
  );
}
