"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Package,
  Boxes,
  Tags,
  Ruler,
  PackagePlus,
  ClipboardList,
  ArrowLeftRight,
  Barcode,
  Ellipsis,
} from "lucide-react";

import { AlertTriangle, XCircle, Wallet } from "lucide-react";

const tabs = [
  {
    name: "Products",
    href: "/dashboard/inventory/products",
    icon: Package,
  },
  {
    name: "Categories",
    href: "/dashboard/inventory/categories",
    icon: Boxes,
  },
  {
    name: "Brands",
    href: "/dashboard/inventory/brands",
    icon: Tags,
  },
  {
    name: "Units",
    href: "/dashboard/inventory/units",
    icon: Ruler,
  },
  {
    name: "Stock Entry",
    href: "/dashboard/inventory/stockentry",
    icon: PackagePlus,
  },
  {
    name: "Stock Adjustment",
    href: "/dashboard/inventory/stockadjustment",
    icon: ClipboardList,
  },
  {
    name: "Stock Transfer",
    href: "/dashboard/inventory/stocktransfer",
    icon: ArrowLeftRight,
  },
  {
    name: "Barcode Printing",
    href: "/dashboard/inventory/barcodeprinting",
    icon: Barcode,
  },
];

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Page Heading */}
      <div className="px-6 pt-1">
        <h1 className="text-2xl font-bold tracking-tight">Catlog</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage Your Product catlog 
        </p>
      </div>

      {/* Tabs */}
      <div className="mx-0 mt-1  border bg-background">
        <div className="flex items-center overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = pathname === tab.href;

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex h-10 items-center gap-2 border-b-2 px-5 text-sm font-medium whitespace-nowrap transition-colors
                  ${
                    active
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </Link>
            );
          })}

          <button className="ml-auto px-4 text-muted-foreground">
            <Ellipsis className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Page Content */}
     <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
        {/* Main Content */}
       <div className="order-1 lg:order-1 lg:col-span-10">{children}</div>

        {/* Common Right container */}
        <div className="order-2 mt-2 lg:order-2 lg:col-span-2">
          <div className=" bg-card p-2 h-full">
            <div className="space-y-4">
              {/* Inventory Overview */}
              <div className="rounded-xl border bg-background p-2 shadow-sm">
                <h3 className="mb-2 font-semibold">Inventory Overview</h3>

                <div className="space-y-2">
                  <StatCard
                    title="Total Products"
                    value="1,248"
                    icon={<Package className="h-4 w-4 text-violet-600" />}
                    bg="bg-violet-50"
                  />

                  <StatCard
                    title="In Stock"
                    value="1,032"
                    icon={<Boxes className="h-4 w-4 text-green-600" />}
                    bg="bg-green-50"
                  />

                  <StatCard
                    title="Low Stock"
                    value="128"
                    icon={<AlertTriangle className="h-5 w-5 text-orange-500" />}
                    bg="bg-orange-50"
                  />

                  <StatCard
                    title="Out of Stock"
                    value="88"
                    icon={<XCircle className="h-5 w-5 text-red-500" />}
                    bg="bg-red-50"
                  />
                </div>
              </div>

              {/* Stock Value */}
              <div className="rounded-lg border bg-background p-3 shadow-sm">
                <h3 className="text-sm font-semibold">Stock Value</h3>

                <p className="mt-2 text-[11px] text-muted-foreground">
                  Total Stock Value
                </p>

                <p className="text-xl font-bold text-blue-600">₹12,45,680</p>

                <div className="mt-3 grid grid-cols-2 border-t pt-3">
                  <div>
                    <p className="text-[11px] text-muted-foreground">
                      Categories
                    </p>

                    <p className="text-base font-semibold">18</p>
                  </div>

                  <div>
                    <p className="text-[11px] text-muted-foreground">Brands</p>

                    <p className="text-base font-semibold">36</p>
                  </div>
                </div>
              </div>
              {/* Low Stock */}
              <div className="rounded-xl border bg-background p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">Low Stock Products</h3>

                  <button className="text-sm font-medium text-blue-600 hover:underline">
                    View All
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <LowItem id="P001" name="Notebook (200 Pages)" qty="35" />

                    <LowItem
                      id="P002"
                      name="Mathematics Textbook Class 5"
                      qty="20"
                    />

                    <LowItem id="P003" name="School Tie" qty="12" />

                    <LowItem id="P004" name="Geometry Box" qty="8" />

                    <LowItem id="P005" name="Drawing Book" qty="6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  bg,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  bg: string;
}) {
  return (
    <div className={`flex items-center gap-3 rounded-lg ${bg} px-3 py-2`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow-sm">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] leading-none text-muted-foreground">
          {title}
        </p>

        <p className="mt-1 text-sm font-semibold leading-none">{value}</p>
      </div>
    </div>
  );
}

function LowItem({ id, name, qty }: { id: string; name: string; qty: string }) {
  return (
    <Link
      href={`/dashboard/inventory/products/${id}`}
      className="flex items-center justify-between rounded-md p-1 transition-colors hover:bg-muted/60"
    >
      <div className="flex min-w-0 items-center gap-1">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted">
          <Package className="h-4 w-4 text-muted-foreground" />
        </div>

        <span className="truncate text-xs font-medium" title={name}>
          {name}
        </span>
      </div>

      <span className="ml-2 shrink-0 rounded bg-orange-100 px-1 py-0.5 text-[11px] font-semibold text-orange-600">
        {qty}
      </span>
    </Link>
  );
}
