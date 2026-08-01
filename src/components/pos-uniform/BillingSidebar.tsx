"use client";

import { useState } from "react";
import { usePOSStore } from "@/stores/usePOSStore";
import products from "@/components/pos-uniform/products.json";
import { Trash2, Plus, Minus, Receipt, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ReceiptPreviewModal } from "@/components/pos-uniform/receipt-preview-modal"; // 🟢 Ensure correct import path

export function BillingSidebar() {
  // 🟢 State to control modal visibility
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const { 
    cart, 
    addToCart, 
    setBarcode, 
    setSelectedProduct, 
    setProductFound 
  } = usePOSStore();

  const cartItems = Object.entries(cart)
    .map(([barcodeKey, quantity]) => {
      const targetProduct = products.find((item) => item.barcode === barcodeKey);
      if (!targetProduct || quantity <= 0) return null;
      return {
        ...targetProduct,
        quantity,
        itemTotal: targetProduct.price * quantity,
      };
    })
    .filter(Boolean) as Array<(typeof products)[number] & { quantity: number; itemTotal: number }>;

  const subtotal = cartItems.reduce((acc, currentItem) => acc + currentItem.itemTotal, 0);
  const taxRate = 0.18; 
  const taxAmount = subtotal * taxRate;
  const grandTotal = subtotal + taxAmount;

  // 🟢 Formatted checkout receipt transaction dataset
  const currentBillData = {
    billNo: "INV-" + Math.floor(100000 + Math.random() * 900000), 
    date: new Date().toLocaleDateString("en-IN"),
    time: new Date().toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', hour12: true }),
    cashier: "Admin System",
    counter: "Counter 01",
    items: cartItems.map((item, index) => ({
      sNo: index + 1,
      name: item.name,
      qty: item.quantity,
      rate: item.price,
      amount: item.itemTotal,
    })),
    subtotal: subtotal,
    discount: 0.00,
    tax: taxAmount,
    totalAmount: grandTotal,
  };

  const handleItemSelect = (item: (typeof products)[number]) => {
    setBarcode(item.barcode);
    setSelectedProduct(item);
    setProductFound(true);
  };

  const handleQuantityIncrement = (barcodeString: string) => {
    addToCart(barcodeString);
  };

  const handleQuantityDecrement = (barcodeString: string) => {
    usePOSStore.setState((state) => {
      const currentQty = state.cart[barcodeString] || 0;
      const updatedCart = { ...state.cart };
      
      if (currentQty <= 1) {
        delete updatedCart[barcodeString];
      } else {
        updatedCart[barcodeString] = currentQty - 1;
      }
      
      return { cart: updatedCart };
    });
  };

  const handleLineItemRemoval = (barcodeString: string) => {
    usePOSStore.setState((state) => {
      const updatedCart = { ...state.cart };
      delete updatedCart[barcodeString];
      return { cart: updatedCart };
    });
  };

  return (
    <div className="flex h-full flex-col justify-between p-4 bg-sidebar text-sidebar-foreground">
      {/* HEADER SEGMENT */}
      <div className="flex items-center gap-2 pb-3 border-b">
        <Receipt className="h-5 w-5 text-blue-600" />
        <h2 className="text-base font-bold tracking-tight">Current Billing Session</h2>
      </div>

      {/* ACTIVE BILLING ITEMS SCROLL PANEL */}
      <div className="flex-1 overflow-y-auto my-4 space-y-3 min-h-[300px] max-h-[500px] pr-1">
        {cartItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center border border-dashed rounded-xl p-8 text-center bg-muted/10">
            <p className="text-xs text-muted-foreground font-medium">Cart is currently empty</p>
            <p className="text-[10px] text-muted-foreground/60 mt-0.5">Scan store labels or enter barcodes to register checkout entries</p>
          </div>
        ) : (
          cartItems.map((item) => (
            <div 
              key={item.barcode} 
              className="flex items-center justify-between p-3 rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div 
                onClick={() => handleItemSelect(item)}
                className="flex items-center gap-3 max-w-[65%] cursor-pointer group select-none"
              >
                {/* Thumbnail Wrapper */}
                <div className="relative h-12 w-12 rounded-lg border bg-muted shrink-0 overflow-hidden flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                  {item.images && item.images.length > 0 ? (
                    <Image
                      src={item.images[0]} 
                      alt={item.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-muted-foreground/40" />
                  )}
                </div>

                {/* Name & Metadata Details */}
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold leading-tight truncate text-foreground group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-mono">SKU: {item.sku}</p>
                  <p className="text-[11px] font-extrabold text-blue-600">₹{item.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Right Segment: Quantity Modification Tickers */}
              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-lg bg-muted/30 overflow-hidden h-7">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityDecrement(item.barcode)}
                    className="h-full w-6 rounded-none p-0 hover:bg-muted"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-xs font-bold px-2 min-w-[24px] text-center tabular-nums text-foreground">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityIncrement(item.barcode)}
                    className="h-full w-6 rounded-none p-0 hover:bg-muted"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleLineItemRemoval(item.barcode)}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* TRANSACTION AGGREGATE SUMMARY SECTION */}
      <div className="border-t pt-4 space-y-3 bg-sidebar">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span className="font-medium">Subtotal</span>
            <span className="font-semibold tabular-nums">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span className="font-medium">GST / Taxes (18%)</span>
            <span className="font-semibold tabular-nums">₹{taxAmount.toFixed(2)}</span>
          </div>
          <Separator className="my-1 opacity-60" />
          <div className="flex justify-between text-sm">
            <span className="font-bold text-foreground">Grand Total</span>
            <span className="font-black text-blue-600 text-base tabular-nums">₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* 🟢 Click event linked to hook state toggles */}
        <Button 
          className="w-full mt-2 h-10 font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm tracking-wide text-xs uppercase"
          disabled={cartItems.length === 0}
          onClick={() => {
            console.log("Invoice Generated Total:", grandTotal);
            setIsReceiptOpen(true);
          }}
        >
          Proceed to Invoice & Pay
        </Button>
      </div>

      {/* 🟢 Receipt Preview Modal Component Injection */}
      <ReceiptPreviewModal 
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        billData={currentBillData}
      />
    </div>
  );
}
