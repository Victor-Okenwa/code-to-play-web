import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FeatureCard } from "@/components/features/feature-card";
import { FeaturesHeading } from "@/components/home/features-heading";
import { buttonVariants } from "@/components/ui/button";
import { HOME_FEATURES } from "@/lib/features";
import { cn } from "@/lib/utils";

export function Features() {
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <FeaturesHeading />

        <ul className="flex flex-col gap-4">
          {HOME_FEATURES.map((feature, index) => (
            <li key={feature.id}>
              <FeatureCard feature={feature} index={index} variant="preview" />
            </li>
          ))}
        </ul>

        <div className="flex justify-center">
          <Link
            href="/features"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            See all features
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
