import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Package,
  Boxes,
  ShoppingCart,
  Users,
  Truck,
} from "lucide-react";

const items = [
  {
    title: "Products",
    icon: Package,
    url: "/products",
  },
  {
    title: "Inventory",
    icon: Boxes,
    url: "/inventory",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    url: "/orders",
  },
  {
    title: "Customers",
    icon: Users,
    url: "/customers",
  },
  {
    title: "Suppliers",
    icon: Truck,
    url: "/suppliers",
  },
];

export function ManagementGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Management</SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="h-6 gap- px- text-sm ">
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