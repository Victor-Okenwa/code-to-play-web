import type { Metadata } from "next";
import { DashboardPageShell } from "@/components/dashboard/page-shell";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LISTED_GAMES } from "@/lib/games";
import { FREE_GAMES, PRO_TRIAL_COPY, PRO_UPCOMING_GAMES } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Games — Code to Play",
  description: "Games you can unlock by writing code.",
};

export default function DashboardGamesPage() {
  return (
    <DashboardPageShell
      title="Games"
      description={`Unlock plays in your editor, then take a break in ${FREE_GAMES.join(" or ")}. Pro adds ${PRO_UPCOMING_GAMES} and extra play spaces, and starts with a ${PRO_TRIAL_COPY}.`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {LISTED_GAMES.map((game) => (
          <Card key={game.name}>
            <CardHeader>
              <CardTitle>{game.name}</CardTitle>
              <CardAction>
                <Badge variant={game.tier === "pro" ? "default" : "secondary"}>
                  {game.tier === "pro" ? "Pro" : "Free"}
                </Badge>
              </CardAction>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </DashboardPageShell>
  );
}
