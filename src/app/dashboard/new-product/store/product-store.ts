import { create } from "zustand";

export interface ProductVariant {
  id: string;
  sku: string;
  barcode: string;

  attributes: Record<string, string>;

  sellingPrice: number;
  costPrice: number;
  openingStock: number;
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

interface ProductStore {
  // Master Data
  masterData: MasterData;
  setMasterData: (data: MasterData) => void;

  // Product Data
  basicInformation: BasicInformation;
  setBasicInformation: (data: BasicInformation) => void;
  updateBasicInformation: (
    data: Partial<BasicInformation>
  ) => void;

  // Variants
  variants: VariantAttribute[];
  setVariants: (variants: VariantAttribute[]) => void;

  // Generated Variant Rows (Step 3)
  productVariants: ProductVariant[];
  setProductVariants: (variants: ProductVariant[]) => void;

  updateVariant: (
  id: string,
  data: Partial<ProductVariant>,
) => void;

updateVariants: (
  ids: string[],
  data: Partial<ProductVariant>,
) => void;


}

export const useProductStore = create<ProductStore>((set) => ({
  // Master Data
  masterData: initialMasterData,

  setMasterData: (data) =>
    set({
      masterData: data,
    }),

  // Basic Information
  basicInformation: initialBasicInformation,

  setBasicInformation: (data) =>
    set({
      basicInformation: data,
    }),

  updateBasicInformation: (data) =>
    set((state) => ({
      basicInformation: {
        ...state.basicInformation,
        ...data,
      },
    })),



  // Variants
  variants: initialVariants,

  setVariants: (variants) =>
    set({
      variants,
    }),

  productVariants: initialProductVariants,

  setProductVariants: (variants) =>
    set({
      productVariants: variants,
    }),

     updateVariant: (id, data) =>
      set((state) => ({
        productVariants: state.productVariants.map((variant) =>
          variant.id === id
            ? {
                ...variant,
                ...data,
              }
            : variant,
        ),
      })),

    updateVariants: (ids, data) =>
      set((state) => ({
        productVariants: state.productVariants.map((variant) =>
          ids.includes(variant.id)
            ? {
                ...variant,
                ...data,
              }
            : variant,
        ),
      })),



    
}));

