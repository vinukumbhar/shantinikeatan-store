import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  Receipt,
  FileText,
  CreditCard,
} from "lucide-react";

const items = [
  {
    title: "Sales Reports",
    icon: Receipt,
    url: "/billing",
  },
  {
    title: "Inventory Reports",
    icon: FileText,
    url: "/invoices",
  },
  {
    title: "Purchase Reports",
    icon: CreditCard,
    url: "/payments",
  },
];

export function ReportsGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Reports</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="h-6 gap- px- text-sm ">
              <SidebarMenuButton asChild>
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