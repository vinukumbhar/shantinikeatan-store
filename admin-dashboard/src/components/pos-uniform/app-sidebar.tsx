"use client";

import * as React from "react";

import { NavUser } from "@/components/pos-uniform/nav-user";
import { TeamSwitcher } from "@/components/pos-uniform/team-switcher";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { BillingSidebar } from "@/components/pos-uniform/BillingSidebar";
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
} from "lucide-react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatar.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: "/logo/shantinikeatan_logo.png",
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <AudioLinesIcon />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <TerminalIcon />,
      plan: "Free",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}

      {/* SIDEBAR DASHBOARD HEADER */}
      <div className="w-full max-w-[390px] flex items-center gap-3 px-1 py-1">
             
        {/* LOGO IMAGE WITHOUT BACKGROUND OR AVATAR BORDERS */}
        <div className="relative h-15 w-15 shrink-0">
          <Image
           src="/logo/logo.jpg" // Replace with your actual image path or public folder asset
            alt="Store Logo"
            fill
            sizes="40px"
            priority
            className="object-contain"
          />
        </div>

        {/* TWO-LINE METADATA TEXT BLOCK */}
        <div className="flex flex-col min-w-0 space-y-0.5">
          <h3 className="text-sm font-bold text-foreground tracking-tight truncate leading-tight">
            Shantinikeatn
          </h3>
          <p className="text-[11px] font-medium text-muted-foreground truncate leading-none">
            Uniform Store
          </p>
        </div>
      </div>

      <SidebarContent>
        <BillingSidebar />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
