"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ProductImage,
  useProductStore,
} from "../../store/product-store";

interface BulkImageFormProps {
  ids: string[];
  onSuccess?: () => void;
}

export default function BulkImageForm({
  ids,
  onSuccess,
}: BulkImageFormProps) {
  const addImages = useProductStore((s) => s.addImages);

  const assignImagesToVariants = useProductStore(
    (s) => s.assignImagesToVariants,
  );

  const setVariantHeroImage = useProductStore(
    (s) => s.setVariantHeroImage,
  );

  const setVariantThumbnail = useProductStore(
    (s) => s.setVariantThumbnail,
  );

  // Images uploaded only in this Bulk session
  const [sessionImages, setSessionImages] = useState<ProductImage[]>([]);

  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);

  const [bulkHeroImageId, setBulkHeroImageId] =
    useState<string | null>(null);

  const [bulkThumbnailImageId, setBulkThumbnailImageId] =
    useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uploadedImages: ProductImage[] =
        acceptedFiles.map((file) => ({
          id: crypto.randomUUID(),
          file,
          preview: URL.createObjectURL(file),
        }));

      // Save permanently
      addImages(uploadedImages);

      // Show only current upload
      setSessionImages((prev) => [
        ...prev,
        ...uploadedImages,
      ]);

      const ids = uploadedImages.map((i) => i.id);

      setSelectedImageIds((prev) => [
        ...prev,
        ...ids,
      ]);

      if (!bulkHeroImageId && ids.length) {
        setBulkHeroImageId(ids[0]);
      }

      if (!bulkThumbnailImageId && ids.length) {
        setBulkThumbnailImageId(ids[0]);
      }
    },
    [
      addImages,
      bulkHeroImageId,
      bulkThumbnailImageId,
    ],
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      multiple: true,
      accept: {
        "image/jpeg": [],
        "image/png": [],
        "image/webp": [],
      },
    });

  const toggleImageSelection = (id: string) => {
    setSelectedImageIds((prev) => {
      if (prev.includes(id)) {
        if (bulkHeroImageId === id) {
          setBulkHeroImageId(null);
        }

        if (bulkThumbnailImageId === id) {
          setBulkThumbnailImageId(null);
        }

        return prev.filter((x) => x !== id);
      }

      return [...prev, id];
    });
  };

  const handleApply = () => {
    if (!ids.length) return;

    assignImagesToVariants(ids, selectedImageIds);

    ids.forEach((variantId) => {
      if (bulkHeroImageId) {
        setVariantHeroImage(
          variantId,
          bulkHeroImageId,
        );
      }

      if (bulkThumbnailImageId) {
        setVariantThumbnail(
          variantId,
          bulkThumbnailImageId,
        );
      }
    });

    // Clear current session
    setSessionImages([]);
    setSelectedImageIds([]);
    setBulkHeroImageId(null);
    setBulkThumbnailImageId(null);

    onSuccess?.();
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`flex h-32 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25"
        }`}
      >
        <input {...getInputProps()} />

        <div className="text-center">
          <ImagePlus className="mx-auto mb-2 h-6 w-6" />

          <p>Upload Bulk Images</p>
        </div>
      </div>

      {sessionImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {sessionImages.map((image) => {
            const checked =
              selectedImageIds.includes(image.id);

            const hero =
              bulkHeroImageId === image.id;

            const thumb =
              bulkThumbnailImageId === image.id;

            return (
              <div
                key={image.id}
                className="rounded border p-2"
              >
                <div
                  onClick={() =>
                    toggleImageSelection(image.id)
                  }
                  className="relative cursor-pointer"
                >
                  <img
                    src={image.preview}
                    className="aspect-square w-full rounded object-cover"
                  />

                  {checked && (
                    <Check className="absolute right-2 top-2 h-4 w-4 rounded-full bg-primary p-0.5 text-white" />
                  )}
                </div>

                <div className="mt-2 space-y-1">
                  <Button
                    size="sm"
                    variant={
                      hero
                        ? "default"
                        : "outline"
                    }
                    disabled={!checked}
                    onClick={() =>
                      setBulkHeroImageId(image.id)
                    }
                    className="w-full"
                  >
                    {hero
                      ? "✓ Hero"
                      : "Hero"}
                  </Button>

                  <Button
                    size="sm"
                    variant={
                      thumb
                        ? "default"
                        : "outline"
                    }
                    disabled={!checked}
                    onClick={() =>
                      setBulkThumbnailImageId(
                        image.id,
                      )
                    }
                    className="w-full"
                  >
                    {thumb
                      ? "✓ Thumbnail"
                      : "Thumbnail"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Button
        onClick={handleApply}
        className="w-full"
      >
        Apply Images
      </Button>
    </div>
  );
}