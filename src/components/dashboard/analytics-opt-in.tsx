"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { setAnalyticsOptInAction } from "@/app/(dashboard)/dashboard/analytics/actions";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function AnalyticsOptIn({ optedIn }: { optedIn: boolean }) {
  const [enabled, setEnabled] = useState(optedIn);
  const [pending, startTransition] = useTransition();

  function onCheckedChange(checked: boolean) {
    setEnabled(checked);
    startTransition(async () => {
      try {
        await setAnalyticsOptInAction(checked);
        toast.success(
          checked
            ? "Progress monitoring is on. The signed-in editor will send a snapshot after a play, an unlock, or within 15 minutes."
            : "Progress monitoring is off. The snapshot on this account was deleted.",
        );
      } catch {
        setEnabled(!checked);
        toast.error("Could not update analytics preference.");
      }
    });
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border px-3 py-2">
      <Label htmlFor="analytics-opt-in">Allow progress monitoring</Label>
      <Switch
        id="analytics-opt-in"
        checked={enabled}
        disabled={pending}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
