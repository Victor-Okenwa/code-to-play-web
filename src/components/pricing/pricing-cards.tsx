"use client";

import { Check, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { CooldownCountdown } from "@/components/pricing/cooldown-countdown";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authClient } from "@/lib/auth-client";
import { MARKETPLACE_URL, OPEN_VSX_URL } from "@/lib/extension";
import { POLAR_SLUG_PRO_MONTHLY, POLAR_SLUG_PRO_YEARLY } from "@/lib/polar";
import {
  openPolarPortal,
  startPlaySpaceCheckout,
  startPolarCheckout,
} from "@/lib/polar-checkout";
import {
  FREE_FEATURES,
  formatUsd,
  PLAY_SPACE_COOLDOWN_HOURS,
  PLAY_SPACE_MAX,
  PLAY_SPACE_MIN,
  PLAY_SPACE_PRICE,
  PRO_FEATURES,
  PRO_MONTHLY,
  PRO_MONTHLY_WAS,
  PRO_TRIAL_COPY,
  PRO_UPCOMING_GAMES,
  PRO_YEARLY,
  PRO_YEARLY_DISCOUNT,
  PRO_YEARLY_WAS,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

type BillingInterval = "monthly" | "yearly";

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm">
          <Check
            className="mt-0.5 size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Price({
  current,
  was,
  suffix,
}: {
  current: string;
  was?: string;
  suffix: string;
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-2">
      {was ? (
        <span className="text-sm text-muted-foreground line-through">
          {was}
        </span>
      ) : null}
      <span className="font-heading text-3xl font-bold tracking-tight">
        {current}
      </span>
      <span className="text-sm text-muted-foreground">{suffix}</span>
    </p>
  );
}

function signInHref(callbackURL: string) {
  return `/signin?callbackURL=${encodeURIComponent(callbackURL)}`;
}

export function PlaySpacesCard({
  callbackURL = "/pricing",
  cooldownEndsAt: cooldownEndsAtProp = null,
  layout = "stacked",
}: {
  callbackURL?: string;
  cooldownEndsAt?: string | null;
  layout?: "stacked" | "wide";
}) {
  const { data: session, isPending } = authClient.useSession();
  const [quantity, setQuantity] = useState(PLAY_SPACE_MIN);
  const [pending, setPending] = useState(false);
  const [cooldownEndsAt, setCooldownEndsAt] = useState(cooldownEndsAtProp);
  const playTotal = quantity * PLAY_SPACE_PRICE;

  useEffect(() => {
    setCooldownEndsAt(cooldownEndsAtProp);
  }, [cooldownEndsAtProp]);

  const handleCooldownDone = useCallback(() => {
    setCooldownEndsAt(null);
  }, []);

  const cooldownActive =
    cooldownEndsAt !== null && new Date(cooldownEndsAt).getTime() > Date.now();

  async function buy() {
    if (!session) {
      window.location.href = signInHref(callbackURL);
      return;
    }

    setPending(true);
    try {
      await startPlaySpaceCheckout(quantity);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not start checkout.",
      );
      setPending(false);
    }
  }

  const cooldownNotice =
    cooldownActive && cooldownEndsAt ? (
      <CooldownCountdown endsAt={cooldownEndsAt} onDone={handleCooldownDone} />
    ) : null;

  const stepper = (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Fewer play spaces"
        disabled={quantity <= PLAY_SPACE_MIN}
        onClick={() =>
          setQuantity((value) => Math.max(PLAY_SPACE_MIN, value - 1))
        }
      >
        <Minus />
      </Button>
      <span className="min-w-8 text-center font-heading text-lg font-semibold tabular-nums">
        {quantity}
      </span>
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="More play spaces"
        disabled={quantity >= PLAY_SPACE_MAX}
        onClick={() =>
          setQuantity((value) => Math.min(PLAY_SPACE_MAX, value + 1))
        }
      >
        <Plus />
      </Button>
    </div>
  );

  const buyButton = (
    <Button
      type="button"
      className="w-full"
      disabled={pending || isPending || cooldownActive}
      onClick={() => void buy()}
    >
      {cooldownActive
        ? "On cooldown"
        : session
          ? `Buy ${quantity} ${quantity === 1 ? "space" : "spaces"}`
          : "Sign in to buy"}
    </Button>
  );

  if (layout === "wide") {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Add-on
            </p>
            <h2 className="font-heading text-xl font-semibold">Play spaces</h2>
            <p className="text-sm text-muted-foreground">
              Buy extra play spaces when you have already earned your loop and
              still want a short break. Buy {PLAY_SPACE_MIN} to {PLAY_SPACE_MAX}{" "}
              at a time; after a purchase, the next buy is locked for{" "}
              {PLAY_SPACE_COOLDOWN_HOURS} hours so you stay concentrated on
              writing code.
            </p>
            {cooldownNotice}
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 md:w-56 md:items-end">
            <div className="space-y-1 md:text-right">
              <Price
                current={formatUsd(playTotal)}
                suffix={
                  quantity === 1 ? "for 1 space" : `for ${quantity} spaces`
                }
              />
              <p className="text-xs text-muted-foreground">
                {formatUsd(PLAY_SPACE_PRICE)} each
              </p>
            </div>
            {stepper}
            {buyButton}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Add-on
        </p>
        <CardTitle className="font-heading text-xl">Play spaces</CardTitle>
        <CardDescription>
          Buy extra play spaces when you have already earned your loop and still
          want a short break.
        </CardDescription>
        <div className="space-y-3 pt-2">
          <Price
            current={formatUsd(playTotal)}
            suffix={quantity === 1 ? "for 1 space" : `for ${quantity} spaces`}
          />
          <p className="text-xs text-muted-foreground">
            {formatUsd(PLAY_SPACE_PRICE)} each
          </p>
          {stepper}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Buy {PLAY_SPACE_MIN} to {PLAY_SPACE_MAX} play spaces at a time. After
          a purchase, the next buy is locked for {PLAY_SPACE_COOLDOWN_HOURS}{" "}
          hours so you stay concentrated on writing code.
        </p>
        {cooldownNotice}
      </CardContent>
      <CardFooter className="mt-auto">{buyButton}</CardFooter>
    </Card>
  );
}

export function PricingCards() {
  const { data: session, isPending } = authClient.useSession();
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [pending, setPending] = useState(false);
  const yearly = interval === "yearly";

  async function checkoutPro() {
    if (!session) {
      window.location.href = signInHref("/pricing");
      return;
    }

    setPending(true);
    try {
      await startPolarCheckout({
        slug: yearly ? POLAR_SLUG_PRO_YEARLY : POLAR_SLUG_PRO_MONTHLY,
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not start checkout.",
      );
      setPending(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Free</CardTitle>
          <CardDescription>
            Earn plays by writing meaningful code. Install once, no account.
          </CardDescription>
          <p className="font-heading pt-2 text-3xl font-bold tracking-tight">
            {formatUsd(0)}
          </p>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4">
          <FeatureList items={FREE_FEATURES} />
        </CardContent>
        <CardFooter className="mt-auto flex flex-wrap gap-2">
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
        </CardFooter>
      </Card>

      <Card className="flex h-full flex-col ring-2 ring-primary">
        <CardHeader>
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            Subscription · {PRO_TRIAL_COPY}
          </p>
          <CardTitle className="font-heading text-xl">Pro</CardTitle>
          <CardDescription>
            Everything in Free, extra play spaces, {PRO_UPCOMING_GAMES}. Start
            with a {PRO_TRIAL_COPY}.
          </CardDescription>
          <Tabs
            value={interval}
            onValueChange={(value) => {
              if (value === "monthly" || value === "yearly") {
                setInterval(value);
              }
            }}
            className="pt-3"
          >
            <TabsList className="w-full">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly · {PRO_YEARLY_DISCOUNT * 100}% off
              </TabsTrigger>
            </TabsList>
          </Tabs>
          {yearly ? (
            <div className="space-y-1 pt-2">
              <Price
                current={formatUsd(PRO_YEARLY)}
                was={formatUsd(PRO_YEARLY_WAS)}
                suffix="/year"
              />
              <p className="text-xs text-muted-foreground">
                {formatUsd(PRO_YEARLY / 12)} per month, billed yearly
              </p>
            </div>
          ) : (
            <div className="pt-2">
              <Price
                current={formatUsd(PRO_MONTHLY)}
                was={formatUsd(PRO_MONTHLY_WAS)}
                suffix="/month"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4">
          <FeatureList items={PRO_FEATURES} />
        </CardContent>
        <CardFooter className="mt-auto flex flex-col gap-2">
          <Button
            type="button"
            className="w-full"
            disabled={pending || isPending}
            onClick={() => void checkoutPro()}
          >
            {session ? "Go Pro" : "Sign in for Pro"}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Then {formatUsd(PRO_MONTHLY)}/month or yearly. Cancel during the
            trial and you are not charged.
          </p>
        </CardFooter>
      </Card>

      <PlaySpacesCard />
    </div>
  );
}

export function ManageBillingButton() {
  const [pending, setPending] = useState(false);

  return (
    <Button
      type="button"
      variant="outline"
      disabled={pending}
      onClick={() => {
        setPending(true);
        void openPolarPortal().catch((error: unknown) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Could not open billing portal.",
          );
          setPending(false);
        });
      }}
    >
      Manage billing
    </Button>
  );
}
