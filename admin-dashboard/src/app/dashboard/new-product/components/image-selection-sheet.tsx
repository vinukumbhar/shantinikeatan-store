"use client";

import { useState, useEffect } from "react";
import { useProductStore } from "../store/product-store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ImageDropzone from "./product-dropzone";

interface ImageSelectionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variantId: string | null;
  selectedVariantIds?: string[];
}

export default function ImageSelectionSheet({
  open,
  onOpenChange,
  variantId,
  selectedVariantIds = [],
}: ImageSelectionSheetProps) {
  const images = useProductStore((state) => state.images);
  const productVariants = useProductStore((state) => state.productVariants);
  const assignImagesToVariant = useProductStore((state) => state.assignImagesToVariant);
  const assignImagesToVariants = useProductStore((state) => state.assignImagesToVariants);

  const activeVariant = productVariants.find((v) => v.id === variantId);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

  // Sync state cleanly when the modal opens
  useEffect(() => {
    if (open) {
      if (variantId && activeVariant) {
        setSelectedImageIds(activeVariant.imageIds || []);
      } else {
        setSelectedImageIds([]);
      }
    }
  }, [open, variantId, activeVariant]);

  // FILTER: Only show images assigned to this variant. If none, show a clean slate.
  const visibleImages = variantId
    ? images.filter((img) => activeVariant?.imageIds?.includes(img.id))
    : images;

  const toggleImageSelection = (id: string) => {
    setSelectedImageIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (variantId) {
      assignImagesToVariant(variantId, selectedImageIds);
    } else if (selectedVariantIds.length > 0) {
      assignImagesToVariants(selectedVariantIds, selectedImageIds);
    }
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{variantId ? "Variant Images" : "Bulk Images"}</SheetTitle>
          <SheetDescription>
            Upload or manage images assigned to this variant.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Dropzone manages its own context */}
          <ImageDropzone variantId={variantId} />

          {/* Clean Selectable Image Grid */}
          {visibleImages.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground/80">Selected Gallery</h3>
              <div className="grid grid-cols-3 gap-3">
                {visibleImages.map((img) => {
                  const isChecked = selectedImageIds.includes(img.id);
                  return (
                    <div
                      key={img.id}
                      onClick={() => toggleImageSelection(img.id)}
                      className={`relative aspect-square cursor-pointer rounded-lg border-2 overflow-hidden bg-muted transition-all ${
                        isChecked ? "border-primary ring-2 ring-primary/20" : "border-muted-foreground/20 opacity-60"
                      }`}
                    >
                      <img src={img.preview} alt="Preview" className="h-full w-full object-cover" />
                      <div className={`absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-md border text-xs shadow-sm font-bold ${
                        isChecked ? "bg-primary text-primary-foreground border-primary" : "bg-background text-transparent"
                      }`}>
                        ✓
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <Button className="w-full" onClick={handleSave}>
            Apply Changes
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
