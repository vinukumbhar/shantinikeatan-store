"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { day: "1 May", school: 8000, uniform: 22000, book: 14000, total: 25000 },
  { day: "3 May", school: 10000, uniform: 32000, book: 19000, total: 48000 },
  { day: "5 May", school: 12000, uniform: 40000, book: 26000, total: 60000 },
  { day: "7 May", school: 9000, uniform: 30000, book: 18000, total: 47000 },
  { day: "10 May", school: 10000, uniform: 32000, book: 20000, total: 48000 },
  { day: "13 May", school: 9000, uniform: 36000, book: 24000, total: 61000 },
  { day: "15 May", school: 15000, uniform: 53000, book: 34000, total: 78000 },
  { day: "18 May", school: 14000, uniform: 51000, book: 32000, total: 76000 },
  { day: "21 May", school: 11000, uniform: 42000, book: 25000, total: 62000 },
  { day: "24 May", school: 18000, uniform: 52000, book: 35000, total: 79000 },
  { day: "27 May", school: 16000, uniform: 56000, book: 34000, total: 83000 },
  { day: "31 May", school: 19000, uniform: 55000, book: 33000, total: 89000 },
];

export function SalesChart() {
  return (
    <Card className="flex h-full flex-col rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Sales Overview{" "}
          <span className="font-medium text-muted-foreground">
            (This Month)
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pt-2">
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#ececec"
              />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <YAxis
                tickFormatter={(v) => `${v / 1000}K`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Legend
                iconType="circle"
                wrapperStyle={{
                  paddingBottom: 20,
                  fontSize: 13,
                }}
              />

              <Line
                type="monotone"
                dataKey="school"
                name="School Store"
                stroke="#22c55e"
                strokeWidth={2.5}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="uniform"
                name="Uniform Store"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="book"
                name="Book Store"
                stroke="#f97316"
                strokeWidth={2.5}
                dot={false}
              />

              <Line
                type="monotone"
                dataKey="total"
                name="Total"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}