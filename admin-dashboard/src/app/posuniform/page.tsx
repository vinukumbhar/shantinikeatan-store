"use client";
import { AppSidebar } from "@/components/pos-uniform/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

import { BarcodeCard } from "@/components/pos-uniform/scanned-barcode";
import { useState, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { useBarcodeScanner } from "@/hooks/useBarcodeScanner";

import { ProductImageGallery } from "@/components/pos-uniform/product-Image-gallery";

import products from "@/components/pos-uniform/products.json";

import { usePOSStore } from "@/stores/usePOSStore";

export default function Page() {
  // const [barcode, setBarcode] = useState("");
  // const [scanTime, setScanTime] = useState("");
  // const [timesScanned, setTimesScanned] = useState(0);
  // const [scanStatus, setScanStatus] = useState("Waiting for Scanner");
  const lastBarcodeRef = useRef("");
  // const [cart, setCart] = useState<Record<string, number>>({});
  const {
    barcode,
    scanStatus,
    scanTime,
    timesScanned,
    selectedProduct,
    productFound,
    cart,
    setBarcode,
    setScanStatus,
    setScanTime,
    setTimesScanned,
    setSelectedProduct,
    setProductFound,
    addToCart,
  } = usePOSStore();

  const currentCartQuantity = cart[barcode] || 0;

  const [qtyAdded, setQtyAdded] = useState(0);

  // const [productFound, setProductFound] = useState<boolean | null>(null);

  // const selectedProduct = usePOSStore((state) => state.selectedProduct);
  // const setSelectedProduct = usePOSStore((state) => state.setSelectedProduct);

  const images = [
    "/products/defualt/front.png",
    "/products/defualt/back.png",
    "/products/defualt/side.png",
    "/products/defualt/details.png",
  ];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalItemsInCart = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );

  const handleBarcodeProcess = (code: string) => {
    setBarcode(code);

    // Look up item inside your JSON database file
    const product = products.find((item) => item.barcode === code);

    // Restart timer immediately to clear previous countdown race states
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (product) {
      // 🟢 VALID PRODUCT SCENARIO
      setSelectedProduct(product);
      setProductFound(true);
      setScanStatus("Product Scanned Successfully");
      setQtyAdded(1);

      // // Update cart quantity array metrics
      // setCart((prev) => ({
      //   ...prev,
      //   [code]: (prev[code] || 0) + 1,
      // }));

      addToCart(code);

      // Tracks product continuity to reset the counter
      if (code === lastBarcodeRef.current) {
        // 🟢 FIXED: Pass the numeric calculation straight through to satisfy TypeScript definitions
        setTimesScanned(timesScanned + 1);
      } else {
        lastBarcodeRef.current = code; // Remember this valid product
        setTimesScanned(1); // Resets count cleanly back to 1 for the new product
      }

      setScanTime(new Date().toLocaleTimeString());

      // Schedule basic success layout status reset
      timerRef.current = setTimeout(() => {
        setScanStatus("Waiting for Scanner");
        setQtyAdded(0);
      }, 1500);
    } else {
      // 🔴 INVALID PRODUCT SCENARIO: Blocks cart updates completely
      setSelectedProduct(null);
      setProductFound(false);
      setScanStatus("Product Not Found");
      setTimesScanned(1);

      // CRITICAL FIX: Update the reference to the invalid code so that the next valid scan
      // is guaranteed to look different and force a count reset back to 1
      lastBarcodeRef.current = code;

      // Schedule deep error layout clear-out reset
      timerRef.current = setTimeout(() => {
        setScanStatus("Waiting for Scanner");
        setQtyAdded(0);
        setProductFound(null);
        setSelectedProduct(null);
      }, 1500);
    }

    console.log("Processed Barcode:", code);
  };

  // 2. Pass the exact same function to the hardware hook
  useBarcodeScanner({
    onScan: handleBarcodeProcess,
  });
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "26rem",
          "--sidebar-width-mobile": "18rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="h-55 rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md flex items-center justify-center p-5">
              <div className="w-full">
                <BarcodeCard
                  barcode={barcode}
                  scanStatus={scanStatus}
                  onScan={handleBarcodeProcess}
                />
              </div>
            </div>

            <div className="h-55 rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md">
              <div>
                <div className="flex h-full flex-col p-5">
                  {/* Product Info */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Product
                    </p>

                    <h3
                      className={`mt-2 text-xl font-bold leading-tight ${
                        productFound === false
                          ? "text-red-600"
                          : productFound === null
                            ? "text-muted-foreground"
                            : ""
                      }`}
                    >
                      {productFound === null
                        ? "Scan a Product"
                        : productFound
                          ? selectedProduct?.name
                          : "Product Not Found"}
                    </h3>
                  </div>

                  <Separator className="my-5 opacity-60" />

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border bg-muted/30 p-4 text-center">
                      <p className="text-xs font-medium text-muted-foreground">
                        Times Scanned
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-blue-600">
                        {timesScanned}
                      </h2>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-4 text-center">
                      <p className="text-xs font-medium text-muted-foreground">
                        Current Cart Qty
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-blue-600">
                        {currentCartQuantity}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-55 rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md">
              <div>
                <div className="flex h-full flex-col justify-between p-5">
                  {/* Total Items */}
                  <div className="rounded-xl border bg-muted/20 p-4 text-center transition-colors duration-200 hover:bg-muted/40 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Total Items in Cart
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-blue-600">
                      {totalItemsInCart}
                    </h2>
                  </div>

                  {/* Divider */}
                  <Separator className="my-3.5 opacity-60" />

                  {/* Information */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Last Scan
                      </span>

                      <span className="font-semibold px-2 py-0.5 rounded-md bg-muted/40 border text-xs">
                        {scanTime || "--:--:--"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Scanner Status
                      </span>

                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border border-green-200/50 rounded-full px-2.5 py-0.5 text-[11px]">
                        Connected
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 h-120">
            <div className="col-span-12 lg:col-span-8 rounded-xl bg-muted/50 p-6">
              <div className="grid grid-cols-12 gap-6">
                {/* Left Side - Product Image */}
                <div className="col-span-12 lg:col-span-5">
                  <ProductImageGallery
                    key={selectedProduct?.barcode || "default-gallery"} // 🟢 CRITICAL FIX: Forces the entire component to re-render when a new item is scanned
                    productName={selectedProduct?.name || "Product"}
                    images={selectedProduct?.images || images}
                  />
                </div>

                {/* Right Side */}
                {/* Right Side */}
                <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
                  {/* Product Header */}
                  <div className="space-y-4">
                    <div>
                      {/* Product Name Title Header */}
                      <h2
                        className={`text-3xl font-bold transition-colors ${!selectedProduct ? "text-muted-foreground/40 italic font-medium" : "text-foreground"}`}
                      >
                        {selectedProduct
                          ? selectedProduct.name
                          : "Scan a product "}
                      </h2>

                      {/* Product Price Tag */}
                      <p
                        className={`mt-2 text-3xl font-bold transition-colors ${!selectedProduct ? "text-muted-foreground/30" : "text-primary"}`}
                      >
                        {selectedProduct
                          ? `₹${selectedProduct.price.toFixed(2)}`
                          : "₹--.--"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                      {/* Dynamic Stock Badge Display layout */}
                      {selectedProduct ? (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700 hover:bg-green-100"
                        >
                          🛍 In Stock
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-muted-foreground/40 border-dashed bg-transparent"
                        >
                          ⏹ No Item Active
                        </Badge>
                      )}

                      <span className="text-sm font-medium text-muted-foreground">
                        Stock:
                        <span
                          className={`ml-1 font-semibold ${!selectedProduct ? "text-muted-foreground/40" : "text-foreground"}`}
                        >
                          {selectedProduct
                            ? `${selectedProduct.stock} pcs`
                            : "-- pcs"}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Product Specifications Layout Box Grid */}
                  <div className="rounded-lg border bg-card p-5">
                    <div className="grid grid-cols-2 gap-y-4">
                      <span className="text-sm text-muted-foreground">SKU</span>
                      <span
                        className={`text-sm ${!selectedProduct ? "text-muted-foreground/40 italic" : "font-semibold text-foreground"}`}
                      >
                        {selectedProduct ? selectedProduct.sku : "Not Scanned"}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        Category
                      </span>
                      <span
                        className={`text-sm ${!selectedProduct ? "text-muted-foreground/40 italic" : "font-semibold text-foreground"}`}
                      >
                        {selectedProduct
                          ? selectedProduct.category
                          : "Not Scanned"}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        Brand
                      </span>
                      <span
                        className={`text-sm ${!selectedProduct ? "text-muted-foreground/40 italic" : "font-semibold text-foreground"}`}
                      >
                        {selectedProduct
                          ? selectedProduct.brand
                          : "Not Scanned"}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        Size
                      </span>
                      <span
                        className={`text-sm ${!selectedProduct ? "text-muted-foreground/40 italic" : "font-semibold text-foreground"}`}
                      >
                        {selectedProduct
                          ? selectedProduct.sizes.join(", ")
                          : "Not Scanned"}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        Color
                      </span>
                      <span
                        className={`text-sm ${!selectedProduct ? "text-muted-foreground/40 italic" : "font-semibold text-foreground"}`}
                      >
                        {selectedProduct
                          ? selectedProduct.color
                          : "Not Scanned"}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        Material
                      </span>
                      <span
                        className={`text-sm ${!selectedProduct ? "text-muted-foreground/40 italic" : "font-semibold text-foreground"}`}
                      >
                        {selectedProduct
                          ? selectedProduct.material
                          : "Not Scanned"}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        Barcode
                      </span>
                      <span
                        className={`text-sm ${!selectedProduct ? "text-muted-foreground/40 italic" : "font-semibold text-foreground"}`}
                      >
                        {selectedProduct
                          ? selectedProduct.barcode
                          : "Not Scanned"}
                      </span>

                      <span className="text-sm text-muted-foreground">
                        HSN Code
                      </span>
                      <span
                        className={`text-sm ${!selectedProduct ? "text-muted-foreground/40 italic" : "font-semibold text-foreground"}`}
                      >
                        {selectedProduct ? selectedProduct.hsn : "Not Scanned"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 rounded-xl bg-muted/50">
              <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                {/* Quantity Card */}
                <Card>
                  <CardContent className="p-6 space-y-6">
                    <div>
                      <Label className="text-base font-semibold">
                        Quantity
                      </Label>

                      <div className="mt-4 flex h-12 items-center justify-between rounded-lg border px-4">
                        <Button variant="ghost" size="icon">
                          -
                        </Button>

                        <span className="text-lg font-semibold">1</span>

                        <Button variant="ghost" size="icon">
                          +
                        </Button>
                      </div>
                    </div>

                    <Button
                      className="h-12 w-full justify-between text-base bg-blue-600"
                      size="lg"
                    >
                      <span className="flex items-center gap-2">
                        🛒 Add to Cart
                      </span>

                      <Badge
                        variant="secondary"
                        className="bg-white/15 text-white"
                      >
                        Enter
                      </Badge>
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Information Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Information</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stock</span>

                      <span className="font-semibold">120 pcs</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Rack / Location
                      </span>

                      <span className="font-semibold">A-03 / Shelf 2</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (Tax)</span>

                      <span className="font-semibold">5%</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Cart Quantity
                      </span>

                      <span className="font-semibold">2</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Last Scanned
                      </span>

                      <span className="font-semibold">10:24:35 AM</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          {/* <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
