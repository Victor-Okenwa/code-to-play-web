import type { Metadata } from "next";

import { PricingCards } from "@/components/pricing/pricing-cards";
import { PageShell } from "@/components/static/page-shell";
import {
  formatUsd,
  PLAY_SPACE_COOLDOWN_HOURS,
  PRO_MONTHLY,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing — Code to Play",
  description:
    "Free to install and earn plays by writing code. Optional Pro subscription and play spaces when you want extra breaks.",
};

export default function PricingPage() {
  return (
    <PageShell
      title="Pricing"
      description={`Install free and earn plays by writing code. Pro is ${formatUsd(PRO_MONTHLY)}/month for extra play spaces, Call Stack, and Merge Conflict, or buy play spaces one-off — with a ${PLAY_SPACE_COOLDOWN_HOURS}-hour wait between buys.`}
    >
      <PricingCards />
    </PageShell>
  );
}
