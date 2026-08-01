"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
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
} from "lucide-react";

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Sales (Today)</CardDescription>

          <CardTitle className="flex items-center gap-2 text-2xl font-bold tabular-nums">
            <IndianRupee className="h-5 w-5 text-primary" />

            <span>2,45,680</span>

            <Badge
              variant="secondary"
              className="h-6 rounded-full bg-green-100 px-2 py-0 text-[11px] font-semibold text-green-700"
            >
              <TrendingUpIcon className="mr-1 h-3 w-3" />
              +12.5%
            </Badge>
          </CardTitle>
          <CardAction>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <ChartNoAxesColumnIncreasing className="h-5 w-5" />
            </div>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Vs yesterday</span>
            <IndianRupee className="h-4 w-4" />
            <span>2,40,680</span>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders (Today)</CardDescription>

          <CardTitle className="flex items-center gap-2 text-2xl font-bold tabular-nums">
            <span>156</span>

            <Badge
              variant="secondary"
              className="h-6 rounded-full bg-green-100 px-2 py-0 text-[11px] font-semibold text-green-700"
            >
              <TrendingUpIcon className="mr-1 h-3 w-3" />
              +12.5%
            </Badge>
          </CardTitle>

          <CardAction>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-700">
              <Handbag className="h-5 w-5" />
            </div>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Vs yesterday</span>
            <span>139</span>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue (MTD)</CardDescription>

          <CardTitle className="flex items-center gap-2 text-2xl font-bold tabular-nums">
            <IndianRupee className="h-5 w-5 text-primary" />

            <span>18,75,320</span>

            <Badge
              variant="secondary"
              className="h-6 rounded-full bg-green-100 px-2 py-0 text-[11px] font-semibold text-green-700"
            >
              <TrendingUpIcon className="mr-1 h-3 w-3" />
              +22.6%
            </Badge>
          </CardTitle>

          <CardAction>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
              <ChartColumnBig className="h-5 w-5" />
            </div>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Vs last month</span>
            <IndianRupee className="h-4 w-4" />
            <span>15,28,640</span>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Sales Today</CardDescription>

          <CardTitle className="flex items-center gap-2 text-2xl font-bold tabular-nums">
            <IndianRupee className="h-5 w-5 text-primary" />

            <span>4,28,750</span>

            <Badge
              variant="secondary"
              className="h-6 rounded-full bg-green-100 px-2 py-0 text-[11px] font-semibold text-green-700"
            >
              <TrendingUpIcon className="mr-1 h-3 w-3" />
              +16.8%
            </Badge>
          </CardTitle>

          <CardAction>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
              <ChartPie className="h-5 w-5" />
            </div>
          </CardAction>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Vs last month</span>
            <IndianRupee className="h-4 w-4" />
            <span>3,66,990</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
