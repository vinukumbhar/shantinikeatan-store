"use client";

import VariantTable from "./variant-table";
import { Card, CardContent } from "@/components/ui/card";
import { useProductStore } from "../store/product-store";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Simplified map for swatch background colors
const colorBgMap: Record<string, string> = {
  black: "bg-black",
  blue: "bg-blue-600",
  brown: "bg-[#78350f]",
  green: "bg-emerald-600",
  red: "bg-red-600",
  white: "bg-white border-muted-foreground/30",
  yellow: "bg-amber-400",
  gray: "bg-slate-500",
  grey: "bg-slate-500",
};

interface StepTwoFormProps {
  onNext: () => void;
}

export default function Step4({ onNext }: StepTwoFormProps) {
  const { variants, basicInformation, masterData } = useProductStore();

  const brand = masterData.brands?.find(
    (item) => item.id === basicInformation.brandId,
  );
  const unit = masterData.units?.find(
    (item) => item.id === basicInformation.unitId,
  );

  // Fallback map for selected categories to avoid runtime errors
  const selectedCategories =
    masterData.categories?.filter((cat) =>
      basicInformation.categoryIds?.includes(cat.id),
    ) || [];
  return (
    <div className="space-y-4">
      {/* Dense Meta Info Card */}
      <Card className="border-border/60 shadow-sm">
        <CardContent className="p-3.5 space-y-3">
          {/* Header Row */}
          <div className="flex justify-between items-center border-b border-border/60 pb-2">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Product Summary
            </h2>
            <Badge
              variant={basicInformation.isActive ? "outline" : "destructive"}
              className={`h-5 text-[10px] px-2 font-medium ${
                basicInformation.isActive
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : ""
              }`}
            >
              {basicInformation.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>

          {/* Key-Value Inline Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div className="flex justify-between items-center p-1.5 px-2 rounded-md bg-muted/40 border border-border/40">
              <span className="text-muted-foreground">Product</span>
              <span
                className="font-semibold text-foreground truncate max-w-[100px]"
                title={basicInformation.productName}
              >
                {basicInformation.productName || "—"}
              </span>
            </div>

            <div className="flex justify-between items-center p-1.5 px-2 rounded-md bg-muted/40 border border-border/40">
              <span className="text-muted-foreground">SKU</span>
              <span className="font-mono font-medium text-foreground bg-background border px-1.5 py-0.2 rounded text-[10px]">
                {basicInformation.sku || "—"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Variant Table */}
      <Card>
        <CardContent className="p-4">
          <h2 className="mb-4 text-lg font-semibold">Add Images</h2>

          <VariantTable mode="images" />
        </CardContent>
      </Card>
      <div className="flex justify-end pt-4">
        <Button
          onClick={() => {
            onNext();
          }}
          className="flex h-9 items-center gap-2 bg-blue-600 px-5 text-xs font-semibold hover:bg-blue-700"
        >
          Next
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
