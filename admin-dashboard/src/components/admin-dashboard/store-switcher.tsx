"use client";

import { Button } from "@/components/ui/button";
import {
  LayoutGrid,
  Building2,
  Shirt,
  BookOpen,
} from "lucide-react";

export function StoreSwitcher() {
  return (
    <div className="mr-6 ml-6 rounded-xl bg-background  ">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        {/* Label */}
        <p className="whitespace-nowrap text-sm font-medium text-muted-foreground">
          View Dashboard For:
        </p>

        {/* Buttons */}
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Button className="h-11 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700">
            <LayoutGrid className="mr-2 h-4 w-4" />
            All Stores (Combined)
          </Button>

          <Button variant="outline" className="h-11 w-full">
            <Building2 className="mr-2 h-4 w-4 text-green-600" />
            School Store
          </Button>

          <Button variant="outline" className="h-11 w-full">
            <Shirt className="mr-2 h-4 w-4 text-blue-600" />
            Uniform Store
          </Button>

          <Button variant="outline" className="h-11 w-full">
            <BookOpen className="mr-2 h-4 w-4 text-orange-500" />
            Book Store
          </Button>
        </div>
      </div>
    </div>
  );
}