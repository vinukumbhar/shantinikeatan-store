"use client";

import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Trash2 } from "lucide-react";
import { useProductStore } from "../store/product-store";

export default function DefaultImageDropzone() {
  const images = useProductStore((state) => state.images);
  const addImages = useProductStore((state) => state.addImages);
  const removeImage = useProductStore((state) => state.removeImage);
  const defaultImages = useProductStore((state) => state.defaultImages);
  const setDefaultHeroImage = useProductStore((state) => state.setDefaultHeroImage);
  const setDefaultThumbnail = useProductStore((state) => state.setDefaultThumbnail);

  // Safeguard against key duplication warnings by filtering unique IDs
  const uniqueImages = useMemo(() => {
    const seen = new Set<string>();
    return images.filter((img) => {
      if (!img.id || seen.has(img.id)) return false;
      seen.add(img.id);
      return true;
    });
  }, [images]);

  const heroImage = uniqueImages.find((img) => img.id === defaultImages.heroImageId);
  const thumbnailImage = uniqueImages.find((img) => img.id === defaultImages.thumbnailId);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const uploadedImages = acceptedFiles.map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));

      addImages(uploadedImages);
    },
    [addImages]
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
      {/* Upload Dropzone Box */}
      <div
        {...getRootProps()}
        className={`flex h-40 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-all ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/40"
        }`}
      >
        <input {...getInputProps()} />

        <div className="text-center">
          <ImagePlus className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-medium">
            {isDragActive ? "Drop default images here..." : "Drag & Drop Default Images"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {uniqueImages.length} Total Default Images Uploaded
          </p>
        </div>
      </div>

      {/* Default Hero & Thumbnail Display Previews */}
      {uniqueImages.length > 0 && (
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground/80">Default Hero Image</h3>
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted/30">
              {heroImage ? (
                <img src={heroImage.preview} alt="Default Hero" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  Not Selected
                </div>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground/80">Default Thumbnail Image</h3>
            <div className="aspect-square overflow-hidden rounded-lg border bg-muted/30">
              {thumbnailImage ? (
                <img src={thumbnailImage.preview} alt="Default Thumbnail" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  Not Selected
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Default Gallery Grid View */}
      {uniqueImages.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground/80">Uploaded Product Images</h3>

          <div className="grid grid-cols-4 gap-4">
            {uniqueImages.map((image) => {
              const isHero = defaultImages.heroImageId === image.id;
              const isThumbnail = defaultImages.thumbnailId === image.id;

              return (
                <div key={image.id} className="group relative flex flex-col space-y-2">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
                    <img src={image.preview} alt="Product Gallery" className="h-full w-full object-cover" />

                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute right-1.5 top-1.5 rounded-md border bg-background/90 p-1.5 text-destructive opacity-0 backdrop-blur-sm transition-opacity hover:bg-destructive hover:text-destructive-foreground group-hover:opacity-100 shadow-sm"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => setDefaultHeroImage(isHero ? undefined : image.id)}
                      className={`w-full rounded border py-1 text-[11px] font-medium transition ${
                        isHero
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {isHero ? "✓ Hero" : "Set Hero"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setDefaultThumbnail(isThumbnail ? undefined : image.id)}
                      className={`w-full rounded border py-1 text-[11px] font-medium transition ${
                        isThumbnail
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background text-foreground hover:bg-muted"
                      }`}
                    >
                      {isThumbnail ? "✓ Thumbnail" : "Set Thumbnail"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}