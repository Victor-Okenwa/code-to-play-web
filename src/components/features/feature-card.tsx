import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Feature } from "@/lib/features";

import { FeatureVisual } from "./feature-visual";

export function FeatureCard({
  feature,
  index,
  variant,
}: {
  feature: Feature;
  index: number;
  variant: "preview" | "detail";
}) {
  const number = String(index + 1).padStart(2, "0");
  const wide =
    variant === "detail" &&
    (feature.id === "in-editor-games" || feature.id === "meaningful-lines");

  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:bg-card hover:ring-primary/35 hover:shadow-lg hover:shadow-primary/10">
      <div
        className={
          wide
            ? "flex flex-col gap-6"
            : "grid items-center gap-6 lg:grid-cols-2"
        }
      >
        <CardHeader className="gap-2">
          <p className="font-mono text-sm font-medium text-primary">{number}</p>
          <CardTitle className="text-xl font-bold tracking-tight">
            {feature.title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {feature.body}
          </CardDescription>
        </CardHeader>
        <CardContent className={wide ? "lg:px-(--card-spacing)" : undefined}>
          <FeatureVisual id={feature.id} variant={variant} />
        </CardContent>
      </div>
    </Card>
  );
}
