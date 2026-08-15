"use client";

import { useProductStore } from "../store/product-store";
import VariantTable from "./variant-table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
``;
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

export default function Step3({ onNext }: StepTwoFormProps) {
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
    <div className="w-full max-w-4xl mx-auto space-y-3 text-xs">
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

            <div className="flex justify-between items-center p-1.5 px-2 rounded-md bg-muted/40 border border-border/40">
              <span className="text-muted-foreground">Brand</span>
              <span className="font-medium text-foreground">
                {brand?.name || "—"}
              </span>
            </div>

            <div className="flex justify-between items-center p-1.5 px-2 rounded-md bg-muted/40 border border-border/40">
              <span className="text-muted-foreground">Unit</span>
              <span className="font-medium text-foreground">
                {unit?.name || "—"}
              </span>
            </div>
          </div>

          {/* Compact Categories & Inventory Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Track Inventory:</span>
              <span
                className={`font-semibold ${
                  basicInformation.trackInventory
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-muted-foreground"
                }`}
              >
                {basicInformation.trackInventory ? "Yes" : "No"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Categories:</span>
              <div className="flex flex-wrap gap-1">
                {selectedCategories.length > 0 ? (
                  selectedCategories.map((cat) => (
                    <span
                      key={cat.id}
                      className="bg-muted text-foreground text-[10px] font-medium px-1.5 py-0.5 rounded border border-border/50"
                    >
                      {cat.name}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground/70 italic text-[10px]">
                    None
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Compact Description Box */}
          {basicInformation.description && (
            <div className="bg-muted/30 p-2.5 rounded-md border border-border/40 text-[11px] text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground mr-1.5">
                Description:
              </span>
              {basicInformation.description}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Smart Attributes / Color Chip Card */}
      {variants?.length > 0 && (
        <Card className="border-border/60 shadow-sm">
          <CardContent className="p-3 divide-y divide-border/40">
            {variants.map((variant, index) => {
              const attribute = masterData.attributes?.find(
                (item) => item.id === variant.attributeId,
              );
              const values =
                masterData.attributeValues?.filter((item) =>
                  variant.attributeValues?.includes(item.id),
                ) || [];
              const isColorAttr = ["color", "colour"].includes(
                attribute?.name?.toLowerCase() || "",
              );

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 py-1.5 first:pt-0 last:pb-0 text-[11px]"
                >
                  <span className="font-semibold text-muted-foreground min-w-[75px] shrink-0">
                    {attribute?.name || "Attribute"}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {values.map((val) => {
                      const normalizedValue = val.name.toLowerCase().trim();
                      const swatchBg = colorBgMap[normalizedValue];

                      // Render circular color chip if attribute is color
                      if (isColorAttr && swatchBg) {
                        return (
                          <div
                            key={val.id}
                            className="inline-flex items-center gap-1.5 bg-background border border-border px-2 py-0.5 rounded-full text-[10px] font-medium text-foreground shadow-xs"
                          >
                            <span
                              className={`w-2.5 h-2.5 rounded-full border border-black/10 shrink-0 ${swatchBg}`}
                            />
                            {val.name}
                          </div>
                        );
                      }

                      // Standard attribute tag
                      return (
                        <span
                          key={val.id}
                          className="text-[10px] bg-muted/60 text-foreground border border-border/50 font-medium px-2 py-0.5 rounded"
                        >
                          {val.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Embedded Matrix Table Container */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <div className="px-3.5 py-2 bg-muted/40 border-b border-border/60 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          Variants Form Matrix
        </div>
        <div className="p-1">
          <VariantTable mode="barcode" />
        </div>
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
