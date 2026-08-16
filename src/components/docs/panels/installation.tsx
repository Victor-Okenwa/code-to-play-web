import { DocsProse } from "@/components/docs/docs-prose";
import { MARKETPLACE_URL, OPEN_VSX_URL } from "@/lib/extension";

export function InstallationPanel() {
  return (
    <DocsProse>
      <ol>
        <li>Open VS Code, Cursor, or another VS Code-compatible editor.</li>
        <li>
          Open the Extensions view with <kbd>Ctrl+Shift+X</kbd> or{" "}
          <kbd>Cmd+Shift+X</kbd>.
        </li>
        <li>
          Search for{" "}
          <span className="font-medium text-foreground">Code to Play</span> and
          click Install.
        </li>
        <li>Reload the editor if prompted.</li>
      </ol>
      <p>
        Direct links:{" "}
        <a href={MARKETPLACE_URL} target="_blank" rel="noopener noreferrer">
          VS Code Marketplace
        </a>{" "}
        for VS Code, or{" "}
        <a href={OPEN_VSX_URL} target="_blank" rel="noopener noreferrer">
          Open VSX
        </a>{" "}
        for Cursor and other forks.
      </p>
    </DocsProse>
  );
}
