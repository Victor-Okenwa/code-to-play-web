"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export function CheckoutSuccessToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shown = useRef(false);

  useEffect(() => {
    if (searchParams.get("checkout") !== "success" || shown.current) {
      return;
    }

    shown.current = true;
    toast.success("Payment received. Pro and play spaces update in a moment.");
    router.replace("/dashboard/subscription", { scroll: false });
  }, [router, searchParams]);

  return null;
}
