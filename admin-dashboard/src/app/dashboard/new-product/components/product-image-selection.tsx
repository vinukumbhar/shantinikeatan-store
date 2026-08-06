"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import ImageDropzone from "./defualt-dropzone";
import { useProductStore, ProductImage } from "../store/product-store";

interface ProductDefaultImagesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductDefaultImages({
  open,
  onOpenChange,
}: ProductDefaultImagesProps) {
  const globalImages = useProductStore((state) => state.images);
  const defaultImages = useProductStore((state) => state.defaultImages);
  const addImages = useProductStore((state) => state.addImages);
  const assignDefaultImages = useProductStore(
    (state) => state.assignDefaultImages
  );

  const [tempImages, setTempImages] = useState<ProductImage[]>([]);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

  // Sync state when modal opens
  useEffect(() => {
    if (open) {
      const storeState = useProductStore.getState();
      console.log("[Modal Opened] Store state read:", {
        images: storeState.images,
        defaultImages: storeState.defaultImages,
      });

      setSelectedImageIds(storeState.defaultImages.imageIds || []);
      setTempImages([]);
    }
  }, [open]);

  // Merge global store images with temp uploads
  const allAvailableImages = Array.from(
    new Map([...globalImages, ...tempImages].map((img) => [img.id, img])).values()
  );

  const handleTempImageUpload = (incomingImages: any[]) => {
    console.log("[Dropzone Raw Upload]", incomingImages);

    // 1. Ensure every uploaded image has a valid string ID and preview URL
    const normalizedImages: ProductImage[] = incomingImages.map((img) => ({
      id: img.id || crypto.randomUUID(),
      file: img.file || img,
      preview: img.preview || (img instanceof File ? URL.createObjectURL(img) : ""),
    }));

    console.log("[Normalized Images Generated]", normalizedImages);

    // 2. Append to temporary state
    setTempImages((prev) => [...prev, ...normalizedImages]);

    // 3. Automatically select all newly uploaded image IDs
    const newIds = normalizedImages.map((img) => img.id);
    setSelectedImageIds((prev) => {
      const updated = Array.from(new Set([...prev, ...newIds]));
      console.log("[Updated Selected Image IDs on Upload]", updated);
      return updated;
    });
  };

  const toggleImageSelection = (id: string) => {
    setSelectedImageIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      console.log("[Toggled Image Selection]", { clickedId: id, newSelectedList: updated });
      return updated;
    });
  };

  const handleSave = () => {
    console.log("[Handle Save Initiated]");
    console.log("Current Temp Images:", tempImages);
    console.log("Current Selected IDs State:", selectedImageIds);

    // 1. Commit temp images to master global store pool
    if (tempImages.length > 0) {
      console.log("Adding temp images to Zustand store...");
      addImages(tempImages);
    }

    // 2. Fallback: If selectedImageIds is empty, default to all available image IDs
    const finalSelectedIds =
      selectedImageIds.length > 0
        ? selectedImageIds
        : allAvailableImages.map((img) => img.id);

    console.log("Final IDs passing to assignDefaultImages:", finalSelectedIds);

    // 3. Assign selected IDs to default images state in Zustand
    assignDefaultImages(finalSelectedIds);

    // 4. Verify store state after sync
    const postSaveStore = useProductStore.getState();
    console.log("[Post Save Verification] Zustand Store State:", {
      globalImages: postSaveStore.images,
      defaultImages: postSaveStore.defaultImages,
    });

    // 5. Reset local temp state and close drawer
    setTempImages([]);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Default Product Images</SheetTitle>
          <SheetDescription>
            Upload and select default images for this product.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <ImageDropzone type="product" onUpload={handleTempImageUpload} />

          {allAvailableImages.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold">Gallery Images</h3>

              <div className="grid grid-cols-3 gap-3">
                {allAvailableImages.map((image) => {
                  const selected = selectedImageIds.includes(image.id);

                  return (
                    <button
                      key={image.id}
                      type="button"
                      onClick={() => toggleImageSelection(image.id)}
                      className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                        selected
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-muted"
                      }`}
                    >
                      <img
                        src={image.preview}
                        alt=""
                        className="h-full w-full object-cover"
                      />

                      {selected && (
                        <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Button className="w-full" onClick={handleSave}>
            Save Default Images
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}