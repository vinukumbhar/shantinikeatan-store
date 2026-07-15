"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="flex h-[380px] items-center justify-center rounded-xl border bg-muted/20 p-4">
        <Image
          src={selectedImage}
          alt={productName}
          width={350}
          height={350}
          className="max-h-full w-auto object-contain"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "overflow-hidden rounded-lg border-2 transition-all",
              selectedImage === image
                ? "border-primary"
                : "border-transparent hover:border-muted-foreground"
            )}
          >
            <Image
              src={image}
              alt={`${productName} ${index + 1}`}
              width={70}
              height={70}
              className="h-[70px] w-[70px] object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}