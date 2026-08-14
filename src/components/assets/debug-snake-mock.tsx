import type { ClassValue } from "clsx";
import { Bug, Frame, Volume2 } from "lucide-react";

import { IdeShell } from "./ide-shell";

const SIZE = 10;
const SNAKE = new Set(["3-4", "4-4", "5-4", "5-5", "5-6"]);
const HEAD = "5-6";
const FOOD = "4-7";

export function DebugSnakeMock({ className }: { className?: ClassValue }) {
  return (
    <IdeShell
      className={className}
      windowTitle="Debug Snake — code-to-play"
      ariaLabel="Debug Snake running in a VS Code webview: the Available Games sidebar highlights Debug Snake, and the editor tab shows the game grid."
      plays={3}
      selectedGame="Debug Snake"
    >
      <div className="flex border-b border-editor-border bg-editor-panel/60 text-[11px]">
        <span className="flex items-center gap-1.5 border-t-2 border-primary bg-editor px-3 py-2 font-mono">
          <span aria-hidden="true">🐍</span>
          Debug Snake
        </span>
      </div>

      <div className="flex justify-center bg-editor px-3 py-4 sm:px-6">
        <div className="w-full max-w-sm rounded-lg border border-editor-border bg-editor-panel p-3">
          <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
            <span className="inline-flex items-center gap-1 rounded border border-editor-border px-1.5 py-0.5">
              <Volume2 className="size-3" />
              Sound On
            </span>
            <span className="inline-flex items-center gap-1 rounded border border-editor-border px-1.5 py-0.5">
              <Frame className="size-3" />
              Focus Play
            </span>
            <span className="inline-flex items-center gap-1 rounded border border-emerald-500/70 px-1.5 py-0.5 text-emerald-400">
              Easy
            </span>
            <span className="ml-auto hidden text-editor-foreground/45 sm:inline">
              Ctrl+M mute · Ctrl+F focus
            </span>
          </div>

          <h2 className="mt-4 flex items-center justify-center gap-2 font-display text-[13px] tracking-wide text-emerald-400 uppercase sm:text-sm">
            <Bug className="size-4 text-red-400" />
            Debug Snake
          </h2>
          <p className="mt-1 text-center text-[10px] text-editor-foreground/55">
            Catch the bugs and grow your debugging skills!
          </p>

          <div className="mt-3 flex justify-between font-mono text-[10px] text-editor-foreground/70">
            <span>Bugs Fixed: 8</span>
            <span>High Score: 11</span>
            <span>Speed Level: 2</span>
          </div>

          <div
            className="mt-3 grid aspect-square w-full gap-px rounded-md bg-editor-border p-px"
            style={{ gridTemplateColumns: `repeat(${SIZE}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: SIZE * SIZE }, (_, i) => {
              const row = Math.floor(i / SIZE);
              const col = i % SIZE;
              const key = `${row}-${col}`;
              const isHead = key === HEAD;
              const isSnake = SNAKE.has(key);
              const isFood = key === FOOD;

              return (
                <div
                  key={key}
                  className="flex aspect-square items-center justify-center bg-editor"
                >
                  {isFood ? (
                    <Bug className="size-[70%] text-red-500" />
                  ) : isSnake ? (
                    <span
                      className={
                        isHead
                          ? "size-[78%] rounded-full bg-cyan-300"
                          : "size-[70%] rounded-full bg-cyan-400/80"
                      }
                    />
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex gap-2">
            <span className="flex-1 rounded bg-blue-600 py-1.5 text-center text-[11px] font-medium text-white">
              Resume
            </span>
            <span className="flex-1 rounded border border-editor-border py-1.5 text-center text-[11px] text-editor-foreground/70">
              Change Difficulty
            </span>
          </div>
          <p className="mt-2 text-center text-[10px] text-emerald-400">
            How to Play
          </p>
        </div>
      </div>
    </IdeShell>
  );
}
