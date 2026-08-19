"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/assets/logo";
import {
  DASHBOARD_LEGAL_NAV_GROUP,
  DASHBOARD_NAV_GROUPS,
  type DashboardNavGroup,
  isDashboardNavActive,
} from "@/components/navigations/dashboard/links";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

function NavGroup({
  group,
  pathname,
  className,
}: {
  group: DashboardNavGroup;
  pathname: string;
  className?: string;
}) {
  return (
    <SidebarGroup className={className}>
      <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={isDashboardNavActive(pathname, item.href)}
                tooltip={item.label}
                render={<Link href={item.href} />}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="Code to Play"
              render={<Link href="/dashboard" />}
            >
              <Logo className="size-8" />
              <span className="font-accent text-sm tracking-wide uppercase group-data-[collapsible=icon]:hidden">
                Code to Play
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {DASHBOARD_NAV_GROUPS.map((group) => (
          <NavGroup key={group.label} group={group} pathname={pathname} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavGroup
          group={DASHBOARD_LEGAL_NAV_GROUP}
          pathname={pathname}
          className="p-0"
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
