import { create } from "zustand";
import products from "@/components/pos-uniform/products.json";

type Product = (typeof products)[number];

interface POSStore {
  // Scanner
  barcode: string;
  scanStatus: string;
  scanTime: string;
  timesScanned: number;

  // Product
  selectedProduct: Product | null;
  productFound: boolean | null;

  // Cart
  cart: Record<string, number>;

  // Actions
  setBarcode: (barcode: string) => void;
  setScanStatus: (status: string) => void;
  setScanTime: (time: string) => void;
  setTimesScanned: (count: number) => void;

  setSelectedProduct: (product: Product | null) => void;
  setProductFound: (found: boolean | null) => void;

  addToCart: (barcode: string) => void;
  clearCart: () => void;
}

export const usePOSStore = create<POSStore>((set) => ({
  barcode: "",
  scanStatus: "Waiting for Scanner",
  scanTime: "",
  timesScanned: 0,

  selectedProduct: null,
  productFound: null,

  cart: {},

  setBarcode: (barcode) => set({ barcode }),

  setScanStatus: (scanStatus) => set({ scanStatus }),

  setScanTime: (scanTime) => set({ scanTime }),

  setTimesScanned: (timesScanned) => set({ timesScanned }),

  setSelectedProduct: (selectedProduct) =>
    set({ selectedProduct }),

  setProductFound: (productFound) =>
    set({ productFound }),

  addToCart: (barcode) =>
    set((state) => ({
      cart: {
        ...state.cart,
        [barcode]: (state.cart[barcode] || 0) + 1,
      },
    })),

  clearCart: () => set({ cart: {} }),
}));