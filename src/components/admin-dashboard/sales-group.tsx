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
    title: "POS Billing",
    icon: Receipt,
    url: "/billing",
  },
  {
    title: "Invoices",
    icon: FileText,
    url: "/invoices",
  },
  {
    title: "Payments",
    icon: CreditCard,
    url: "/payments",
  },
];

export function SalesGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Sales & Billing</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} >
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