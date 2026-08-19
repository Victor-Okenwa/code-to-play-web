"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { startPolarCheckout } from "@/lib/polar-checkout";
import { PRO_TRIAL_COPY } from "@/lib/pricing";

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
      Start {PRO_TRIAL_COPY}
    </Button>
  );
}
