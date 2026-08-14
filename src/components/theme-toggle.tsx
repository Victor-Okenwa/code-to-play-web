"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";
  const tooltipLabel = isDark ? "Dark mode" : "Light mode";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className={cn(className)}
            disabled={!mounted}
            aria-label="Toggle theme"
            aria-pressed={mounted ? isDark : false}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {mounted && isDark ? (
              <Moon aria-hidden="true" />
            ) : (
              <Sun aria-hidden="true" />
            )}
          </Button>
        }
      />
      <TooltipContent>{mounted ? tooltipLabel : "Light mode"}</TooltipContent>
    </Tooltip>
  );
}
