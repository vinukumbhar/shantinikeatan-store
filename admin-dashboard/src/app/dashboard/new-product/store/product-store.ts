

import { create } from "zustand";

// --- Interfaces ---

export interface ProductDefaultImages {
  // Default Product Gallery (Maximum 4)
  imageIds: string[];
  // Product Listing Image
  thumbnailId?: string;
  // Product Details Hero Image
  heroImageId?: string;
}

export interface ProductImage {
  id: string;
  file: File;
  preview: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  barcode: string;
  attributes: Record<string, string>;
  sellingPrice: number;
  costPrice: number;
  openingStock: number;
  // Gallery Images (Maximum 5)
  imageIds: string[];
  // Product Listing Image
  thumbnailId?: string;
  // Product Details Main Image
  heroImageId?: string;
}

export interface MasterData {
  categories: any[];
  brands: any[];
  units: any[];
  attributes: any[];
  attributeValues: any[];
}

export interface BasicInformation {
  productName: string;
  sku: string;
  categoryIds: string[];
  brandId: string;
  unitId: string;
  description: string;
  trackInventory: boolean;
  isActive: boolean;
}

export interface VariantAttribute {
  attributeId: string;
  attributeValues: string[];
}

// --- Initial States ---

const initialDefaultImages: ProductDefaultImages = {
  imageIds: [],
  thumbnailId: undefined,
  heroImageId: undefined,
};

const initialMasterData: MasterData = {
  categories: [],
  brands: [],
  units: [],
  attributes: [],
  attributeValues: [],
};

const initialBasicInformation: BasicInformation = {
  productName: "",
  sku: "",
  categoryIds: [],
  brandId: "",
  unitId: "",
  description: "",
  trackInventory: true,
  isActive: true,
};

const initialVariants: VariantAttribute[] = [
  {
    attributeId: "",
    attributeValues: [],
  },
];

const initialProductVariants: ProductVariant[] = [];
const initialImages: ProductImage[] = [];

// --- Store Interface ---

interface ProductStore {
  
  
  // Default Images State & Actions
  defaultImages: ProductDefaultImages;
  setDefaultImages: (data: ProductDefaultImages) => void;
  assignDefaultImages: (imageIds: string[]) => void;
  setDefaultThumbnail: (imageId?: string) => void;
  setDefaultHeroImage: (imageId?: string) => void;

  // Master Data
  masterData: MasterData;
  setMasterData: (data: MasterData) => void;

  // Basic Information
  basicInformation: BasicInformation;
  setBasicInformation: (data: BasicInformation) => void;
  updateBasicInformation: (data: Partial<BasicInformation>) => void;

  // Variant Definition
  variants: VariantAttribute[];
  setVariants: (variants: VariantAttribute[]) => void;

  // Generated Variants
  productVariants: ProductVariant[];
  setProductVariants: (variants: ProductVariant[]) => void;
  updateVariant: (id: string, data: Partial<ProductVariant>) => void;
  updateVariants: (ids: string[], data: Partial<ProductVariant>) => void;

  // Global Images
  images: ProductImage[];
  setImages: (images: ProductImage[]) => void;
  addImages: (images: ProductImage[]) => void;
  removeImage: (imageId: string) => void;

  // Variant Image Assignment
  assignImagesToVariant: (variantId: string, imageIds: string[]) => void;
  assignImagesToVariants: (variantIds: string[], imageIds: string[]) => void;
  setVariantThumbnail: (variantId: string, thumbnailId?: string) => void;
  setVariantHeroImage: (variantId: string, heroImageId?: string) => void;

  // Reset State
  resetStore: () => void;
}

// --- Store Implementation ---

export const useProductStore = create<ProductStore>((set) => ({
// Default Images State
  defaultImages: initialDefaultImages,

  setDefaultImages: (data) =>
    set({
      defaultImages: data,
    }),

  assignDefaultImages: (imageIds) =>
    set((state) => {
      // Keep existing thumbnail/hero if they are still in the new array
      const currentThumbnailValid =
        state.defaultImages.thumbnailId &&
        imageIds.includes(state.defaultImages.thumbnailId);

      const currentHeroValid =
        state.defaultImages.heroImageId &&
        imageIds.includes(state.defaultImages.heroImageId);

      return {
        defaultImages: {
          imageIds,
          // Safely fallback to first image or undefined if array is empty
          thumbnailId: currentThumbnailValid
            ? state.defaultImages.thumbnailId
            : imageIds[0] ?? undefined,
          // Safely fallback to second image, first image, or undefined
          heroImageId: currentHeroValid
            ? state.defaultImages.heroImageId
            : imageIds[1] ?? imageIds[0] ?? undefined,
        },
      };
    }),

  setDefaultThumbnail: (imageId) =>
    set((state) => ({
      defaultImages: {
        ...state.defaultImages,
        thumbnailId: imageId,
      },
    })),

  setDefaultHeroImage: (imageId) =>
    set((state) => ({
      defaultImages: {
        ...state.defaultImages,
        heroImageId: imageId,
      },
    })),
  // Master
  masterData: initialMasterData,
  setMasterData: (data) => set({ masterData: data }),

  // Basic Information
  basicInformation: initialBasicInformation,
  setBasicInformation: (data) => set({ basicInformation: data }),
  updateBasicInformation: (data) =>
    set((state) => ({
      basicInformation: {
        ...state.basicInformation,
        ...data,
      },
    })),

  // Variant Definition
  variants: initialVariants,
  setVariants: (variants) => set({ variants }),

  // Generated Variants
  productVariants: initialProductVariants,
  setProductVariants: (variants) => set({ productVariants: variants }),

  updateVariant: (id, data) =>
    set((state) => ({
      productVariants: state.productVariants.map((variant) =>
        variant.id === id ? { ...variant, ...data } : variant,
      ),
    })),

  updateVariants: (ids, data) =>
    set((state) => ({
      productVariants: state.productVariants.map((variant) =>
        ids.includes(variant.id) ? { ...variant, ...data } : variant,
      ),
    })),

  // Images
  images: initialImages,
  setImages: (images) => set({ images }),
  addImages: (images) =>
    set((state) => ({
      images: [...state.images, ...images],
    })),

  removeImage: (imageId) =>
    set((state) => ({
      images: state.images.filter((image) => image.id !== imageId),

      // Cleanup Default Images
      defaultImages: {
        ...state.defaultImages,
        imageIds: state.defaultImages.imageIds.filter((id) => id !== imageId),
        thumbnailId:
          state.defaultImages.thumbnailId === imageId
            ? undefined
            : state.defaultImages.thumbnailId,
        heroImageId:
          state.defaultImages.heroImageId === imageId
            ? undefined
            : state.defaultImages.heroImageId,
      },

      // Cleanup Variant Images
      productVariants: state.productVariants.map((variant) => ({
        ...variant,
        imageIds: variant.imageIds.filter((id) => id !== imageId),
        thumbnailId:
          variant.thumbnailId === imageId ? undefined : variant.thumbnailId,
        heroImageId:
          variant.heroImageId === imageId ? undefined : variant.heroImageId,
      })),
    })),

  // Assign Images to Variants
  assignImagesToVariant: (variantId, imageIds) =>
    set((state) => ({
      productVariants: state.productVariants.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              imageIds,
              thumbnailId:
                variant.thumbnailId && imageIds.includes(variant.thumbnailId)
                  ? variant.thumbnailId
                  : imageIds[0],
              heroImageId:
                variant.heroImageId && imageIds.includes(variant.heroImageId)
                  ? variant.heroImageId
                  : imageIds[1] ?? imageIds[0],
            }
          : variant,
      ),
    })),

  assignImagesToVariants: (variantIds, imageIds) =>
    set((state) => ({
      productVariants: state.productVariants.map((variant) =>
        variantIds.includes(variant.id)
          ? {
              ...variant,
              imageIds,
            }
          : variant,
      ),
    })),

  setVariantThumbnail: (variantId, thumbnailId) =>
    set((state) => ({
      productVariants: state.productVariants.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              thumbnailId,
            }
          : variant,
      ),
    })),

  setVariantHeroImage: (variantId, heroImageId) =>
    set((state) => ({
      productVariants: state.productVariants.map((variant) =>
        variant.id === variantId
          ? {
              ...variant,
              heroImageId,
            }
          : variant,
      ),
    })),

  // Reset State Action
  resetStore: () =>
    set({
      defaultImages: initialDefaultImages,
      masterData: initialMasterData,
      basicInformation: initialBasicInformation,
      variants: initialVariants,
      productVariants: initialProductVariants,
      images: initialImages,
    }),


    
}));