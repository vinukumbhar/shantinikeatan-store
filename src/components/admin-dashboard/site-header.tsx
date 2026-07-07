import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../common/mode-toggle";
import { ThemeSelector } from "../providers/theme-provider/ThemeSelector";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center px-4 lg:px-6">
        {/* Sidebar Toggle */}
        <SidebarTrigger className="-ml-1" />

        {/* Hide separator on mobile */}
        <Separator
          orientation="vertical"
          className="mx-2 hidden h-4 md:flex"
        />

        {/* Title */}
        <div className="flex flex-col">
          <h1 className="text-base font-semibold">
            Dashboard Overview
          </h1>

          {/* Hide subtitle on mobile */}
          <p className="hidden text-sm text-muted-foreground md:block">
            Welcome back Admin! Here is a quick overview of your dashboard.
          </p>
        </div>

        {/* Right Actions - Hide on mobile */}
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <ModeToggle />
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}