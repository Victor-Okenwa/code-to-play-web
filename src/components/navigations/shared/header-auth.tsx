"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export function HeaderAuth({ onNavigate }: { onNavigate?: () => void }) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="h-8 w-20 animate-pulse rounded-lg bg-muted" />;
  }

  if (session) {
    return null;
  }

  return (
    <Button
      variant="secondary"
      nativeButton={false}
      render={<Link href="/signin" />}
      onClick={onNavigate}
    >
      Sign in
    </Button>
  );
}
