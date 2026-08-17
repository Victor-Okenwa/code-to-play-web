import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SignInCard } from "@/components/auth/signin-card";
import { auth } from "@/lib/auth";
import { callbackUrlFromSearchParam } from "@/lib/auth-callback";

export const metadata: Metadata = {
  title: "Sign in — Code to Play",
  description:
    "Sign in with GitHub. Plays and high scores stay in your editor.",
};

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const callbackURL = callbackUrlFromSearchParam(params.callbackURL);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(callbackURL);
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:py-16">
      <Suspense>
        <SignInCard />
      </Suspense>
    </main>
  );
}
