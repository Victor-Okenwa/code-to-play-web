/** biome-ignore-all lint/suspicious/noArrayIndexKey: hole cells are a fixed 3x3 grid */
import type { ClassValue } from "clsx";
import { Bug } from "lucide-react";

import { cn } from "@/lib/utils";

import { IdeShell } from "./ide-shell";

export function WhackABugMock({ className }: { className?: ClassValue }) {
  return (
    <IdeShell
      className={className}
      windowTitle="Whack-a-Bug — code-to-play"
      ariaLabel="Whack-a-Bug running in a VS Code webview: the Available Games sidebar highlights Whack-a-Bug, and the editor tab shows the 3 by 3 bug grid."
      plays={3}
      selectedGame="Whack-a-Bug"
    >
      <div className="flex border-b border-editor-border bg-editor-panel/60 text-[11px]">
        <span className="flex items-center gap-1.5 border-t-2 border-primary bg-editor px-3 py-2 font-mono">
          <Bug className="size-3 text-red-400" />
          Whack-a-Bug
        </span>
      </div>

      <div className="flex justify-center bg-editor px-3 py-4 sm:px-6">
        <div className="w-full max-w-sm rounded-lg border border-editor-border bg-editor-panel p-3">
          <p className="text-center text-[12px] text-sky-300">
            Squash those bugs before they escape!
          </p>

          <div className="mt-3 flex items-end justify-between gap-2 rounded-md bg-editor px-3 py-2">
            <div className="flex size-10 items-center justify-center rounded border border-sky-400/40 font-mono text-lg text-sky-300">
              0
            </div>
            <div className="text-center">
              <p className="text-[9px] tracking-wide text-editor-foreground/45 uppercase">
                High Score
              </p>
              <p className="font-mono text-sm text-teal-400">225</p>
            </div>
            <div className="text-center">
              <p className="text-[9px] tracking-wide text-editor-foreground/45 uppercase">
                Time
              </p>
              <p className="font-mono text-sm text-orange-400">25</p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {Array.from({ length: 9 }, (_, i) => {
              const isActive = i === 4;
              const isFaint = i === 8;

              return (
                <div
                  key={i}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-full bg-editor",
                    isActive && "ring-2 ring-teal-400",
                  )}
                >
                  {isActive ? (
                    <Bug className="size-[45%] text-red-500" />
                  ) : isFaint ? (
                    <Bug className="size-[40%] text-yellow-400/40" />
                  ) : null}
                </div>
              );
            })}
          </div>

          <p className="mt-3 text-center text-[10px] text-editor-foreground/55">
            Green features – avoid (-25) · Critical - +30
          </p>

          <div className="mt-3 flex gap-2">
            <span className="flex-1 rounded bg-blue-600 py-1.5 text-center text-[11px] font-medium text-white">
              Pause
            </span>
            <span className="flex-1 rounded border border-editor-border py-1.5 text-center text-[11px] text-editor-foreground/70">
              Back to Menu
            </span>
          </div>
        </div>
      </div>
    </IdeShell>
  );
}
