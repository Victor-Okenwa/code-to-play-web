"use client";

import { CallStackMock } from "@/components/assets/call-stack-mock";
import { MergeConflictMock } from "@/components/assets/merge-conflict-mock";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { LISTED_GAMES, type ListedGame } from "@/lib/games";

const PRO_GAME_MOCKS = {
  "Call Stack": CallStackMock,
  "Merge Conflict": MergeConflictMock,
} as const;

type ProGameName = keyof typeof PRO_GAME_MOCKS;

function isProMockGame(
  game: ListedGame,
): game is ListedGame & { name: ProGameName } {
  return game.name in PRO_GAME_MOCKS;
}

const PRO_LISTED_GAMES = LISTED_GAMES.filter(isProMockGame);

export function ProGamesAccordion() {
  return (
    <Accordion
      defaultValue={[PRO_LISTED_GAMES[0]?.name ?? "Call Stack"]}
      className="rounded-xl px-4 ring-1 ring-foreground/10"
    >
      {PRO_LISTED_GAMES.map((game) => {
        const Mock = PRO_GAME_MOCKS[game.name];

        return (
          <AccordionItem key={game.name} value={game.name}>
            <AccordionTrigger className="items-center gap-3 py-4 hover:no-underline">
              <span className="flex min-w-0 items-center gap-2">
                <span className="font-heading text-base font-bold tracking-tight">
                  {game.name}
                </span>
                <Badge variant="default">Pro</Badge>
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-6">
              <p className="text-muted-foreground">{game.description}</p>
              <Mock className="w-full" />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
