import { AppSidebar } from "@/components/admin-dashboard/app-sidebar";

import { SectionCards } from "@/components/admin-dashboard/section-cards";
import { StatusCard } from "@/components/admin-dashboard/status-cards";
import { SiteHeader } from "@/components/admin-dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { StoreOverview } from "@/components/admin-dashboard/store-overview";
import { StoreSwitcher } from "@/components/admin-dashboard/store-switcher";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col">
            <div className="flex flex-col space-y-3 py-2">
              <StoreSwitcher />
              <SectionCards />
              <StatusCard />
              <StoreOverview />
            </div>
          </div>
          <footer className=" border-t bg-background px-6 py-4">
            <div className="flex flex-col items-center justify-between gap-2 text-sm text-muted-foreground md:flex-row">
              <p>
                © {new Date().getFullYear()}{" "}
                <span className="font-medium">Shantiniketan</span>. All rights
                reserved.
              </p>

              <p>
                Developed & Maintained by{" "}
                <span className="font-semibold text-foreground">
                  Intcon Store
                </span>
              </p>
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
