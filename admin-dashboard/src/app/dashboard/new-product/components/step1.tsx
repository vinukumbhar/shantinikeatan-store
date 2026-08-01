"use client";

import { useEffect, useState } from "react";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { MultiSearchableSelect } from "@/components/ui/MultiSearchableSelect";

import { masterService } from "./master.service";
import { useProductStore } from "../store/product-store";

interface StepOneFormProps {
  onNext: () => void;
}

export default function StepOneForm({ onNext }: StepOneFormProps) {
  // Store state
  const categories = useProductStore((state) => state.masterData.categories);
  const brands = useProductStore((state) => state.masterData.brands);
  const units = useProductStore((state) => state.masterData.units);
  const setMasterData = useProductStore((state) => state.setMasterData);

  // Form Field States
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  const [brandId, setBrandId] = useState("");
  const [unitId, setUnitId] = useState("");
  const [description, setDescription] = useState("");
  const [trackInventory, setTrackInventory] = useState(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const loadMasters = async () => {
      try {
        const data = await masterService.getMasterData();
        setMasterData(data);
      } catch (error) {
        console.error("Failed to load masters:", error);
      }
    };

    loadMasters();
  }, [setMasterData]);

const setBasicInformation = useProductStore(
  (state) => state.setBasicInformation
);

const handleNext = () => {
  setBasicInformation({
    productName,
    sku,
    categoryIds,
    brandId,
    unitId,
    description,
    trackInventory,
    isActive,
  });

  onNext();
};
  return (
    <div className="w-full space-y-6">
      {/* Form Header */}
      <div>
        <h2 className="text-base font-bold text-slate-900">Basic Information</h2>
        <p className="text-2xs sm:text-xs text-slate-500 mt-0.5">
          Enter basic details about the product.
        </p>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
        {/* Product Name */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-800">
            Product Name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
          />
        </div>

        {/* Product Code / SKU */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-800">
            Product Code (SKU) <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            placeholder="Enter product SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
          />
        </div>

        {/* Category Select */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-800">
            Category <span className="text-red-500">*</span>
          </Label>

          <MultiSearchableSelect
            options={categories}
            value={categoryIds}
            onChange={setCategoryIds}
            placeholder="Select Category"
          />

          {categoryIds.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              <span className="font-medium">Path:</span>{" "}
              {categoryIds
                .map((id) => categories.find((c) => c.id === id)?.name)
                .filter(Boolean)
                .join(" / ")}
            </p>
          )}
        </div>

        {/* Brand Select */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-800">
            Brand <span className="text-red-500">*</span>
          </Label>

          <SearchableSelect
            options={brands}
            value={brandId}
            onChange={setBrandId}
            placeholder="Select Brand"
            searchPlaceholder="Search Brand"
          />
        </div>

        {/* Unit Select */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-800">
            Unit <span className="text-red-500">*</span>
          </Label>

          <SearchableSelect
            options={units}
            value={unitId}
            onChange={setUnitId}
            placeholder="Select Unit"
            searchPlaceholder="Search Unit"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label className="text-xs font-semibold text-slate-800">
            Description
          </Label>
          <div className="relative">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 200))}
              className="min-h-[72px] resize-none w-full rounded-md border-slate-200 bg-white p-3 text-xs font-medium text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
              placeholder="Enter product description..."
            />
            <span className="absolute -bottom-5 right-0 text-[10px] text-slate-400 font-medium tracking-tight">
              {description.length} / 200
            </span>
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {/* Toggle: Track Inventory */}
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg text-slate-700 bg-slate-50 p-1.5">
              <SlidersHorizontal className="h-4 w-4 transform rotate-90" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Track Inventory
              </h4>
              <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                Enable inventory tracking for this product
              </p>
            </div>
          </div>
          <Switch
            checked={trackInventory}
            onCheckedChange={setTrackInventory}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>

        {/* Toggle: Is Active */}
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-4">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="text-xs font-bold text-slate-900">Is Active</h4>
              <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                Product will be available for sale
              </p>
            </div>
          </div>
          <Switch
            checked={isActive}
            onCheckedChange={setIsActive}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      </div>

      {/* Form Action */}
      <div className="flex w-full justify-end pt-4">
        <Button
          onClick={handleNext}
          className="h-9 rounded-md bg-blue-600 px-5 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm flex items-center gap-2"
        >
          Next <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}