import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
 Settings,
  FileText,
  CreditCard,
  Users
} from "lucide-react";

const items = [
  {
    title: "Users & Roles",
    icon: Users,
    url: "/users",
  },
  {
    title: "Store Settings",
    icon: Settings,
    url: "/invoices",
  },
  {
    title: "System Settings",
    icon: Settings,
    url: "/payments",
  },
];

export function SystemGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>System</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="h-6 gap- px- text-sm">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}