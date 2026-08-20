import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalArticle,
  POLAR_TERMS_URL,
} from "@/components/legal/legal-article";
import { PageShell } from "@/components/static/page-shell";
import {
  CONTACT_EMAIL,
  GITHUB_ISSUES_URL,
  GITHUB_URL,
  MARKETPLACE_URL,
  OPEN_VSX_URL,
} from "@/lib/extension";
import { FREE_GAMES, formatGameList, PRO_GAMES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Legal — Code to Play",
  description:
    "Terms of use, trademarks, and licenses for the Code to Play website and extension.",
};

export default function LegalPage() {
  return (
    <PageShell
      title="Legal"
      description="Terms for using the Code to Play website and extension, plus trademarks and third-party licenses."
    >
      <LegalArticle>
        <h2>About these terms</h2>
        <p>
          These terms cover code-to-play.com and the Code to Play editor
          extension. Related: <Link href="/privacy">Privacy Policy</Link> and{" "}
          <Link href="/refund">Refund Policy</Link>. Paid checkouts are also
          subject to Polar’s{" "}
          <a href={POLAR_TERMS_URL} target="_blank" rel="noopener noreferrer">
            terms
          </a>
          , because Polar is the merchant of record.
        </p>
        <p>
          Contact: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2>The product</h2>
        <p>
          Code to Play unlocks in-editor mini-games as you write meaningful
          lines of code. Free includes {formatGameList(FREE_GAMES)}. Pro adds{" "}
          {formatGameList(PRO_GAMES)} plus extra play spaces. Plays, scoring,
          and unlocks run in the editor. The website is the companion for
          accounts, billing, docs, and optional analytics.
        </p>
        <p>
          We may change features, games, pricing, or availability. The extension
          changelog is on <Link href="/changelog">Changelog</Link>.
        </p>

        <h2>Accounts and the extension</h2>
        <p>
          You do not need an account to install or play for free. Sign in with
          GitHub if you want to link the editor, buy Pro or play spaces, or opt
          in to analytics. You are responsible for the GitHub account you
          connect and for keeping the editor signed in only on machines you
          trust.
        </p>
        <p>
          Install from the{" "}
          <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer">
            VS Code Marketplace
          </a>{" "}
          or{" "}
          <a href={OPEN_VSX_URL} target="_blank" rel="noopener noreferrer">
            Open VSX
          </a>
          . Use the extension only in editors that allow it and only with code
          you are allowed to edit.
        </p>

        <h2>Paid features</h2>
        <p>
          Pro and play spaces are optional. Prices and the trial are on{" "}
          <Link href="/pricing">Pricing</Link>. Payments go through Polar.
          Cancel or manage billing from the dashboard subscription page. See the{" "}
          <Link href="/refund">Refund Policy</Link> for trials, cancellations,
          and refund requests.
        </p>

        <h2>Acceptable use</h2>
        <p>
          Do not abuse sign-in, checkout, or analytics; do not attempt to steal,
          share, or forge entitlements; and do not use the service to break the
          law. We may suspend an account that we reasonably believe is abusing
          the product.
        </p>

        <h2>Editors and trademarks</h2>
        <p>
          Code to Play is an independent companion. It is not affiliated with,
          endorsed by, or sponsored by Microsoft, Visual Studio Code, Anysphere
          (Cursor), or the other editors listed on this site. Visual Studio
          Code, VS Code, Cursor, and other product names are trademarks of their
          respective owners.
        </p>

        <h2>License and third-party assets</h2>
        <p>
          The extension is licensed under the{" "}
          <a
            href={`${GITHUB_URL}/blob/main/LICENSE`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apache License 2.0
          </a>
          . Game UI fonts include Press Start 2P (CodeMan38) and Orbitron (Matt
          McInerney), both under the SIL Open Font License.
        </p>

        <h2>No warranty</h2>
        <p>
          The site and extension are provided “as is.” We do not promise
          uninterrupted service, that line counting will match every language
          perfectly, or that a particular score or unlock will be preserved
          across machines unless you opt in and sync a snapshot. To the extent
          the law allows, we are not liable for lost plays, scores, or indirect
          damages from using the product.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms. The date at the top of this page is the
          current version. If you do not agree, stop using the site and
          uninstall the extension.
        </p>
        <p>
          Report issues on{" "}
          <a href={GITHUB_ISSUES_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{" "}
          or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalArticle>
    </PageShell>
  );
}
