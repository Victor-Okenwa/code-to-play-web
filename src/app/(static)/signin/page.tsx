import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/static/page-shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sign in — Code to Play",
  description:
    "Code to Play keeps plays and high scores in your editor. You do not need an account to install or play.",
};

export default function SignInPage() {
  return (
    <PageShell
      title="Sign in"
      description="The extension stores plays, high scores, and stats locally in your editor. You do not need an account to install or play."
    >
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
        Web accounts are not part of Code to Play yet. Install the extension and
        start writing code — the status bar tracks lines until plays unlock.
      </p>
      <div>
        <Link
          href="/documentation?tab=installation"
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          Install Extension
        </Link>
      </div>
    </PageShell>
  );
}
