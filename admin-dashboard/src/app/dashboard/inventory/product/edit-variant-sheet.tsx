"use client";

import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import VariantImageEditor from "./variant-image-editor";

const API_URL = "http://localhost:8000";

interface EditVariantSheetProps {
  variantId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

interface VariantData {
  id: string;
  productId: string;
  name: string | null;
  sku: string;
  isActive: boolean;
  stock: number;
  lowStockLimit: number;

  thumbnailImage?: {
    id: string;
    path?: string;
    url?: string;
  } | null;

  heroImage?: {
    id: string;
    path?: string;
    url?: string;
  } | null;

  galleryImages?: Array<{
    id: string;
    path?: string;
    url?: string;
  }>;

  product?: {
    id: string;
    name?: string;
  } | null;

  attributes?: Array<{
    id: string;
    attributeValue?: {
      id: string;
      name: string;
      skuCode?: string | null;
      attribute?: {
        id: string;
        name: string;
        code: string;
      } | null;
    } | null;
  }>;

  barcodes?: Array<{
    id: string;
    barcode?: string;
  }>;

  prices?: Array<{
    id: string;
    price?: number;
  }>;
}

interface AttributeValue {
  id: string;
  name: string;
  skuCode?: string | null;
  attributeId: string;
  attribute?: {
    id: string;
    name: string;
    code: string;
  } | null;
}

interface Attribute {
  id: string;
  name: string;
  code: string;
  values: AttributeValue[];
}

interface SelectedAttribute {
  attributeId: string;
  attributeValueId: string;
}

export default function EditVariantSheet({
  variantId,
  open,
  onOpenChange,
  onSuccess,
}: EditVariantSheetProps) {
  const [variant, setVariant] = useState<VariantData | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [lowStockLimit, setLowStockLimit] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [availableAttributes, setAvailableAttributes] = useState<Attribute[]>(
    [],
  );

  const [selectedAttributes, setSelectedAttributes] = useState<
    SelectedAttribute[]
  >([]);

  // =========================================================
  // FETCH VARIANT
  // =========================================================

  useEffect(() => {
    if (!open || !variantId) {
      return;
    }

    const fetchVariant = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/product-variants/${variantId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product variant");
        }

        const data = await response.json();

        console.log("Full Product Variant:", data);

        setVariant(data);
        setSelectedAttributes(
          (data.attributes ?? []).map((item: any) => ({
            attributeId: item.attributeValue?.attribute?.id ?? item.attributeId,

            attributeValueId: item.attributeValue?.id ?? item.attributeValueId,
          })),
        );

        setName(data.name ?? "");
        setSku(data.sku ?? "");
        setStock(String(data.stock ?? 0));
        setLowStockLimit(String(data.lowStockLimit ?? 0));
        setIsActive(data.isActive ?? true);
      } catch (error) {
        console.error("Fetch product variant error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVariant();
  }, [variantId, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const fetchAttributes = async () => {
      try {
        const response = await fetch(`${API_URL}/attributes`);

        if (!response.ok) {
          throw new Error("Failed to fetch attributes");
        }

        const data = await response.json();

        setAvailableAttributes(data);
      } catch (error) {
        console.error("Fetch attributes error:", error);
      }
    };

    fetchAttributes();
  }, [open]);

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    if (!variant) {
      return;
    }

    setName(variant.name ?? "");
    setSku(variant.sku ?? "");
    setStock(String(variant.stock ?? 0));
    setLowStockLimit(String(variant.lowStockLimit ?? 0));
    setIsActive(variant.isActive ?? true);
  };

  // =========================================================
  // UPDATE
  // =========================================================

  const handleUpdate = async () => {
    if (!variantId) {
      return;
    }

    if (!sku.trim()) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/product-variants/${variantId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: name.trim() || null,
          sku: sku.trim(),
          stock: Number(stock),
          lowStockLimit: Number(lowStockLimit),
          isActive,

          //   thumbnailImageId,
          //   heroImageId,
          //   galleryImageIds,

          attributes: selectedAttributes
            .filter((item) => item.attributeId && item.attributeValueId)
            .map((item) => ({
              attributeId: item.attributeId,
              attributeValueId: item.attributeValueId,
            })),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message || "Failed to update product variant",
        );
      }

      // Update local variant data
      setVariant(data);

      // Refresh variant table
      onSuccess();

      // Close sheet
      onOpenChange(false);
    } catch (error) {
      console.error("Update product variant error:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Edit Product Variant(hi)</SheetTitle>

          <SheetDescription>
            Edit the selected product variant.
          </SheetDescription>
        </SheetHeader>

        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading variant...</p>
          </div>
        ) : !variant ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-muted-foreground">Variant not found.</p>
          </div>
        ) : (
          <div className="space-y-6 px-4 py-6">
            {/* ================================================= */}
            {/* BASIC INFORMATION */}
            {/* ================================================= */}

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Variant Information</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label>Variant Name</Label>

                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Variant name"
                  />
                </div>

                {/* SKU */}
                <div className="space-y-2">
                  <Label>SKU</Label>

                  <Input
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="SKU"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* ================================================= */}
            {/* INVENTORY */}
            {/* ================================================= */}

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Inventory</h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Stock */}
                <div className="space-y-2">
                  <Label>Stock</Label>

                  <Input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                {/* Low Stock */}
                <div className="space-y-2">
                  <Label>Low Stock Limit</Label>

                  <Input
                    type="number"
                    min="0"
                    value={lowStockLimit}
                    onChange={(e) => setLowStockLimit(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* ================================================= */}
            {/* ATTRIBUTES */}
            {/* ================================================= */}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Variant Attributes</h3>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedAttributes([
                      ...selectedAttributes,
                      {
                        attributeId: "",
                        attributeValueId: "",
                      },
                    ]);
                  }}
                >
                  + Add Attribute
                </Button>
              </div>

              {selectedAttributes.length === 0 ? (
                <div className="rounded-md border border-dashed p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    No attributes assigned.
                  </p>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => {
                      setSelectedAttributes([
                        {
                          attributeId: "",
                          attributeValueId: "",
                        },
                      ]);
                    }}
                  >
                    Add Attribute
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedAttributes.map((selected, index) => {
                    const selectedAttribute = availableAttributes.find(
                      (attribute) => attribute.id === selected.attributeId,
                    );

                    return (
                      <div
                        key={`${index}-${selected.attributeId}`}
                        className="flex items-center gap-2 rounded-md border p-2"
                      >
                        {/* Attribute */}
                        <select
                          className="h-9 min-w-0 flex-1 rounded-md border bg-background px-2 text-sm"
                          value={selected.attributeId}
                          onChange={(e) => {
                            const updated = [...selectedAttributes];

                            updated[index] = {
                              attributeId: e.target.value,
                              attributeValueId: "",
                            };

                            setSelectedAttributes(updated);
                          }}
                        >
                          <option value="">Attribute</option>

                          {availableAttributes.map((attribute) => (
                            <option key={attribute.id} value={attribute.id}>
                              {attribute.name}
                            </option>
                          ))}
                        </select>

                        {/* Attribute Value */}
                        <select
                          className="h-9 min-w-0 flex-1 rounded-md border bg-background px-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                          value={selected.attributeValueId}
                          disabled={!selectedAttribute}
                          onChange={(e) => {
                            const updated = [...selectedAttributes];

                            updated[index] = {
                              ...updated[index],
                              attributeValueId: e.target.value,
                            };

                            setSelectedAttributes(updated);
                          }}
                        >
                          <option value="">Value</option>

                          {selectedAttribute?.values.map((value) => (
                            <option key={value.id} value={value.id}>
                              {value.name}
                              {value.skuCode ? ` (${value.skuCode})` : ""}
                            </option>
                          ))}
                        </select>

                        {/* Remove */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => {
                            setSelectedAttributes(
                              selectedAttributes.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <Separator />

            <VariantImageEditor
              productId={variant.productId}
              thumbnailImage={variant.thumbnailImage ?? null}
              heroImage={variant.heroImage ?? null}
              galleryImages={variant.galleryImages ?? []}
              disabled={loading || saving}
              onThumbnailChange={(image) => {
                setVariant((current) =>
                  current
                    ? {
                        ...current,
                        thumbnailImage: image,
                      }
                    : current,
                );
              }}
              onHeroChange={(image) => {
                setVariant((current) =>
                  current
                    ? {
                        ...current,
                        heroImage: image,
                      }
                    : current,
                );
              }}
              onGalleryChange={(images) => {
                setVariant((current) =>
                  current
                    ? {
                        ...current,
                        galleryImages: images,
                      }
                    : current,
                );
              }}
            />

            <Separator />

            {/* ================================================= */}
            {/* BARCODES */}
            {/* ================================================= */}

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Barcodes</h3>

              {variant.barcodes?.length ? (
                <div className="space-y-2">
                  {variant.barcodes.map((barcode) => (
                    <div
                      key={barcode.id}
                      className="rounded-md border p-3 text-sm"
                    >
                      {barcode.barcode}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No barcodes.</p>
              )}
            </div>

            <Separator />

            {/* ================================================= */}
            {/* STATUS */}
            {/* ================================================= */}

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Variant Status</p>

                <p className="text-xs text-muted-foreground">
                  Enable or disable this variant.
                </p>
              </div>

              <Button
                type="button"
                variant={isActive ? "default" : "outline"}
                onClick={() => setIsActive(!isActive)}
              >
                {isActive ? "Active" : "Inactive"}
              </Button>
            </div>
          </div>
        )}

        {/* ===================================================== */}
        {/* FOOTER */}
        {/* ===================================================== */}

        <SheetFooter className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={loading || saving || !variant}
            onClick={handleReset}
          >
            Reset
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={saving}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            className="w-full"
            disabled={loading || saving || !variant}
            onClick={handleUpdate}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
