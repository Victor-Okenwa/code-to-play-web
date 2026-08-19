"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { startPolarCheckout } from "@/lib/polar-checkout";

export function SubscriptionProButton({ slug }: { slug: string }) {
  const [pending, setPending] = useState(false);

  return (
    <Button
      type="button"
      disabled={pending}
      onClick={() => {
        setPending(true);
        void startPolarCheckout({ slug }).catch((error: unknown) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Could not start checkout.",
          );
          setPending(false);
        });
      }}
    >
      Get Pro
    </Button>
  );
}
