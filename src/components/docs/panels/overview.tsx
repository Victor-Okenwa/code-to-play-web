import Link from "next/link";

import { DocsProse } from "@/components/docs/docs-prose";
import { docsPath } from "@/lib/docs";
import { UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";
import { FREE_GAMES, PRO_TRIAL_COPY, PRO_UPCOMING_GAMES } from "@/lib/pricing";

export function OverviewPanel() {
  return (
    <DocsProse>
      <p>
        Code to Play is a VS Code extension that unlocks in-editor mini-games as
        you write real code. Meaningful lines count toward unlocks — comments,
        blanks, and brace-only lines do not.
      </p>
      <h2>The loop</h2>
      <ol>
        <li>Write code in a supported file.</li>
        <li>
          Hit {UNLOCK_LINES} meaningful lines to unlock {UNLOCK_PLAYS} plays,
          shared across every game.
        </li>
        <li>
          Open a game in the editor, spend a play, then return to the same file.
        </li>
      </ol>
      <h2>Games</h2>
      <p>
        Free includes {FREE_GAMES.join(" and ")}. Pro adds {PRO_UPCOMING_GAMES}{" "}
        and starts with a {PRO_TRIAL_COPY}. All have difficulty levels. High
        scores, stats, and play counts stay on your machine unless you opt in on
        the dashboard. The extension does not send source or file paths.
      </p>
      <h2>Where to go next</h2>
      <ul>
        <li>
          <Link href={docsPath("getting-started")}>Getting started</Link> — what
          you need before you install
        </li>
        <li>
          <Link href={docsPath("installation")}>Installation</Link> —
          Marketplace and Open VSX
        </li>
        <li>
          <Link href={docsPath("quick-start")}>Quick start</Link> — status bar,
          plays, and tracked languages
        </li>
        <li>
          <Link href={docsPath("troubleshooting")}>Troubleshooting</Link> — when
          the meter does not move
        </li>
        <li>
          <Link href={docsPath("faq")}>FAQ</Link> — Pro, privacy, and more
        </li>
      </ul>
    </DocsProse>
  );
}
