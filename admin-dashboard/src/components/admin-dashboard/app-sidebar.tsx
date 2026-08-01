


"use client";

import * as React from "react";
import Image from "next/image";

import { NavSecondary } from "@/components/admin-dashboard/nav-secondary";
import { NavUser } from "@/components/admin-dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  CameraIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileIcon,
} from "lucide-react";

import { ManagementGroup } from "./management-group";
import { ReportsGroup } from "./reports-group";
import { SalesGroup } from "./sales-group";
import { SystemGroup } from "./system-group";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: ListIcon,
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartBarIcon,
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderIcon,
    },
    {
      title: "Team",
      url: "#",
      icon: UsersIcon,
    },
  ],

  navClouds: [
    {
      title: "Capture",
      url: "#",
      icon: CameraIcon,
      isActive: true,
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      url: "#",
      icon: FileTextIcon,
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      url: "#",
      icon: FileTextIcon,
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2Icon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: CircleHelpIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],

  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: FileChartColumnIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-14 data-[slot=sidebar-menu-button]:p-2"
            >
              <a href="#" className="flex items-center gap-3">
                <Image
                  src="/logo/logo.jpg"
                  alt="Shantiniketan Logo"
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                />

                <div className="flex flex-col leading-tight">
                  <span className="text-lg font-semibold">
                    Shantiniketan
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Store Department
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Dashboard Button */}
        <div className="px-2">
          <SidebarMenuButton
            asChild
            className="mt-3 h-12 rounded-xl justify-start gap-3 bg-blue-100 text-blue-700 hover:bg-blue-200"
          >
            <a href="#">
              <LayoutDashboardIcon className="size-5" />
              <span className="font-semibold">Dashboard</span>
            </a>
          </SidebarMenuButton>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ManagementGroup />
        <SalesGroup />
        <ReportsGroup />
        <SystemGroup />

        <NavSecondary
          items={data.navSecondary}
          className="mt-auto"
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}