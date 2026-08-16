import { FaqAccordion } from "@/components/faq/faq-accordion";
import { DOCS_FAQS } from "@/lib/faq";

export function FaqPanel() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-muted-foreground">
        How the extension works, what Pro adds, and where your stats live.
      </p>
      <FaqAccordion items={DOCS_FAQS} defaultOpenId={DOCS_FAQS[0].id} />
    </div>
  );
}
