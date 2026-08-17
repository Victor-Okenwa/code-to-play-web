"use client";

import { Check, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
import { MARKETPLACE_URL, OPEN_VSX_URL } from "@/lib/extension";
import {
  FREE_FEATURES,
  formatUsd,
  PLAY_SPACE_COOLDOWN_HOURS,
  PLAY_SPACE_MAX,
  PLAY_SPACE_MIN,
  PLAY_SPACE_PRICE,
  PLAY_SPACE_WAS,
  PRO_FEATURES,
  PRO_MONTHLY,
  PRO_MONTHLY_WAS,
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
  was: string;
  suffix: string;
}) {
  return (
    <p className="flex flex-wrap items-baseline gap-2">
      <span className="text-sm text-muted-foreground line-through">{was}</span>
      <span className="font-heading text-3xl font-bold tracking-tight">
        {current}
      </span>
      <span className="text-sm text-muted-foreground">{suffix}</span>
    </p>
  );
}

export function PricingCards() {
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const [quantity, setQuantity] = useState(PLAY_SPACE_MIN);

  const yearly = interval === "yearly";
  const playTotal = quantity * PLAY_SPACE_PRICE;
  const playWasTotal = quantity * PLAY_SPACE_WAS;

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
            Subscription
          </p>
          <CardTitle className="font-heading text-xl">Pro</CardTitle>
          <CardDescription>
            Everything in Free, extra play spaces, Call Stack, and Merge
            Conflict.
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
        <CardFooter className="mt-auto">
          <Button type="button" disabled className="w-full">
            Coming soon
          </Button>
        </CardFooter>
      </Card>

      <Card className="flex h-full flex-col">
        <CardHeader>
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Add-on
          </p>
          <CardTitle className="font-heading text-xl">Play spaces</CardTitle>
          <CardDescription>
            Buy extra play spaces when you have already earned your loop and
            still want a short break.
          </CardDescription>
          <div className="space-y-3 pt-2">
            <Price
              current={formatUsd(playTotal)}
              was={formatUsd(playWasTotal)}
              suffix={quantity === 1 ? "for 1 space" : `for ${quantity} spaces`}
            />
            <p className="text-xs text-muted-foreground">
              {formatUsd(PLAY_SPACE_PRICE)} each{" "}
              <span className="line-through">{formatUsd(PLAY_SPACE_WAS)}</span>
            </p>
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
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Buy {PLAY_SPACE_MIN} to {PLAY_SPACE_MAX} play spaces at a time.
            After a purchase, the next buy is locked for{" "}
            {PLAY_SPACE_COOLDOWN_HOURS} hours so you stay concentrated on
            writing code.
          </p>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button type="button" disabled className="w-full">
            Coming soon
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
