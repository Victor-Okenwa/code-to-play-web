import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { DashboardPageShell } from "@/components/dashboard/page-shell";
import { CheckoutSuccessToast } from "@/components/pricing/checkout-success-toast";
import {
  ManageBillingButton,
  PlaySpacesCard,
} from "@/components/pricing/pricing-cards";
import { SubscriptionProButton } from "@/components/pricing/subscription-pro-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserEntitlements, toEntitlementsPayload } from "@/lib/entitlements";
import { POLAR_SLUG_PRO_MONTHLY } from "@/lib/polar";
import {
  FREE_FEATURES,
  formatUsd,
  PLAY_SPACE_COOLDOWN_HOURS,
  PRO_FEATURES,
  PRO_MONTHLY,
  PRO_TRIAL_COPY,
} from "@/lib/pricing";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Subscription — Code to Play",
  description: "Free and Pro plans for Code to Play, plus play space add-ons.",
};

export default async function DashboardSubscriptionPage() {
  const session = await requireSession();
  const entitlements = toEntitlementsPayload(
    await getUserEntitlements(session.user.id),
  );
  const plan = entitlements.isPro ? "Pro" : "Free";

  return (
    <DashboardPageShell
      title="Subscription"
      description={`You are on ${plan}. Pro starts with a ${PRO_TRIAL_COPY}, then extra play spaces, Call Stack, and Merge Conflict. Play spaces are a one-off add-on, with a ${PLAY_SPACE_COOLDOWN_HOURS}-hour wait between buys.`}
      actions={
        entitlements.isPro ? (
          <ManageBillingButton />
        ) : (
          <SubscriptionProButton slug={POLAR_SLUG_PRO_MONTHLY} />
        )
      }
    >
      <Suspense>
        <CheckoutSuccessToast />
      </Suspense>
      <PlaySpacesCard
        layout="wide"
        callbackURL="/dashboard/subscription"
        cooldownEndsAt={entitlements.playSpaceCooldownEndsAt}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Card
          className={entitlements.isPro ? undefined : "ring-2 ring-primary"}
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Free</CardTitle>
              {entitlements.isPro ? null : <Badge>Current plan</Badge>}
            </div>
            <CardDescription>
              {entitlements.isPro
                ? "Included in Pro"
                : "Earn plays by writing meaningful code."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {FREE_FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card
          className={entitlements.isPro ? "ring-2 ring-primary" : undefined}
        >
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>Pro</CardTitle>
              {entitlements.isPro ? <Badge>Current plan</Badge> : null}
            </div>
            <CardDescription>
              {entitlements.isPro
                ? "Extra play spaces, Call Stack, and Merge Conflict."
                : `${PRO_TRIAL_COPY}, then ${formatUsd(PRO_MONTHLY)} / month`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
              {PRO_FEATURES.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            {entitlements.isPro ? null : (
              <Button nativeButton={false} render={<Link href="/pricing" />}>
                View pricing
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardPageShell>
  );
}
