import type { Metadata } from "next";
import Link from "next/link";
import { DashboardPageShell } from "@/components/dashboard/page-shell";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MARKETPLACE_URL, OPEN_VSX_URL } from "@/lib/extension";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Extension — Code to Play",
  description: "Install Code to Play in VS Code or a VS Code fork.",
};

export default function DashboardExtensionPage() {
  return (
    <DashboardPageShell
      title="Extension"
      description="Install Code to Play where you write code. Plays, high scores, and stats stay in the editor — nothing is uploaded from here."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>VS Code Marketplace</CardTitle>
            <CardDescription>
              For Visual Studio Code and compatible editors that use the
              Marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={MARKETPLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants())}
            >
              Open Marketplace
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Open VSX</CardTitle>
            <CardDescription>
              For Cursor and other VS Code forks that install from Open VSX.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href={OPEN_VSX_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Open VSX
            </Link>
          </CardContent>
        </Card>
      </div>
    </DashboardPageShell>
  );
}
