"use client";

import { useRouter } from "next/navigation";

import { FaqPanel } from "@/components/docs/panels/faq";
import { GettingStartedPanel } from "@/components/docs/panels/getting-started";
import { InstallationPanel } from "@/components/docs/panels/installation";
import { OverviewPanel } from "@/components/docs/panels/overview";
import { QuickStartPanel } from "@/components/docs/panels/quick-start";
import { TroubleshootingPanel } from "@/components/docs/panels/troubleshooting";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DOC_TABS, type DocTab, isDocTab } from "@/lib/docs";

export function DocsShell({ defaultTab }: { defaultTab: DocTab }) {
  const router = useRouter();
  const current =
    DOC_TABS.find((item) => item.id === defaultTab) ?? DOC_TABS[0];

  return (
    <SidebarProvider className="min-h-0">
      <Tabs
        defaultValue={defaultTab}
        orientation="vertical"
        onValueChange={(value, eventDetails) => {
          if (eventDetails.reason !== "none") {
            return;
          }
          if (typeof value === "string" && isDocTab(value)) {
            router.replace(`/docs?tab=${value}`, { scroll: false });
          }
        }}
        className="w-full gap-6 max-md:flex-col md:items-start"
      >
        <Sidebar
          collapsible="none"
          className="h-auto w-full rounded-xl border bg-sidebar md:sticky md:top-20 md:w-(--sidebar-width)"
        >
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Documentation</SidebarGroupLabel>
              <SidebarGroupContent>
                <TabsList
                  variant="line"
                  className="h-auto w-full justify-start rounded-none bg-transparent p-0"
                >
                  <SidebarMenu className="flex-row flex-nowrap overflow-x-auto md:flex-col md:overflow-visible">
                    {DOC_TABS.map((item) => (
                      <SidebarMenuItem key={item.id} className="shrink-0">
                        <SidebarMenuButton
                          isActive={defaultTab === item.id}
                          className="w-auto md:w-full"
                          render={
                            <TabsTrigger
                              value={item.id}
                              className="after:hidden data-active:shadow-none"
                            />
                          }
                        >
                          {item.label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </TabsList>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="min-w-0 bg-transparent md:peer-data-[variant=inset]:m-0">
          <header className="mb-6 space-y-2">
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Documentation
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {current.description}
            </p>
          </header>

          <TabsContent value="overview">
            <OverviewPanel />
          </TabsContent>
          <TabsContent value="getting-started">
            <GettingStartedPanel />
          </TabsContent>
          <TabsContent value="installation">
            <InstallationPanel />
          </TabsContent>
          <TabsContent value="quick-start">
            <QuickStartPanel />
          </TabsContent>
          <TabsContent value="troubleshooting">
            <TroubleshootingPanel />
          </TabsContent>
          <TabsContent value="faq">
            <FaqPanel />
          </TabsContent>
        </SidebarInset>
      </Tabs>
    </SidebarProvider>
  );
}
