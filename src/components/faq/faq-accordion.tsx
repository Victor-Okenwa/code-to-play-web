"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/faq";

export function FaqAccordion({
  items,
  defaultOpenId,
}: {
  items: readonly FaqItem[];
  defaultOpenId?: string;
}) {
  return (
    <Accordion
      defaultValue={defaultOpenId ? [defaultOpenId] : undefined}
      className="rounded-xl px-4 ring-1 ring-foreground/10"
    >
      {items.map((item) => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className="items-center py-4 hover:no-underline">
            <span className="font-heading text-base font-bold tracking-tight">
              {item.question}
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <p className="text-muted-foreground">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
