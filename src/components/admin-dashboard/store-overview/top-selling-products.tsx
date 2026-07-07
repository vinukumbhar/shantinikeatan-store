"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "School Uniform Shirt",
    image: "/products/shirt.png",
    sold: "1,245 pcs",
    progress: 88,
    color: "bg-violet-600",
  },
  {
    id: 2,
    name: "Maths Textbook Class 5",
    image: "/products/book.png",
    sold: "980 pcs",
    progress: 72,
    color: "bg-blue-600",
  },
  {
    id: 3,
    name: "School Shoes",
    image: "/products/shoes.png",
    sold: "875 pcs",
    progress: 68,
    color: "bg-green-600",
  },
  {
    id: 4,
    name: "Science Notebook",
    image: "/products/notebook.jpg",
    sold: "760 pcs",
    progress: 55,
    color: "bg-orange-500",
  },
  {
    id: 5,
    name: "School Belt",
    image: "/products/belt.png",
    sold: "540 pcs",
    progress: 42,
    color: "bg-red-500",
  },
];

export function TopSellingProducts() {
  return (
    <Card className="flex h-full flex-col rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">
          Top Selling Products{" "}
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
        {products.map((product) => (
          <div key={product.id} className="flex gap-3">
            {/* Product Image */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                width={25}
                height={25}
                className="object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-sm font-medium">{product.name}</h4>

                <span className="text-sm font-medium text-muted-foreground">
                  {product.sold}
                </span>
              </div>

              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${product.color}`}
                  style={{ width: `${product.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}