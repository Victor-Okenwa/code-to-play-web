import type { ReactNode } from "react";
import { DocsProse } from "@/components/docs/docs-prose";

export const LEGAL_UPDATED = "August 20, 2026";

export const POLAR_TERMS_URL = "https://polar.sh/legal/terms";
export const POLAR_PRIVACY_URL = "https://polar.sh/legal/privacy";

export function LegalArticle({ children }: { children: ReactNode }) {
  return (
    <article className="max-w-2xl">
      <p className="mb-8 text-sm text-muted-foreground">
        Last updated {LEGAL_UPDATED}.
      </p>
      <DocsProse>{children}</DocsProse>
    </article>
  );
}
