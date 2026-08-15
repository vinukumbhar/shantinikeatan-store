




"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Trash2 } from "lucide-react"; // 1. Added Trash2 Icon
import { useProductStore } from "../store/product-store";

const MAX_PER_VARIANT = 5;

interface ImageDropzoneProps {
  variantId: string | null;
}

export default function ImageDropzone({ variantId }: ImageDropzoneProps) {
  const images = useProductStore((state) => state.images);
  const addImages = useProductStore((state) => state.addImages);
  const productVariants = useProductStore((state) => state.productVariants);
  const setVariantHeroImage = useProductStore((state) => state.setVariantHeroImage);
  const setVariantThumbnail = useProductStore((state) => state.setVariantThumbnail);
  const assignImagesToVariant = useProductStore((state) => state.assignImagesToVariant);

  const variant = productVariants.find((v) => v.id === variantId);
  const assignedCount = variant?.imageIds?.length ?? 0;

  // 1. FILTER LOGIC: Determine exactly which images to display
  const visibleImages = variantId
    ? images.filter((img) => variant?.imageIds?.includes(img.id))
    : images;

  const heroImage = visibleImages.find((img) => img.id === variant?.heroImageId);
  const thumbnailImage = visibleImages.find((img) => img.id === variant?.thumbnailId);

  // 2. DISCONNECT FUNCTION: Disconnects an image from this variant
  const handleRemoveImageFromVariant = (imageId: string) => {
    if (!variantId || !variant) return;
    const updatedIds = variant.imageIds.filter((id) => id !== imageId);
    assignImagesToVariant(variantId, updatedIds);
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (variantId) {
        const availableSlots = MAX_PER_VARIANT - assignedCount;
        if (availableSlots <= 0) return;

        const uploadedImages = acceptedFiles
          .slice(0, availableSlots)
          .map((file) => ({
            id: crypto.randomUUID(),
            file,
            preview: URL.createObjectURL(file),
          }));

        addImages(uploadedImages);

        const newIds = uploadedImages.map((img) => img.id);
        const currentIds = variant?.imageIds ?? [];
        assignImagesToVariant(variantId, [...currentIds, ...newIds]);
      } else {
        const uploadedImages = acceptedFiles.map((file) => ({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
        }));
        addImages(uploadedImages);
      }
    },
    [variantId, assignedCount, variant, addImages, assignImagesToVariant]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
  });

  return (
    <div className="space-y-8">
      {/* Upload Box */}
      <div
        {...getRootProps()}
        className={`flex h-40 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-all ${
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/40"
        }`}
      >
        <input {...getInputProps()} />

        <div className="text-center">
          <ImagePlus className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-medium">
            {isDragActive ? "Drop images here..." : "Drag & Drop Images"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {variantId 
              ? `${assignedCount} / ${MAX_PER_VARIANT} Images Assigned`
              : `${images.length} Total Global Images Stored`}
          </p>
        </div>
      </div>

      {/* Hero & Thumbnail Previews */}
      {variantId && assignedCount > 0 && (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground/80">Hero Image</h3>
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted/30">
              {heroImage ? (
                <img src={heroImage.preview} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">Not Selected</div>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground/80">Thumbnail Image</h3>
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted/30">
              {thumbnailImage ? (
                <img src={thumbnailImage.preview} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">Not Selected</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Conditional Gallery View */}
      {visibleImages.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground/80">
            {variantId ? "Assigned Variant Images" : "Uploaded Store Images"}
          </h3>

          <div className="grid grid-cols-4 gap-4">
            {visibleImages.map((image) => {
              const isHero = variant?.heroImageId === image.id;
              const isThumbnail = variant?.thumbnailId === image.id;

              return (
                <div key={image.id} className="group relative flex flex-col space-y-2">
                  {/* 3. Added relative container + Trash Button overlay */}
                  <div className="aspect-square w-full relative overflow-hidden rounded-lg border bg-muted">
                    <img src={image.preview} alt="" className="h-full w-full object-cover" />
                    
                    {variantId && (
                      <button
                        type="button"
                        onClick={() => handleRemoveImageFromVariant(image.id)}
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-md bg-background/90 backdrop-blur-sm border text-destructive opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {variantId && (
                    <div className="flex flex-col gap-1">
                      <button
                        type="button"
                        onClick={() => setVariantHeroImage(variantId, image.id)}
                        className={`w-full rounded border py-1 text-[11px] font-medium transition ${
                          isHero ? "bg-primary border-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {isHero ? "✓ Hero" : "Set Hero"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setVariantThumbnail(variantId, image.id)}
                        className={`w-full rounded border py-1 text-[11px] font-medium transition ${
                          isThumbnail ? "bg-primary border-primary text-primary-foreground" : "bg-background text-foreground hover:bg-muted"
                        }`}
                      >
                        {isThumbnail ? "✓ Thumbnail" : "Set Thumbnail"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

