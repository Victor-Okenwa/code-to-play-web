import type { Metadata } from "next";
import Image from "next/image";
import { DashboardPageShell } from "@/components/dashboard/page-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = {
  title: "Account — Code to Play",
  description: "Your GitHub account on Code to Play.",
};

export default async function DashboardAccountPage() {
  const session = await requireSession();
  const { user } = session;

  return (
    <DashboardPageShell
      title="Account"
      description="Signed in with GitHub. This account is for the web app — plays still live in your editor."
    >
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          {user.image ? (
            <Image
              src={user.image}
              alt=""
              width={64}
              height={64}
              className="size-16 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-full bg-muted text-lg font-medium">
              {user.name.slice(0, 1).toUpperCase()}
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Connected through GitHub. Use the profile menu to sign out.
          </p>
        </CardContent>
      </Card>
    </DashboardPageShell>
  );
}
