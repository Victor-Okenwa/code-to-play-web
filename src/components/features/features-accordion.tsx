"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FEATURES } from "@/lib/features";

import { FeatureVisual } from "./feature-visual";

export function FeaturesAccordion() {
  return (
    <Accordion
      defaultValue={[FEATURES[0].id]}
      multiple
      className="rounded-xl px-4 ring-1 ring-foreground/10"
    >
      {FEATURES.map((feature, index) => {
        const number = String(index + 1).padStart(2, "0");

        return (
          <AccordionItem key={feature.id} value={feature.id}>
            <AccordionTrigger className="items-center gap-3 py-4 hover:no-underline">
              <span className="flex min-w-0 items-baseline gap-3">
                <span className="font-mono text-sm font-medium text-primary">
                  {number}
                </span>
                <span className="font-heading text-base font-bold tracking-tight">
                  {feature.title}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-6">
              <p className="text-muted-foreground">{feature.body}</p>
              <FeatureVisual id={feature.id} variant="detail" />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
