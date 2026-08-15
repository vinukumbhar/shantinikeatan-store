"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const API_URL = "http://localhost:8000";

interface ImageData {
  id: string;
  path?: string;
  url?: string;
}

interface VariantImageEditorProps {
  productId: string;

  thumbnailImage: ImageData | null;
  heroImage: ImageData | null;
  galleryImages: ImageData[];

  onThumbnailChange: (image: ImageData | null) => void;
  onHeroChange: (image: ImageData | null) => void;
  onGalleryChange: (images: ImageData[]) => void;

  disabled?: boolean;
}

export default function VariantImageEditor({
  productId,
  thumbnailImage,
  heroImage,
  galleryImages,
  onThumbnailChange,
  onHeroChange,
  onGalleryChange,
  disabled = false,
}: VariantImageEditorProps) {
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [changingGalleryIndex, setChangingGalleryIndex] = useState<
    number | null
  >(null);

  // ---------------------------------------------------------
  // UPLOAD
  // ---------------------------------------------------------

  const uploadImages = async (files: File[]) => {
    if (!files.length) {
      throw new Error("No files selected");
    }

    if (!productId) {
      throw new Error("Product ID is missing");
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("productId", productId);

    const response = await fetch(`${API_URL}/product-images/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        Array.isArray(data?.message)
          ? data.message.join(", ")
          : data?.message || "Image upload failed",
      );
    }

    const images = Array.isArray(data) ? data : [data];

    return images as ImageData[];
  };

  // ---------------------------------------------------------
  // DELETE
  // ---------------------------------------------------------

  const deleteImage = async (imageId: string) => {
    const response = await fetch(`${API_URL}/product-images/${imageId}`, {
      method: "DELETE",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Failed to delete image");
    }
  };

  // ---------------------------------------------------------
  // THUMBNAIL
  // ---------------------------------------------------------

  const handleThumbnailChange = async (file: File) => {
    try {
      setUploading(true);

      const uploaded = await uploadImages([file]);
      const newImage = uploaded[0];

      if (!newImage?.id) {
        throw new Error("Uploaded thumbnail ID not returned");
      }

      // Delete previous thumbnail
      if (thumbnailImage?.id) {
        await deleteImage(thumbnailImage.id);
      }

      onThumbnailChange(newImage);
    } catch (error) {
      console.error("Thumbnail change error:", error);
    } finally {
      setUploading(false);
    }
  };

  // ---------------------------------------------------------
  // HERO
  // ---------------------------------------------------------

  const handleHeroChange = async (file: File) => {
    try {
      setUploading(true);

      const uploaded = await uploadImages([file]);
      const newImage = uploaded[0];

      if (!newImage?.id) {
        throw new Error("Uploaded hero image ID not returned");
      }

      // Delete previous hero
      if (heroImage?.id) {
        await deleteImage(heroImage.id);
      }

      onHeroChange(newImage);
    } catch (error) {
      console.error("Hero image change error:", error);
    } finally {
      setUploading(false);
    }
  };

  // ---------------------------------------------------------
  // ADD GALLERY
  // ---------------------------------------------------------

  const handleAddGalleryImages = async (files: File[]) => {
    try {
      setUploading(true);

      const uploaded = await uploadImages(files);

      if (!uploaded.length) {
        throw new Error("No gallery images uploaded");
      }

      onGalleryChange([...galleryImages, ...uploaded]);
    } catch (error) {
      console.error("Gallery upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  // ---------------------------------------------------------
  // REPLACE GALLERY IMAGE
  // ---------------------------------------------------------

  const handleReplaceGalleryImage = async (
    index: number,
    file: File,
  ) => {
    const oldImage = galleryImages[index];

    if (!oldImage?.id) {
      return;
    }

    try {
      setUploading(true);

      // 1. Upload new image
      const uploaded = await uploadImages([file]);
      const newImage = uploaded[0];

      if (!newImage?.id) {
        throw new Error("New gallery image ID not returned");
      }

      // 2. Delete old image
      await deleteImage(oldImage.id);

      // 3. Replace only this gallery position
      const updatedGallery = [...galleryImages];

      updatedGallery[index] = newImage;

      // 4. Send updated gallery to parent
      onGalleryChange(updatedGallery);
    } catch (error) {
      console.error("Gallery image replacement error:", error);
    } finally {
      setUploading(false);
      setChangingGalleryIndex(null);
    }
  };

  // ---------------------------------------------------------
  // REMOVE GALLERY IMAGE
  // ---------------------------------------------------------

  const handleRemoveGalleryImage = async (index: number) => {
    const image = galleryImages[index];

    if (!image?.id) {
      return;
    }

    try {
      setUploading(true);

      await deleteImage(image.id);

      const updatedGallery = galleryImages.filter(
        (_, imageIndex) => imageIndex !== index,
      );

      onGalleryChange(updatedGallery);
    } catch (error) {
      console.error("Gallery image delete error:", error);
    } finally {
      setUploading(false);
    }
  };

  // ---------------------------------------------------------
  // IMAGE URL
  // ---------------------------------------------------------

  const getImageUrl = (image: ImageData) => {
    if (image.url) {
      return image.url;
    }

    if (image.path) {
      return `${API_URL}/${image.path}`;
    }

    return "";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Images</h3>

      {/* Hidden inputs */}
      <input
        ref={thumbnailInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled || uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            handleThumbnailChange(file);
          }

          e.target.value = "";
        }}
      />

      <input
        ref={heroInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled || uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            handleHeroChange(file);
          }

          e.target.value = "";
        }}
      />

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        multiple={changingGalleryIndex === null}
        className="hidden"
        disabled={disabled || uploading}
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);

          if (!files.length) {
            return;
          }

          if (changingGalleryIndex !== null) {
            handleReplaceGalleryImage(
              changingGalleryIndex,
              files[0],
            );
          } else {
            handleAddGalleryImages(files);
          }

          e.target.value = "";
        }}
      />

      {/* ===================================================== */}
      {/* THUMBNAIL + HERO */}
      {/* ===================================================== */}

      <div className="grid grid-cols-2 gap-3">
        {/* Thumbnail */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Thumbnail
          </p>

          <button
            type="button"
            disabled={disabled || uploading}
            className="group relative h-32 w-full overflow-hidden rounded-md border bg-muted"
            onClick={() => thumbnailInputRef.current?.click()}
          >
            {thumbnailImage?.id ? (
              <>
                <img
                  src={getImageUrl(thumbnailImage)}
                  alt="Thumbnail"
                  className="h-full w-full object-cover transition group-hover:opacity-70"
                />

                <span className="absolute inset-0 hidden items-center justify-center bg-black/40 text-xs text-white group-hover:flex">
                  Change
                </span>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                + Add Thumbnail
              </div>
            )}
          </button>
        </div>

        {/* Hero */}
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Hero
          </p>

          <button
            type="button"
            disabled={disabled || uploading}
            className="group relative h-32 w-full overflow-hidden rounded-md border bg-muted"
            onClick={() => heroInputRef.current?.click()}
          >
            {heroImage?.id ? (
              <>
                <img
                  src={getImageUrl(heroImage)}
                  alt="Hero"
                  className="h-full w-full object-cover transition group-hover:opacity-70"
                />

                <span className="absolute inset-0 hidden items-center justify-center bg-black/40 text-xs text-white group-hover:flex">
                  Change
                </span>
              </>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                + Add Hero
              </div>
            )}
          </button>
        </div>
      </div>

      <Separator />

      {/* ===================================================== */}
      {/* GALLERY */}
      {/* ===================================================== */}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Gallery ({galleryImages.length})
          </p>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled || uploading}
            onClick={() => {
              setChangingGalleryIndex(null);
              galleryInputRef.current?.click();
            }}
          >
            + Add Images
          </Button>
        </div>

        {galleryImages.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-md border bg-muted"
              >
                <img
                  src={getImageUrl(image)}
                  alt={`Gallery ${index + 1}`}
                  className="h-full w-full object-cover"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 hidden items-center justify-center gap-1 bg-black/50 group-hover:flex">
                  <button
                    type="button"
                    disabled={disabled || uploading}
                    className="rounded bg-white px-2 py-1 text-xs text-black"
                    onClick={() => {
                      setChangingGalleryIndex(index);
                      galleryInputRef.current?.click();
                    }}
                  >
                    Change
                  </button>

                  <button
                    type="button"
                    disabled={disabled || uploading}
                    className="rounded bg-red-500 px-2 py-1 text-xs text-white"
                    onClick={() => handleRemoveGalleryImage(index)}
                  >
                    Remove
                  </button>
                </div>

                {/* Image number */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                  <span className="text-xs text-white">
                    Image {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled || uploading}
            className="flex h-24 w-full items-center justify-center rounded-md border border-dashed bg-muted text-xs text-muted-foreground hover:bg-muted/70"
            onClick={() => {
              setChangingGalleryIndex(null);
              galleryInputRef.current?.click();
            }}
          >
            + Add Gallery Images
          </button>
        )}
      </div>

      {uploading && (
        <p className="text-xs text-muted-foreground">
          Updating image...
        </p>
      )}
    </div>
  );
}