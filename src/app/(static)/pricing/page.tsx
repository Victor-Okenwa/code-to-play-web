import type { Metadata } from "next";

import { PricingCards } from "@/components/pricing/pricing-cards";
import { PageShell } from "@/components/static/page-shell";
import {
  formatUsd,
  PLAY_SPACE_COOLDOWN_HOURS,
  PRO_MONTHLY,
  PRO_TRIAL_COPY,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing — Code to Play",
  description:
    "Free to install and earn plays by writing code. Optional Pro with a 7-day free trial, plus play spaces when you want extra breaks.",
};

export default function PricingPage() {
  return (
    <PageShell
      title="Pricing"
      description={`Install free and earn plays by writing code. Pro starts with a ${PRO_TRIAL_COPY}, then ${formatUsd(PRO_MONTHLY)}/month for extra play spaces, Call Stack, and Merge Conflict. Play spaces are also a one-off add-on, with a ${PLAY_SPACE_COOLDOWN_HOURS}-hour wait between buys.`}
    >
      <PricingCards />
    </PageShell>
  );
}
