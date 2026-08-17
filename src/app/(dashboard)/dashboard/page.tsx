import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { WelcomeToast } from "@/components/auth/welcome-toast";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Dashboard — Code to Play",
  description: "Your Code to Play account.",
};

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-12 sm:px-6 lg:py-16">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome, {session.user.name}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Plays, high scores, and stats still live locally in your editor. This
          dashboard is the start of your web account.
        </p>
      </header>
      <Suspense>
        <WelcomeToast />
      </Suspense>
    </main>
  );
}
