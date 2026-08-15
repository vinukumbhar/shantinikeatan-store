"use client";

import { useEffect, useState } from "react";
import { ArrowRight, SlidersHorizontal, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { MultiSearchableSelect } from "@/components/ui/MultiSearchableSelect";
import ProductDefaultImages from "./product-image-selection";
import { masterService } from "./master.service";
import { useProductStore } from "../store/product-store";
import Barcode from "react-barcode";

interface StepOneFormProps {
  onNext: () => void;
}

export default function StepOneForm({ onNext }: StepOneFormProps) {
  // Master options from store
  const categories = useProductStore((state) => state.masterData.categories);
  const brands = useProductStore((state) => state.masterData.brands);
  const units = useProductStore((state) => state.masterData.units);
  const setMasterData = useProductStore((state) => state.setMasterData);
  const barcode = useProductStore((state) => state.basicInformation.barcode);
  const updateBasicInformation = useProductStore(
    (state) => state.updateBasicInformation,
  );

  // Store basic information & action
  const basicInformation = useProductStore((state) => state.basicInformation);
  const setBasicInformation = useProductStore(
    (state) => state.setBasicInformation,
  );

  // Read initial values from Zustand store ONCE on mount
  const [productName, setProductName] = useState(
    () => useProductStore.getState().basicInformation?.productName || "",
  );
  const [sku, setSku] = useState(
    () => useProductStore.getState().basicInformation?.sku || "",
  );
  const [categoryIds, setCategoryIds] = useState<string[]>(
    () => useProductStore.getState().basicInformation?.categoryIds || [],
  );
  const [brandId, setBrandId] = useState(
    () => useProductStore.getState().basicInformation?.brandId || "",
  );
  const [unitId, setUnitId] = useState(
    () => useProductStore.getState().basicInformation?.unitId || "",
  );
  const [description, setDescription] = useState(
    () => useProductStore.getState().basicInformation?.description || "",
  );
  const [trackInventory, setTrackInventory] = useState<boolean>(
    () => useProductStore.getState().basicInformation?.trackInventory ?? true,
  );
  const [isActive, setIsActive] = useState<boolean>(
    () => useProductStore.getState().basicInformation?.isActive ?? true,
  );

  const [imageSheetOpen, setImageSheetOpen] = useState(false);

  // Load Master Data
  useEffect(() => {
    const loadMasters = async () => {
      try {
        const data = await masterService.getMasterData();
        setMasterData(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to load masters:", error);
      }
    };

    loadMasters();
  }, [setMasterData]);

  const handleNext = () => {
    const payload = {
      productName,
      sku,
      categoryIds,
      brandId,
      unitId,
      description,
      trackInventory,
      isActive,
      barcode: barcode.trim(),
    };

    console.log(
      "[Before Save] Store State:",
      useProductStore.getState().basicInformation,
    );
    console.log("[Saving Payload]:", payload);

    // Write to Zustand store synchronously
    setBasicInformation(payload);

    // Read direct store reference immediately post-write
    const updatedStore = useProductStore.getState();
    console.log(
      "[After Save] Updated Zustand Store State:",
      updatedStore.basicInformation,
    );

    onNext();
  };

  return (
    <div className="w-full space-y-6">
      {/* Form Header */}
      <div>
        <h2 className="text-base font-bold text-slate-900">
          Basic Information{" "}
        </h2>
        <p className="text-2xs sm:text-xs text-slate-500 mt-0.5">
          Product details for product with barcode.
        </p>
      </div>

      <div className="mt-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          {/* Barcode Label */}
          <Label className="shrink-0 text-xs font-semibold text-slate-800">
            Barcode <span className="text-red-500">*</span>
          </Label>

          {/* Barcode Input */}
          <Input
            type="text"
            placeholder="Scan or enter barcode"
            value={barcode}
            onChange={(e) =>
              updateBasicInformation({
                barcode: e.target.value,
              })
            }
            autoFocus
            className="h-9 w-full sm:w-72 rounded-md border-slate-200 bg-white px-3 text-xs font-medium text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
          />

          {/* Barcode Preview */}
          <div className="flex h-24 w-full items-center justify-center overflow-hidden rounded-md border border-slate-200 bg-slate-50 px-3 sm:h-16 sm:flex-1 sm:px-4">
            {barcode ? (
              <Barcode
                value={barcode}
                format="CODE128"
                width={1.5}
                height={40}
                displayValue={true}
                fontSize={11}
                margin={3}
              />
            ) : (
              <span className="text-xs text-slate-400">Barcode preview</span>
            )}
          </div>
        </div>
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

      {/* Default Product Images Selector */}
      <div className="flex justify-between items-center rounded-lg border p-4">
        <div>
          <h3 className="text-sm font-semibold">Default Product Images</h3>
          <p className="text-xs text-muted-foreground">
            Select gallery, thumbnail and hero image.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => setImageSheetOpen(true)}
        >
          <ImagePlus className="mr-2 h-4 w-4" />
          Select Images
        </Button>
      </div>

      <ProductDefaultImages
        open={imageSheetOpen}
        onOpenChange={setImageSheetOpen}
      />

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
