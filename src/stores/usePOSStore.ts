import { create } from "zustand";
import products from "@/components/pos-uniform/products.json";

type Product = (typeof products)[number];

interface POSStore {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

export const usePOSStore = create<POSStore>((set) => ({
  selectedProduct: null,

  setSelectedProduct: (product) =>
    set({
      selectedProduct: product,
    }),
}));