import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/static/page-shell";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MARKETPLACE_URL,
  OPEN_VSX_URL,
  UNLOCK_LINES,
  UNLOCK_PLAYS,
} from "@/lib/extension";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — Code to Play",
  description:
    "Code to Play is free to install. Earn plays by writing code — no account or subscription required.",
};

export default function PricingPage() {
  return (
    <PageShell
      title="Pricing"
      description="The extension is free on the VS Code Marketplace and Open VSX. Plays come from writing code, not from a checkout."
    >
      <Card className="max-w-lg">
        <CardHeader>
          <p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
            Current
          </p>
          <CardTitle className="font-heading text-2xl">Free</CardTitle>
          <CardDescription>
            Install once. Unlock {UNLOCK_PLAYS} plays per {UNLOCK_LINES}{" "}
            meaningful lines. Both games, local high scores, and stats are
            included.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Link
            href={MARKETPLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            VS Code Marketplace
          </Link>
          <Link
            href={OPEN_VSX_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Open VSX
          </Link>
        </CardContent>
      </Card>
    </PageShell>
  );
}
