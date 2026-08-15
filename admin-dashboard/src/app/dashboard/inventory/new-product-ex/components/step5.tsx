"use client";

import axios from "@/lib/axios";
import VariantTable from "../components/variant-table";
import { useProductStore } from "../store/product-store";

import ProductImagesPreview from "./ProductImagesPreview";

import { useState } from "react";

interface StepTwoFormProps {
  onNext: () => void;
}

export default function Step5({ onNext }: StepTwoFormProps) {
  const basicInformation = useProductStore((state) => state.basicInformation);

  const ProductVariants = useProductStore((state) => state.productVariants);
  const Images = useProductStore((state) => state.images);

  const DefaultImages = useProductStore((state) => state.defaultImages);

  const { setImages, setDefaultImages, setProductVariants } = useProductStore();

  const [showPreview, setShowPreview] = useState(false);
  const masterData = useProductStore((state) => state.masterData);

  const handleSave = async () => {
    try {
      // =========================================================
      // 1. Create Product
      // =========================================================

      const productSku =
        ProductVariants.length === 1
          ? ProductVariants[0].sku
          : basicInformation.sku || undefined;

      const { data: product } = await axios.post(
        "http://localhost:8000/products",
        {
          name: basicInformation.productName,
          // Use the generated variant SKU
          sku: productSku,
          description: basicInformation.description || undefined,
          brandId: basicInformation.brandId || undefined,
          categoryIds: basicInformation.categoryIds,
          unitId: basicInformation.unitId || undefined,
          hasVariants: true,
          trackInventory: basicInformation.trackInventory,
          allowBackorder: false,
          isActive: basicInformation.isActive,
        },
      );

      console.log("Product Created", product);

      // =========================================================
      // 2. Upload All Images
      // =========================================================

      const imageIdMap: Record<string, string> = {};

      for (const image of Images) {
        const formData = new FormData();

        formData.append("files", image.file);
        formData.append("productId", product.id);
        formData.append("path", `/uploads/products/${image.file.name}`);

        const { data } = await axios.post(
          "http://localhost:8000/product-images/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        imageIdMap[image.id] = data[0].id;
      }

      // =========================================================
      // 3. Update Image IDs & Prefix Product Code
      // =========================================================

      const updatedImages = Images.map((image) => ({
        ...image,
        id: imageIdMap[image.id],
      }));

      const updatedDefaultImages = {
        imageIds: DefaultImages.imageIds.map((id) => imageIdMap[id]),
        thumbnailId: DefaultImages.thumbnailId
          ? imageIdMap[DefaultImages.thumbnailId]
          : undefined,
        heroImageId: DefaultImages.heroImageId
          ? imageIdMap[DefaultImages.heroImageId]
          : undefined,
      };

      const updatedVariants = ProductVariants.map((variant) => ({
        ...variant,

        // Prefix Product Code to Existing Barcode
        barcode: `${variant.barcode}`,

        imageIds: variant.imageIds.map((id) => imageIdMap[id]),

        thumbnailId: variant.thumbnailId
          ? imageIdMap[variant.thumbnailId]
          : undefined,

        heroImageId: variant.heroImageId
          ? imageIdMap[variant.heroImageId]
          : undefined,
      }));

      // Update Zustand immediately so barcode is available everywhere
      setImages(updatedImages);
      setDefaultImages(updatedDefaultImages);
      setProductVariants(updatedVariants);

      // =========================================================
      // 4. Save Product Images
      // =========================================================

      await axios.patch(`http://localhost:8000/products/${product.id}`, {
        galleryImageIds: updatedDefaultImages.imageIds,
        thumbnailImageId: updatedDefaultImages.thumbnailId,
        heroImageId: updatedDefaultImages.heroImageId,
      });

      // =========================================================
      // 5. Save Variants + Primary Barcode
      // =========================================================

      for (const variant of updatedVariants) {
        const attributes = Object.entries(variant.attributes)
          .map(([attributeName, skuCode]) => {
            const attribute = masterData.attributes.find(
              (a) => a.name === attributeName,
            );

            if (!attribute) return null;

            const value = masterData.attributeValues.find(
              (v) => v.attributeId === attribute.id && v.skuCode === skuCode,
            );

            if (!value) return null;

            return {
              attributeId: attribute.id,
              attributeValueId: value.id,
            };
          })
          .filter(
            (
              item,
            ): item is {
              attributeId: string;
              attributeValueId: string;
            } => item !== null,
          );

        // Create Variant
        const { data: createdVariant } = await axios.post(
          "http://localhost:8000/product-variants",
          {
            productId: product.id,
            sku: variant.sku,

            attributes,

            galleryImageIds: variant.imageIds,
            thumbnailImageId: variant.thumbnailId,
            heroImageId: variant.heroImageId,

            isActive: true,
          },
        );

        // Create Barcode
        await axios.post("http://localhost:8000/barcodes", {
          variantId: createdVariant.id,
          barcode: variant.barcode,
          type: "CODE128",
          isPrimary: true,
        });
      }

      console.log("Completed Successfully");

      setShowPreview(true);
    } catch (error: any) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="space-y-4 rounded border p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Step 5 - Review Variants</h2>

        <button
          onClick={handleSave}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Save Product
        </button>

        <button
          onClick={handleSave}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Save Images
        </button>
      </div>

      <VariantTable mode="full" />

      {showPreview && <ProductImagesPreview />}
    </div>
  );
}
