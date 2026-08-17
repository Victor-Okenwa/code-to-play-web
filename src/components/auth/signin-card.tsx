"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { GitHubMark } from "@/components/assets/github-mark";
import { Logo } from "@/components/assets/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export function SignInCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, setPending] = useState(false);
  const errorToastShown = useRef(false);

  useEffect(() => {
    if (searchParams.get("error") !== "1" || errorToastShown.current) {
      return;
    }

    errorToastShown.current = true;
    toast.error("GitHub sign-in did not complete. Try again.");
    router.replace("/signin", { scroll: false });
  }, [router, searchParams]);

  async function signInWithGitHub() {
    setPending(true);

    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      newUserCallbackURL: "/dashboard?welcome=1",
      errorCallbackURL: "/signin?error=1",
    });

    if (error) {
      setPending(false);
      toast.error(
        error.message ?? "GitHub sign-in did not complete. Try again.",
      );
    }
  }

  return (
    <Card className="w-full max-w-md py-8">
      <CardHeader className="items-center text-center">
        <Logo className="size-10" />
        <CardTitle className="font-heading text-2xl font-bold tracking-tight">
          Sign in to Code to Play
        </CardTitle>
        <CardDescription className="max-w-sm text-pretty">
          Continue with GitHub. Plays and high scores still live in your editor
          — this account is for the web app only.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          type="button"
          size="lg"
          className="w-full"
          disabled={pending}
          onClick={signInWithGitHub}
        >
          <GitHubMark className="size-4" />
          {pending ? "Redirecting…" : "Continue with GitHub"}
        </Button>
      </CardContent>
    </Card>
  );
}
