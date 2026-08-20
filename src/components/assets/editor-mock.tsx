/** biome-ignore-all lint/suspicious/noArrayIndexKey: token spans in the mock buffer have no stable ids */
import type { ClassValue } from "clsx";
import { Play } from "lucide-react";

import { IdeShell } from "./ide-shell";

type Token = { t: string; c?: "kw" | "fn" | "str" | "num" | "cm" | "ty" };

const CODE: Token[][] = [
  [{ t: "export class ", c: "kw" }, { t: "GameObject ", c: "ty" }, { t: "{" }],
  [
    { t: "  private ", c: "kw" },
    { t: "x = " },
    { t: "0", c: "num" },
    { t: ";" },
  ],
  [
    { t: "  private ", c: "kw" },
    { t: "y = " },
    { t: "0", c: "num" },
    { t: ";" },
  ],
  [],
  [
    { t: "  constructor(public ", c: "kw" },
    { t: "name: " },
    { t: "string", c: "ty" },
    { t: ") {}" },
  ],
  [],
  [
    { t: "  " },
    { t: "move", c: "fn" },
    { t: "(dx: " },
    { t: "number", c: "ty" },
    { t: ", dy: " },
    { t: "number", c: "ty" },
    { t: ") {" },
  ],
  [{ t: "    this.x += dx;" }],
  [{ t: "    this.y += dy;" }],
  [{ t: "  }" }],
  [{ t: "}" }],
];

const tokenClass: Record<NonNullable<Token["c"]>, string> = {
  kw: "text-editor-token-kw",
  fn: "text-editor-token-fn",
  str: "text-editor-token-str",
  num: "text-editor-token-num",
  cm: "text-editor-token-cm italic",
  ty: "text-editor-token-ty",
};

export function EditorMock({ className }: { className?: ClassValue }) {
  return (
    <IdeShell
      className={className}
      windowTitle="game-object.ts — code-to-play"
      ariaLabel="Code to Play running inside VS Code: the Available Games sidebar lists Debug Snake, Whack-a-Bug, Call Stack, Merge Conflict, and Kernel Panic with 5 plays each, the editor shows game-object.ts with main.rs in another tab, and the status bar reads Code to Play (5)."
      statusRight={
        <span className="hidden sm:inline">TypeScript · Ln 12, Col 18</span>
      }
    >
      <div className="flex border-b border-editor-border bg-editor-panel/60 text-[11px]">
        <span className="border-t-2 border-primary bg-editor px-3 py-2 font-mono">
          game-object.ts
        </span>
        <span className="px-3 py-2 font-mono text-editor-foreground/45">
          main.rs
        </span>
      </div>

      <pre className="overflow-x-auto px-3 py-3 font-mono text-[11px] leading-[1.7] sm:text-[12px]">
        <code>
          {CODE.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-5 shrink-0 text-right text-editor-foreground/25 select-none">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {line.map((tok, j) => (
                  <span key={j} className={tok.c ? tokenClass[tok.c] : ""}>
                    {tok.t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>

      <div className="border-t border-editor-border bg-editor-panel px-3 py-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-widest text-editor-foreground/50 uppercase">
            Code to Play
          </span>
          <span className="rounded bg-primary/15 px-1.5 py-0.5 font-mono text-[10px] text-primary">
            5 plays
          </span>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <GameTile name="Debug Snake" plays={5} />
          <GameTile name="Whack-a-Bug" plays={5} />
          <GameTile name="Call Stack" plays={5} premium />
          <GameTile name="Merge Conflict" plays={5} premium />
          <GameTile name="Kernel Panic" plays={5} premium />
        </div>
      </div>
    </IdeShell>
  );
}

function GameTile({
  name,
  plays,
  premium = false,
}: {
  name: string;
  plays: number;
  premium?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-1 rounded-md border border-editor-border bg-editor px-2.5 py-2">
      <p className="truncate text-[11px] font-medium">
        {name}
        {premium ? (
          <span className="ml-1 text-[9px] tracking-wide text-primary uppercase">
            Pro
          </span>
        ) : null}
      </p>
      <span className="flex shrink-0 items-center gap-0.5 font-mono text-[10px] text-primary">
        <Play className="size-3 fill-primary" />
        {plays}
      </span>
    </div>
  );
}
