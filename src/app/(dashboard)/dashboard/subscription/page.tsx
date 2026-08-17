import type { Metadata } from "next";
import Link from "next/link";
import { DashboardPageShell } from "@/components/dashboard/page-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FREE_FEATURES,
  formatUsd,
  PRO_FEATURES,
  PRO_MONTHLY,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Subscription — Code to Play",
  description: "Free and Pro plans for Code to Play.",
};

export default function DashboardSubscriptionPage() {
  return (
    <DashboardPageShell
      title="Subscription"
      description="You are on Free. Pro adds play spaces, Call Stack, and Merge Conflict — checkout is not wired yet."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>Current plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {FREE_FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>{formatUsd(PRO_MONTHLY)} / month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {PRO_FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Button nativeButton={false} render={<Link href="/pricing" />}>
              View pricing
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardPageShell>
  );
}
