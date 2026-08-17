import Link from "next/link";

import { DocsProse } from "@/components/docs/docs-prose";
import { docsPath } from "@/lib/docs";
import { UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";

export function GettingStartedPanel() {
  return (
    <DocsProse>
      <p>
        You do not need an account or a network connection to play. Install the
        extension, write code, and unlock plays locally in the editor. Sign in
        from the activity bar is optional and is how you will link Pro later.
      </p>
      <h2>What you need</h2>
      <ul>
        <li>
          VS Code (Marketplace) or a VS Code-compatible editor such as Cursor
          (Open VSX)
        </li>
        <li>A project with a tracked language so the status bar can move</li>
      </ul>
      <h2>How the loop works</h2>
      <ol>
        <li>Write real code — not comments, blanks, or brace-only lines.</li>
        <li>
          Watch the status bar until you reach {UNLOCK_LINES} lines. That
          unlocks {UNLOCK_PLAYS} plays, shared across every game.
        </li>
        <li>
          Open the Code to Play view in the Activity Bar, pick a game, and spend
          a play. Your tabs and cursor stay put.
        </li>
      </ol>
      <p>
        Ready to install? Follow the steps on{" "}
        <Link href={docsPath("installation")}>Installation</Link>. After that,
        the <Link href={docsPath("quick-start")}>Quick start</Link> covers the
        status bar and how to spend plays.
      </p>
    </DocsProse>
  );
}
