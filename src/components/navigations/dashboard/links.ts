import type { LucideIcon } from "lucide-react";
import {
  ChartNoAxesColumnIcon,
  CreditCardIcon,
  FileTextIcon,
  Gamepad2Icon,
  LayoutDashboardIcon,
  PuzzleIcon,
  ScaleIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type DashboardNavGroup = {
  label: string;
  items: DashboardNavItem[];
};

export const DASHBOARD_NAV_GROUPS: DashboardNavGroup[] = [
  {
    label: "Play",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboardIcon },
      { href: "/dashboard/games", label: "Games", icon: Gamepad2Icon },
      {
        href: "/dashboard/analytics",
        label: "Analytics",
        icon: ChartNoAxesColumnIcon,
      },
    ],
  },
  {
    label: "Product",
    items: [
      { href: "/dashboard/extension", label: "Extension", icon: PuzzleIcon },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/account", label: "Account", icon: UserIcon },
      {
        href: "/dashboard/subscription",
        label: "Subscription",
        icon: CreditCardIcon,
      },
    ],
  },
];

export const DASHBOARD_LEGAL_NAV_GROUP: DashboardNavGroup = {
  label: "Legal",
  items: [
    { href: "/privacy", label: "Privacy Policy", icon: ShieldIcon },
    { href: "/legal", label: "Legal", icon: ScaleIcon },
    { href: "/refund", label: "Refund Policy", icon: FileTextIcon },
  ],
};

export function isDashboardNavActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getDashboardPageLabel(pathname: string) {
  for (const group of DASHBOARD_NAV_GROUPS) {
    for (const item of group.items) {
      if (isDashboardNavActive(pathname, item.href)) {
        return item.label;
      }
    }
  }

  return "Dashboard";
}
