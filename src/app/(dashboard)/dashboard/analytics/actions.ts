"use server";

import { revalidatePath } from "next/cache";
import { setAnalyticsOptIn } from "@/lib/analytics";
import { requireSession } from "@/lib/session";

export async function setAnalyticsOptInAction(optedIn: boolean) {
  const session = await requireSession();
  await setAnalyticsOptIn(session.user.id, optedIn);
  revalidatePath("/dashboard/analytics");
}
