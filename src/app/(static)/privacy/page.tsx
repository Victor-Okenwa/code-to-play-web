import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalArticle,
  POLAR_PRIVACY_URL,
} from "@/components/legal/legal-article";
import { PageShell } from "@/components/static/page-shell";
import { CONTACT_EMAIL, GITHUB_ISSUES_URL } from "@/lib/extension";

export const metadata: Metadata = {
  title: "Privacy Policy — Code to Play",
  description:
    "How Code to Play handles editor stats, GitHub sign-in, and optional analytics.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="Plays, high scores, and line counts stay in your editor unless you opt in. This page describes what we store when you use the site or sign in."
    >
      <LegalArticle>
        <h2>Summary</h2>
        <p>
          Code to Play is privacy-first. You can install the extension, write
          code, unlock plays, and play games with no account and no network. The
          website, GitHub sign-in, and optional analytics exist so you can
          manage Pro and see a breakdown in the browser — not to watch you type.
        </p>
        <p>
          Questions: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          Related: <Link href="/legal">Legal</Link> and{" "}
          <Link href="/refund">Refund Policy</Link>.
        </p>

        <h2>What stays in your editor</h2>
        <p>
          By default, meaningful line counts, plays remaining, unlock progress,
          high scores, and play counts live only in the editor (VS Code, Cursor,
          or another compatible host). We do not receive your source code, file
          paths, or keystrokes.
        </p>
        <p>
          Signing in from the activity bar does not upload those totals. Free
          play keeps working if you never create an account.
        </p>

        <h2>Account data</h2>
        <p>
          If you sign in on the website or from the extension, we use GitHub
          OAuth. We store the GitHub account id, display name, email, and avatar
          so we can show your dashboard and link the editor to the same account.
          The extension keeps a session token in the editor’s secret storage.
        </p>
        <p>
          GitHub’s own handling of your GitHub account is described in{" "}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub’s privacy statement
          </a>
          .
        </p>

        <h2>Optional analytics</h2>
        <p>
          Progress monitoring is off by default. If you turn it on at{" "}
          <Link href="/dashboard/analytics">Analytics</Link> and the editor is
          signed in, the extension may upload a snapshot: lifetime lines, lines
          by file extension, plays remaining, unlock progress, and per-game play
          counts and high scores.
        </p>
        <p>
          A snapshot is sent after a play or unlock, shortly after you write
          while games are still locked, when you sign in from the editor, or at
          most every 15 minutes while signed in. It is not sent on each
          keystroke. This account stores one snapshot; each upload replaces the
          last. Turn the switch off to stop uploads and delete the snapshot
          here. Local stats in the editor are not deleted.
        </p>

        <h2>Payments</h2>
        <p>
          Paid Pro and play-space checkouts are processed by Polar, which acts
          as merchant of record. Polar receives the billing details needed to
          charge you, remit tax, and send receipts. See Polar’s{" "}
          <a href={POLAR_PRIVACY_URL} target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>
          . We store whether your account has Pro and play-space entitlements so
          the extension and dashboard can unlock the right features.
        </p>

        <h2>Cookies and sessions</h2>
        <p>
          The website uses a session cookie after you sign in so we can keep you
          logged in on this device. We do not use advertising cookies or sell
          personal data.
        </p>

        <h2>How long we keep data, and how to delete it</h2>
        <p>
          Account records last while the account exists. An analytics snapshot
          lasts until you opt out or we delete the account. Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> to ask us to
          delete your account and server-side snapshot. That does not wipe local
          editor storage; you can reset or uninstall the extension yourself.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes in a material way, we will update the date at
          the top of this page. Continued use of the site after that date means
          you have seen the new version.
        </p>
        <p>
          Bugs or privacy concerns:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> or{" "}
          <a href={GITHUB_ISSUES_URL} target="_blank" rel="noopener noreferrer">
            GitHub Issues
          </a>
          .
        </p>
      </LegalArticle>
    </PageShell>
  );
}
