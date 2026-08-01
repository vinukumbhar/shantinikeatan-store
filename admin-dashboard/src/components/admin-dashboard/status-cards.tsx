"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  IndianRupee,
  ChartNoAxesColumnIncreasing,
  Handbag,
  ChartColumnBig,
  ChartPie,
  Building2,
  ArrowRight,
  Store,
  Shirt,
  BookOpen,
} from "lucide-react";
import { Button } from "../ui/button";

export function StatusCard() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="w-full max-w-md rounded-2xl border shadow-sm">
        <CardContent className="p-2.5">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
              <Building2 className="h-6 w-6 text-white" />
            </div>

            <h2 className="text-xl font-semibold text-green-700 leading-none">
              School Store{" "}
              <span className="text-base font-medium text-green-600">
                (Internal)
              </span>
            </h2>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3">
            <div className="border-r px-3 text-center">
              <p className="text-xs text-muted-foreground">Sales (Today)</p>
              <div className="mt-1 flex items-center justify-center text-2xl font-bold">
                <IndianRupee className="h-5 w-5 shrink-0 text-black dark:text-white" />
                32,450
              </div>
            </div>

            <div className="border-r px-3 text-center">
              <p className="text-xs text-muted-foreground">Orders</p>
              <p className="mt-1 text-2xl font-bold">18</p>
            </div>

            <div className="px-3 text-center">
              <p className="text-xs text-muted-foreground">Low Stock Items</p>
              <p className="mt-2 text-2xl font-bold text-red-500">12</p>
            </div>
          </div>

          {/* Button */}
          <Button
            className="mt-8 w-full rounded-lg bg-green-100 text-green-700 hover:bg-green-200"
            variant="secondary"
          >
            View School Store Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md rounded-2xl border shadow-sm">
        <CardContent className="p-2.5">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
              <Shirt className="h-6 w-6 text-white" />
            </div>

            <h2 className="text-xl font-semibold text-blue-700 leading-none">
              Uniform Store
            </h2>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3">
            <div className="border-r px-3 text-center">
              <p className="text-xs text-muted-foreground">Sales (Today)</p>
              <div className="mt-1 flex items-center justify-center text-2xl font-bold">
                <IndianRupee className="h-5 w-5 shrink-0 text-black dark:text-white" />
                32,450
              </div>
            </div>

            <div className="border-r px-3 text-center">
              <p className="text-xs text-muted-foreground">Orders</p>
              <p className="mt-1 text-2xl font-bold">18</p>
            </div>

            <div className="px-3 text-center">
              <p className="whitespace-nowrap text-xs text-muted-foreground">
                Low Stock Items
              </p>
              <p className="mt- text-2xl font-bold text-red-500">12</p>
            </div>
          </div>

          {/* Button */}
          <Button
            className="mt-8 w-full rounded-lg bg-blue-100 text-blue-700 hover:bg-green-200"
            variant="secondary"
          >
            View Uniform Store Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md rounded-2xl border shadow-sm">
        <CardContent className="p-2.5">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>

            <h2 className="text-xl font-semibold text-orange-700 leading-none">
              Book Store
            </h2>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-3">
            <div className="border-r px-3 text-center">
              <p className="text-xs text-muted-foreground">Sales (Today)</p>
              <div className="mt-1 flex items-center justify-center text-2xl font-bold">
                <IndianRupee className="h-5 w-5 shrink-0 text-black dark:text-white" />
                32,450
              </div>
            </div>

            <div className="border-r px-3 text-center">
              <p className="text-xs text-muted-foreground">Orders</p>
              <p className="mt-1 text-2xl font-bold">18</p>
            </div>

            <div className="px-3 text-center">
              <p className="whitespace-nowrap text-xs text-muted-foreground">
                Low Stock Items
              </p>
              <p className="mt- text-2xl font-bold text-red-500">12</p>
            </div>
          </div>

          {/* Button */}
          <Button
            className="mt-8 w-full rounded-lg bg-orange-100 text-orange-700 hover:bg-orange-200"
            variant="secondary"
          >
            View Book Store Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
     <Card className="rounded-2xl shadow-sm">


<CardHeader className="flex flex-row items-center justify-between px-6 ">
  <CardTitle className="m-0 text-sm font-semibold leading-none">
    Recent Orders
  </CardTitle>

  <Button
    variant="ghost"
    className="h-6 rounded-full px-2 text-[11px] font-semibold text-blue-700 hover:bg-blue-100"
  >
    View All
  </Button>
</CardHeader>

<CardContent className="px-6 ">
  {[
    {
      id: "ORD-10023",
      store: "School Store",
      amount: "₹2,450",
      status: "Completed",
      icon: Building2,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "ORD-10022",
      store: "Uniform Store",
      amount: "₹5,680",
      status: "Processing",
      icon: Shirt,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "ORD-10021",
      store: "Book Store",
      amount: "₹1,340",
      status: "Pending",
      icon: BookOpen,
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: "ORD-10020",
      store: "Uniform Store",
      amount: "₹2,890",
      status: "Completed",
      icon: Shirt,
      color: "bg-green-100 text-green-700",
    },
    {
      id: "ORD-10019",
      store: "Book Store",
      amount: "₹1,150",
      status: "Processing",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-700",
    },
  ].map((order, index, arr) => {
    const Icon = order.icon;

    return (
      <div
        key={order.id}
        className={`flex items-center justify-between py-1 ${
          index !== arr.length - 1
            ? "border-b border-border/20"
            : ""
        }`}
      >
        {/* Left */}
        <div className="flex items-center gap-2">
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-full ${order.color}`}
          >
            <Icon className="h-3 w-3" />
          </div>

          <div>
            <p className="text-[10px] font-semibold leading-none">
              {order.id}
            </p>

            <p className="mt-0.5 text-[8px] text-muted-foreground">
              {order.store}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold">
            {order.amount}
          </span>

          <Badge
            className={`${order.color} rounded-full border-0 px-2 py-0 text-[10px] font-medium`}
          >
            {order.status}
          </Badge>
        </div>
      </div>
    );
  })}
</CardContent>
</Card>
    </div>
  );
}
