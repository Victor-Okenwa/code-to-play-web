"use client";

import { useRouter } from "next/navigation";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  type DocTab,
  isDocTab,
  MARKETPLACE_URL,
  OPEN_VSX_URL,
  UNLOCK_LINES,
  UNLOCK_PLAYS,
} from "@/lib/extension";
import { DOCS_FAQS } from "@/lib/faq";

export function DocumentationTabs({ defaultTab }: { defaultTab: DocTab }) {
  const router = useRouter();

  return (
    <Tabs
      defaultValue={defaultTab}
      onValueChange={(value) => {
        if (typeof value === "string" && isDocTab(value)) {
          router.replace(`/documentation?tab=${value}`, { scroll: false });
        }
      }}
      className="gap-6"
    >
      <TabsList variant="line" className="w-full justify-start overflow-x-auto">
        <TabsTrigger value="installation">Install</TabsTrigger>
        <TabsTrigger value="usage">Play</TabsTrigger>
        <TabsTrigger value="tracking">Tracking</TabsTrigger>
        <TabsTrigger value="faq">FAQ</TabsTrigger>
      </TabsList>

      <TabsContent value="installation" className="space-y-6">
        <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed">
          <li>Open VS Code, Cursor, or another VS Code-compatible editor.</li>
          <li>
            Open the Extensions view with{" "}
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">
              Ctrl+Shift+X
            </kbd>{" "}
            or{" "}
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-xs">
              Cmd+Shift+X
            </kbd>
            .
          </li>
          <li>
            Search for <span className="font-medium">Code to Play</span> and
            click Install.
          </li>
          <li>Reload the editor if prompted.</li>
        </ol>
        <p className="text-sm text-muted-foreground">
          Direct links:{" "}
          <a
            href={MARKETPLACE_URL}
            className="underline underline-offset-3 hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            VS Code Marketplace
          </a>{" "}
          for VS Code, or{" "}
          <a
            href={OPEN_VSX_URL}
            className="underline underline-offset-3 hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open VSX
          </a>{" "}
          for Cursor and other forks.
        </p>
      </TabsContent>

      <TabsContent value="usage" className="space-y-4 text-sm leading-relaxed">
        <p>
          Write real code in a supported file. Meaningful lines count toward
          unlocks — comments, blanks, and brace-only lines do not.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Status bar while locked:{" "}
            <span className="font-mono text-xs">450/{UNLOCK_LINES} lines</span>
          </li>
          <li>
            Status bar when unlocked: remaining plays, default{" "}
            <span className="font-mono text-xs">{UNLOCK_PLAYS} plays</span>
          </li>
          <li>
            Open the Code to Play view in the Activity Bar, pick a game, and
            spend a play.
          </li>
        </ul>
      </TabsContent>

      <TabsContent
        value="tracking"
        className="space-y-4 text-sm leading-relaxed"
      >
        <p>
          Default unlock is {UNLOCK_LINES} meaningful lines for {UNLOCK_PLAYS}{" "}
          plays, shared across every game. High scores, stats, and play counts
          stay on your machine — the extension does not send telemetry.
        </p>
        <Accordion>
          <AccordionItem value="counted">
            <AccordionTrigger>What counts as a line?</AccordionTrigger>
            <AccordionContent>
              <p>
                Function and class declarations, assignments, control flow,
                method calls, and import or export statements. Comments, JSDoc,
                blank lines, and lines that are only braces are skipped.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="languages">
            <AccordionTrigger>Which languages are tracked?</AccordionTrigger>
            <AccordionContent>
              <p>
                JavaScript, TypeScript, Python, Java, C, C++, C#, Go, Rust, PHP,
                Ruby, Swift, Kotlin, and more. If a file type is not tracked,
                the status bar will not move for that file.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="offline">
            <AccordionTrigger>Does it work offline?</AccordionTrigger>
            <AccordionContent>
              <p>
                Yes. Games, scoring, and unlocks all run locally in the editor.
                You do not need an account or a network connection to play.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <TabsContent value="faq" className="space-y-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          How the extension works, what Pro adds, and where your stats live.
        </p>
        <FaqAccordion items={DOCS_FAQS} defaultOpenId={DOCS_FAQS[0].id} />
      </TabsContent>
    </Tabs>
  );
}
