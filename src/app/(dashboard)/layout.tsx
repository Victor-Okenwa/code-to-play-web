import { AppSidebar } from "@/components/navigations/dashboard/app-sidebar";
import { DashboardHeader } from "@/components/navigations/dashboard/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireSession } from "@/lib/session";

export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  await requireSession();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
