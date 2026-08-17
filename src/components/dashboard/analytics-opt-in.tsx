"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "ctp-analytics-opt-in";

export function AnalyticsOptIn() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEnabled(window.localStorage.getItem(STORAGE_KEY) === "1");
    setReady(true);
  }, []);

  function onCheckedChange(checked: boolean) {
    setEnabled(checked);
    window.localStorage.setItem(STORAGE_KEY, checked ? "1" : "0");
  }

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Local progress monitoring</CardTitle>
        <CardDescription>
          Permission stays in this browser. Charts will show here only after the
          extension can share opted-in stats — nothing is sent today.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between gap-4 rounded-lg border px-3 py-2">
          <Label htmlFor="analytics-opt-in">
            Allow local progress monitoring
          </Label>
          <Switch
            id="analytics-opt-in"
            checked={enabled}
            disabled={!ready}
            onCheckedChange={onCheckedChange}
          />
        </div>
        {enabled ? (
          <p className="text-sm text-muted-foreground">
            Permission granted. No play or line data is available on the web yet
            — keep writing in the editor; the status bar still tracks unlocks
            locally.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Analytics stay off. High scores and play counts remain only in your
            editor.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
