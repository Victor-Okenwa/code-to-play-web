import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalArticle,
  POLAR_TERMS_URL,
} from "@/components/legal/legal-article";
import { PageShell } from "@/components/static/page-shell";
import { CONTACT_EMAIL } from "@/lib/extension";
import {
  formatUsd,
  PLAY_SPACE_MAX,
  PLAY_SPACE_MIN,
  PLAY_SPACE_PRICE,
  PRO_TRIAL_COPY,
  PRO_TRIAL_DAYS,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Refund Policy — Code to Play",
  description:
    "Trials, cancellations, and refunds for Code to Play Pro and play spaces.",
};

export default function RefundPage() {
  return (
    <PageShell
      title="Refund Policy"
      description={`The extension is free. Pro starts with a ${PRO_TRIAL_COPY}. This page covers cancellations and how to ask for a refund.`}
    >
      <LegalArticle>
        <h2>Overview</h2>
        <p>
          Polar is the merchant of record for paid Code to Play purchases. They
          charge the card, handle tax, and issue receipts. We still handle
          support for the product. Polar’s{" "}
          <a href={POLAR_TERMS_URL} target="_blank" rel="noopener noreferrer">
            terms
          </a>{" "}
          apply to checkout. Polar may also refund an order on its own (for
          example to prevent a chargeback), even when our policy below would
          not.
        </p>
        <p>
          Related: <Link href="/legal">Legal</Link> and{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>

        <h2>The extension is free</h2>
        <p>
          Installing Code to Play, earning plays by writing code, and playing
          the free games does not cost anything. There is nothing to refund for
          Free use.
        </p>

        <h2>Pro trial</h2>
        <p>
          New Pro checkouts start with a {PRO_TRIAL_COPY}. Cancel before those{" "}
          {PRO_TRIAL_DAYS} days end and you are not charged. After the trial,
          Pro renews at the monthly or yearly price you chose on{" "}
          <Link href="/pricing">Pricing</Link> until you cancel.
        </p>

        <h2>Cancelling Pro</h2>
        <p>
          Cancel anytime from{" "}
          <Link href="/dashboard/subscription">Subscription</Link> (Manage
          billing) while signed in. Cancellation stops the next renewal. You
          keep Pro until the end of the period you already paid for. Cancelling
          does not by itself refund that period.
        </p>

        <h2>Play spaces</h2>
        <p>
          Play spaces are a one-time add-on ({formatUsd(PLAY_SPACE_PRICE)} each,{" "}
          {PLAY_SPACE_MIN}–{PLAY_SPACE_MAX} per purchase), not a subscription.
          Once the spaces are added to your account they are digital and
          generally not refunded. If you were charged twice, bought by mistake
          and have not used the spaces, or the checkout failed after payment,
          email us and we will sort it out.
        </p>

        <h2>How to request a refund</h2>
        <p>
          Email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Refund request")}`}
          >
            {CONTACT_EMAIL}
          </a>{" "}
          from the address on your account. Include the GitHub email you signed
          in with, the date, and whether the charge was Pro or play spaces.
        </p>
        <p>We will refund, or ask Polar to refund, when:</p>
        <ul>
          <li>
            You were charged after a cancelled trial or duplicate checkout.
          </li>
          <li>The charge does not match what Pricing showed.</li>
          <li>
            Pro billed after you cancelled and you should not have been renewed.
          </li>
          <li>
            Something on our side blocked you from using what you paid for, and
            we cannot fix it promptly.
          </li>
        </ul>
        <p>
          We may decline a refund when the trial was used in full, the
          subscription period was used, or play spaces were already consumed. If
          we refund Pro, we may remove Pro access for the remaining time on that
          period.
        </p>

        <h2>Chargebacks</h2>
        <p>
          Please contact us before opening a dispute with your bank. We would
          rather fix a billing mistake directly. Polar may refund automatically
          when a card network signals a likely chargeback.
        </p>
      </LegalArticle>
    </PageShell>
  );
}
