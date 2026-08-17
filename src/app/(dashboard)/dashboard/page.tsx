import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { WelcomeToast } from "@/components/auth/welcome-toast";
import { DashboardPageShell } from "@/components/dashboard/page-shell";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MARKETPLACE_URL, UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";
import { requireSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Overview — Code to Play",
  description: "Your Code to Play account overview.",
};

export default async function DashboardOverviewPage() {
  const session = await requireSession();

  return (
    <DashboardPageShell
      title={`Welcome, ${session.user.name}`}
      description="Write meaningful lines in your editor to unlock plays. Scores and play counts stay local — this dashboard is your web account."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Unlock loop</CardTitle>
            <CardDescription>
              {UNLOCK_LINES} meaningful lines unlock {UNLOCK_PLAYS} plays,
              shared across games.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Comments, blanks, and brace-only lines do not count. The status bar
            in your editor shows progress until plays unlock.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Install the extension</CardTitle>
            <CardDescription>
              Plays happen in the editor, not in the browser.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={MARKETPLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants())}
            >
              Open Marketplace
            </Link>
          </CardContent>
        </Card>
      </div>
      <p className="text-sm text-muted-foreground">
        Need the Cursor / Open VSX build? See{" "}
        <Link
          href="/dashboard/extension"
          className="underline underline-offset-4"
        >
          Extension
        </Link>
        .
      </p>
      <Suspense>
        <WelcomeToast />
      </Suspense>
    </DashboardPageShell>
  );
}
