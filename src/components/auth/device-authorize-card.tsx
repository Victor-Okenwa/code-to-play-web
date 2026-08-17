"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

type DeviceStatus = "form" | "approved" | "denied";

function deviceErrorMessage(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "error_description" in error &&
    typeof error.error_description === "string" &&
    error.error_description
  ) {
    return error.error_description;
  }

  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string" &&
    error.message
  ) {
    return error.message;
  }

  return "Could not complete device authorization. Try again.";
}

export function DeviceAuthorizeCard({
  initialUserCode,
}: {
  initialUserCode: string;
}) {
  const [userCode, setUserCode] = useState(initialUserCode);
  const [status, setStatus] = useState<DeviceStatus>("form");
  const [pending, setPending] = useState<"approve" | "deny" | null>(null);
  const claimedCode = useRef<string | null>(null);

  useEffect(() => {
    const code = userCode.trim();
    if (!code || claimedCode.current === code) {
      return;
    }

    let cancelled = false;

    async function claimDevice() {
      const { error } = await authClient.device({
        query: { user_code: code },
      });

      if (cancelled) {
        return;
      }

      if (error) {
        toast.error(deviceErrorMessage(error));
        return;
      }

      claimedCode.current = code;
    }

    void claimDevice();

    return () => {
      cancelled = true;
    };
  }, [userCode]);

  async function onApprove() {
    const code = userCode.trim();
    if (!code) {
      toast.error("Enter the code shown in your editor.");
      return;
    }

    setPending("approve");

    if (claimedCode.current !== code) {
      const { error: claimError } = await authClient.device({
        query: { user_code: code },
      });

      if (claimError) {
        setPending(null);
        toast.error(deviceErrorMessage(claimError));
        return;
      }

      claimedCode.current = code;
    }

    const { error } = await authClient.device.approve({
      userCode: code,
    });

    setPending(null);

    if (error) {
      toast.error(deviceErrorMessage(error));
      return;
    }

    setStatus("approved");
  }

  async function onDeny() {
    const code = userCode.trim();
    if (!code) {
      toast.error("Enter the code shown in your editor.");
      return;
    }

    setPending("deny");

    const { error } = await authClient.device.deny({
      userCode: code,
    });

    setPending(null);

    if (error) {
      toast.error(deviceErrorMessage(error));
      return;
    }

    setStatus("denied");
  }

  if (status === "approved") {
    return (
      <Card className="w-full max-w-md py-8">
        <CardHeader className="text-center">
          <CardTitle>Editor linked</CardTitle>
          <CardDescription>
            Return to your editor. You can close this tab.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (status === "denied") {
    return (
      <Card className="w-full max-w-md py-8">
        <CardHeader className="text-center">
          <CardTitle>Request denied</CardTitle>
          <CardDescription>
            This editor was not linked. You can close this tab.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md py-8">
      <CardHeader>
        <CardTitle>Link your editor</CardTitle>
        <CardDescription>
          Approve the code from Code to Play in your editor. Plays and high
          scores stay on your machine.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="user-code">Device code</Label>
          <Input
            id="user-code"
            value={userCode}
            onChange={(event) =>
              setUserCode(event.currentTarget.value.toUpperCase())
            }
            autoComplete="off"
            spellCheck={false}
            placeholder="ABCD2345"
            className="font-mono tracking-widest uppercase"
          />
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            className="flex-1"
            disabled={pending !== null}
            onClick={() => void onApprove()}
          >
            {pending === "approve" ? "Approving…" : "Approve"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            disabled={pending !== null}
            onClick={() => void onDeny()}
          >
            {pending === "deny" ? "Denying…" : "Deny"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
