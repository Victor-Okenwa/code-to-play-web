"use client";

import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDashboardPageLabel } from "@/components/navigations/dashboard/links";
import { Profile } from "@/components/navigations/shared/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function DashboardHeader() {
  const pathname = usePathname();
  const pageLabel = getDashboardPageLabel(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur-sm">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <p className="truncate text-sm font-medium">{pageLabel}</p>
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <Button
          variant="default"
          nativeButton={false}
          render={<Link href="/docs?tab=installation" />}
        >
          <DownloadIcon className="size-4" />
          Install
        </Button>
        <Profile />
      </div>
    </header>
  );
}
