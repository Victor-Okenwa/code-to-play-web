/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { Bug, Files, GitBranch, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import type { ClassValue } from "clsx";

type Token = { t: string; c?: "kw" | "fn" | "str" | "num" | "cm" | "ty" };

const CODE: Token[][] = [
    [{ t: "export function ", c: "kw" }, { t: "countMeaningfulLines", c: "fn" }, { t: "(" }, { t: "doc", c: "ty" }, { t: ": TextDocument) {" }],
    [{ t: "  const lines = doc." }, { t: "getText", c: "fn" }, { t: "()." }, { t: "split", c: "fn" }, { t: "(" }, { t: "/\\r?\\n/", c: "str" }, { t: ");" }],
    [{ t: "  let total = " }, { t: "0", c: "num" }, { t: ";" }],
    [],
    [{ t: "  for (const line of lines) {" }],
    [{ t: "    const trimmed = line." }, { t: "trim", c: "fn" }, { t: "();" }],
    [{ t: "    if (!trimmed) continue;", c: "cm" }],
    [{ t: "    if (" }, { t: "isComment", c: "fn" }, { t: "(trimmed) || " }, { t: "isBrace", c: "fn" }, { t: "(trimmed)) continue;" }],
    [{ t: "    total += " }, { t: "1", c: "num" }, { t: ";" }],
    [{ t: "  }" }],
    [],
    [{ t: "  return total;", c: "kw" }],
    [{ t: "}" }],
];

const tokenClass: Record<NonNullable<Token["c"]>, string> = {
    kw: "text-[oklch(0.75_0.11_300)]",
    fn: "text-[oklch(0.82_0.11_90)]",
    str: "text-[oklch(0.78_0.11_140)]",
    num: "text-[oklch(0.8_0.1_150)]",
    cm: "text-[oklch(0.62_0.02_150)] italic",
    ty: "text-[oklch(0.78_0.09_210)]",
};

export function EditorMock({ className }: { className?: ClassValue }) {
    return (
        <div
            className={cn(
                "overflow-hidden rounded-xl border border-editor-border bg-editor text-editor-foreground shadow-2xl shadow-black/20",
                className,
            )}
            role="img"
            aria-label="Code to Play running inside VS Code: the editor shows a line-counting function, the status bar reads 450 of 1000 lines, and the extension panel lists Debug Snake and Whack-a-Bug."
        >
            {/* title bar */}
            <div className="flex items-center gap-2 border-b border-editor-border bg-editor-panel px-3 py-2">
                <span className="size-2.5 rounded-full bg-[oklch(0.7_0.16_25)]" />
                <span className="size-2.5 rounded-full bg-[oklch(0.82_0.14_85)]" />
                <span className="size-2.5 rounded-full bg-[oklch(0.75_0.15_145)]" />
                <span className="ml-3 font-mono text-[11px] text-editor-foreground/60">
                    tracker.ts — code-to-play
                </span>
            </div>

            <div className="grid grid-cols-[44px_1fr] sm:grid-cols-[44px_150px_1fr]">
                {/* activity bar */}
                <div className="flex flex-col items-center gap-4 border-r border-editor-border bg-editor-panel py-3">
                    <Files className="size-4.5 text-editor-foreground/45" />
                    <Search className="size-4.5 text-editor-foreground/45" />
                    <GitBranch className="size-4.5 text-editor-foreground/45" />
                    <span className="relative rounded-md bg-primary/15 p-1 ring-1 ring-primary/40">
                        <Logo className="size-4.5" />
                    </span>
                    <Settings className="mt-auto size-4.5 text-editor-foreground/45" />
                </div>

                {/* explorer */}
                <div className="hidden flex-col gap-1.5 border-r border-editor-border px-3 py-3 font-mono text-[11px] text-editor-foreground/55 sm:flex">
                    <span className="tracking-widest text-editor-foreground/40 uppercase">
                        Explorer
                    </span>
                    <span>src/</span>
                    <span className="pl-3 text-primary">tracker.ts</span>
                    <span className="pl-3">games/</span>
                    <span className="pl-6">snake.ts</span>
                    <span className="pl-6">whack.ts</span>
                    <span className="pl-3">status-bar.ts</span>
                    <span>package.json</span>
                </div>

                {/* editor + panel */}
                <div className="min-w-0">
                    <div className="flex border-b border-editor-border bg-editor-panel/60 text-[11px]">
                        <span className="border-t-2 border-primary bg-editor px-3 py-2 font-mono">
                            tracker.ts
                        </span>
                        <span className="px-3 py-2 font-mono text-editor-foreground/45">
                            snake.ts
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
                            <GameTile name="Debug Snake" score="High score 1,240" />
                            <GameTile name="Whack-a-Bug" score="High score 86" />
                        </div>
                    </div>
                </div>
            </div>

            {/* status bar */}
            <div className="flex items-center justify-between bg-primary px-3 py-1.5 font-mono text-[11px] text-primary-foreground">
                <span className="flex items-center gap-1.5">
                    <Bug className="size-3" /> 450/1000 lines
                </span>
                <span className="hidden sm:inline">TypeScript · UTF-8 · Ln 12, Col 18</span>
            </div>
        </div>
    );
}

function GameTile({ name, score }: { name: string; score: string }) {
    return (
        <div className="rounded-md border border-editor-border bg-editor px-2.5 py-2">
            <p className="text-[11px] font-medium">{name}</p>
            <p className="mt-0.5 font-mono text-[10px] text-editor-foreground/45">
                {score}
            </p>
        </div>
    );
}