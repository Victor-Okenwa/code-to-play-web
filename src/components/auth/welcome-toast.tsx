"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function WelcomeToast() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shown = useRef(false);

  useEffect(() => {
    if (searchParams.get("welcome") !== "1" || shown.current) {
      return;
    }

    shown.current = true;
    toast.success("Welcome to Code to Play");
    router.replace("/dashboard", { scroll: false });
  }, [router, searchParams]);

  return null;
}
