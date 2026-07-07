"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    id: 1,
    name: "School Uniform Pant (32)",
    store: "Uniform Store",
    image: "/products/pant.png",
    left: 5,
  },
  {
    id: 2,
    name: "English Book Class 3",
    store: "Book Store",
    image: "/products/english-book.png",
    left: 4,
  },
  {
    id: 3,
    name: "White Socks",
    store: "Uniform Store",
    image: "/products/socks.png",
    left: 3,
  },
  {
    id: 4,
    name: "Geometry Box",
    store: "Book Store",
    image: "/products/geometry-box.png",
    left: 6,
  },
  {
    id: 5,
    name: "Event Badge",
    store: "School Store",
    image: "/products/badge.png",
    left: 2,
  },
];

export function LowStockAlert() {
  return (
    <Card className="flex h-full flex-col rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-base font-semibold">
          Low Stock Alert{" "}
          <span className="text-sm font-normal text-muted-foreground">
            (All Stores)
          </span>
        </CardTitle>

        <Button
          variant="ghost"
          className="h-7 rounded-full px-3 text-xs font-semibold text-blue-600 hover:bg-blue-100"
        >
          View All
        </Button>
      </CardHeader>

      <CardContent className="flex-1 space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold">{item.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {item.store}
                </p>
              </div>
            </div>

            <span className="text-sm font-semibold text-red-500">
              {item.left} left
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}