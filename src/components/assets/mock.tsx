/** biome-ignore-all lint/suspicious/noArrayIndexKey: token spans in the mock buffer have no stable ids */
import type { ClassValue } from "clsx";
import {
  Bug,
  CircleUser,
  CircleX,
  Files,
  Folder,
  GitBranch,
  Play,
  Puzzle,
  Search,
  Settings,
  TriangleAlert,
} from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Logo } from "./logo";

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

function ActivityIcon({
  children,
  active = false,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "relative flex w-full items-center justify-center py-2",
        active
          ? "text-editor-foreground before:absolute before:inset-y-1 before:left-0 before:w-0.5 before:bg-editor-foreground"
          : "text-editor-foreground/45",
      )}
    >
      {children}
    </span>
  );
}

export function EditorMock({ className }: { className?: ClassValue }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-editor-border bg-editor text-editor-foreground shadow-2xl shadow-black/20",
        className,
      )}
      role="img"
      aria-label="Code to Play running inside VS Code: the Available Games sidebar lists Debug Snake and Whack-a-Bug with 5 plays each, the editor shows game-object.ts with main.rs in another tab, and the status bar reads Code to Play (5)."
    >
      <div className="flex items-center gap-2 border-b border-editor-border bg-editor-panel px-3 py-2">
        <span className="size-2.5 rounded-full bg-[oklch(0.7_0.16_25)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.82_0.14_85)]" />
        <span className="size-2.5 rounded-full bg-[oklch(0.75_0.15_145)]" />
        <span className="ml-3 font-mono text-[11px] text-editor-foreground/60">
          game-object.ts — code-to-play
        </span>
      </div>

      <div className="grid grid-cols-[44px_1fr] sm:grid-cols-[44px_200px_1fr]">
        <div className="flex flex-col items-center self-stretch border-r border-editor-border bg-editor-panel py-1">
          <ActivityIcon>
            <Files className="size-4.5" />
          </ActivityIcon>
          <ActivityIcon>
            <Search className="size-4.5" />
          </ActivityIcon>
          <ActivityIcon>
            <GitBranch className="size-4.5" />
          </ActivityIcon>
          <ActivityIcon>
            <Bug className="size-4.5" />
          </ActivityIcon>
          <ActivityIcon>
            <Puzzle className="size-4.5" />
          </ActivityIcon>
          <ActivityIcon active>
            <Logo className="size-4.5" />
          </ActivityIcon>
          <div className="mt-auto flex w-full flex-col">
            <ActivityIcon>
              <CircleUser className="size-4.5" />
            </ActivityIcon>
            <ActivityIcon>
              <Settings className="size-4.5" />
            </ActivityIcon>
          </div>
        </div>

        <div className="hidden flex-col gap-2 self-stretch border-r border-editor-border px-2.5 py-3 font-mono text-[11px] text-editor-foreground/70 sm:flex">
          <span className="tracking-widest text-editor-foreground/40 uppercase">
            Available Games
          </span>
          <span className="flex items-center gap-1.5">
            <Play className="size-3 fill-primary text-primary" />
            Plays remaining: 5
          </span>
          <span className="mt-1 flex items-center gap-1 text-editor-foreground/50">
            <Folder className="size-3" />
            Free Games
          </span>
          <GameRow name="Debug Snake" plays={5} />
          <GameRow name="Whack-a-Bug" plays={5} />
          <div className="mt-auto flex flex-col gap-1.5 pt-3 text-editor-foreground/50">
            <span>View Statistics</span>
            <span>Export Statistics</span>
          </div>
        </div>

        <div className="min-w-0">
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
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-editor-border bg-editor-panel px-2 py-1 font-mono text-[11px] text-editor-foreground/70">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <GitBranch className="size-3" /> main
          </span>
          <span className="flex items-center gap-1">
            <CircleX className="size-3" /> 0
            <TriangleAlert className="size-3" /> 0
          </span>
        </span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded-[2px] bg-primary" />
            Code to Play (5)
          </span>
          <span className="hidden sm:inline">TypeScript · Ln 12, Col 18</span>
        </span>
      </div>
    </div>
  );
}

function GameRow({ name, plays }: { name: string; plays: number }) {
  return (
    <div className="flex items-center justify-between gap-1 pl-3">
      <span className="truncate text-editor-foreground">{name}</span>
      <span className="flex shrink-0 items-center gap-0.5 text-primary">
        <Play className="size-3 fill-primary" />
        {plays}
      </span>
    </div>
  );
}

function GameTile({ name, plays }: { name: string; plays: number }) {
  return (
    <div className="flex items-center justify-between gap-1 rounded-md border border-editor-border bg-editor px-2.5 py-2">
      <p className="truncate text-[11px] font-medium">{name}</p>
      <span className="flex shrink-0 items-center gap-0.5 font-mono text-[10px] text-primary">
        <Play className="size-3 fill-primary" />
        {plays}
      </span>
    </div>
  );
}
