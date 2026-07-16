"use client";
import { AppSidebar } from "@/components/app-sidebar";
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

import products from "@/data/products.json";

export default function Page() {
  const [barcode, setBarcode] = useState("");
  const [scanTime, setScanTime] = useState("");
  const [timesScanned, setTimesScanned] = useState(0);
  const [scanStatus, setScanStatus] = useState("Waiting for Scanner");
  const lastBarcodeRef = useRef("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const currentCartQuantity = cart[barcode] || 0;
  const [qtyAdded, setQtyAdded] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[number] | null
  >(null);

  const images = [
    "/products/shirt/front.png",
    "/products/shirt/back.png",
    "/products/shirt/collar.png",
    "/products/shirt/fabric.png",
  ];

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalItemsInCart = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );
  // 1. Create a single shared handler function
  const handleBarcodeProcess = (code: string) => {
    setBarcode(code);
    setScanTime(new Date().toLocaleTimeString());

    // Each scan adds one item
    setQtyAdded(1);

    // Update cart quantity
    setCart((prev) => ({
      ...prev,
      [code]: (prev[code] || 0) + 1,
    }));

    // Check if the same barcode was scanned
    if (code === lastBarcodeRef.current) {
      setTimesScanned((prev) => prev + 1);
    } else {
      lastBarcodeRef.current = code;
      setTimesScanned(1);
    }

    // Show success message
    setScanStatus("Product Scanned Successfully");

    // Restart timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setScanStatus("Waiting for Scanner");
      setQtyAdded(0);
    }, 1500);

    console.log("Processed Barcode:", code);
  };

  

  // 2. Pass the exact same function to the hardware hook
  useBarcodeScanner({
    onScan: handleBarcodeProcess,
  });
  useBarcodeScanner({
    onScan: (code) => {
      setBarcode(code);
      setScanTime(new Date().toLocaleTimeString());

      // Each scan adds one item
      setQtyAdded(1);

      // Update cart quantity
      setCart((prev) => ({
        ...prev,
        [code]: (prev[code] || 0) + 1,
      }));

      // Check if the same barcode was scanned
      if (code === lastBarcodeRef.current) {
        setTimesScanned((prev) => prev + 1);
      } else {
        lastBarcodeRef.current = code;
        setTimesScanned(1);
      }

      // Show success message
      setScanStatus("Product Scanned Successfully");

      // Restart timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setScanStatus("Waiting for Scanner");
        setQtyAdded(0);
      }, 1500);

      console.log("Scanned:", code);
    },
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
            <div className="h-55 rounded-xl bg-muted/50">
              <BarcodeCard
                barcode={barcode}
                scanStatus={scanStatus}
                onScan={handleBarcodeProcess} // Added this missing link!
              />
            </div>

            <div className="h-55  rounded-xl bg-muted/50">
              <div>
                <div className="flex h-full flex-col p-5">
                  {/* Product Info */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Product
                    </p>

                    <h3 className="mt-2 text-xl font-bold leading-tight">
                      School Shirt (Full Sleeve)
                    </h3>
                  </div>

                  <Separator className="my-5" />

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
            <div className="h-55 rounded-xl bg-muted/50">
              {" "}
              <div>
                <div className="flex h-full flex-col p-5">
                  {/* Total Items */}
                  <div className="rounded-lg border bg-muted/30 p-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Total Items in Cart
                    </p>

                    <h2 className="mt-2 text-4xl font-bold text-blue-600">
                      {totalItemsInCart}
                    </h2>
                  </div>

                  {/* Divider */}
                  <Separator className="my-5" />

                  {/* Information */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Last Scan
                      </span>

                      <span className="font-semibold">
                        {scanTime || "--:--:--"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Scanner Status
                      </span>

                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
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
                    productName="School Shirt (Full Sleeve)"
                    images={images}
                  />
                </div>

                {/* Right Side */}
                <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
                  {/* Product Header */}
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-3xl font-bold">
                        School Shirt (Full Sleeve)
                      </h2>

                      <p className="mt-2 text-3xl font-bold text-primary">
                        ₹450.00
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-b pb-4">
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 hover:bg-green-100"
                      >
                        🛍 In Stock
                      </Badge>

                      <span className="text-sm font-medium text-muted-foreground">
                        Stock:
                        <span className="ml-1 font-semibold text-foreground">
                          120 pcs
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Product Specifications */}
                  <div className="rounded-lg border bg-card p-5">
                    <div className="grid grid-cols-2 gap-y-4">
                      <span className="text-sm text-muted-foreground">SKU</span>
                      <span className="text-sm font-semibold">UNI-20001</span>

                      <span className="text-sm text-muted-foreground">
                        Category
                      </span>
                      <span className="text-sm font-semibold">Uniforms</span>

                      <span className="text-sm text-muted-foreground">
                        Brand
                      </span>
                      <span className="text-sm font-semibold">SchoolHub</span>

                      <span className="text-sm text-muted-foreground">
                        Size
                      </span>
                      <span className="text-sm font-semibold">
                        S, M, L, XL, XXL
                      </span>

                      <span className="text-sm text-muted-foreground">
                        Color
                      </span>
                      <span className="text-sm font-semibold">Light Blue</span>

                      <span className="text-sm text-muted-foreground">
                        Material
                      </span>
                      <span className="text-sm font-semibold">
                        Cotton Blend
                      </span>

                      <span className="text-sm text-muted-foreground">
                        Barcode
                      </span>
                      <span className="text-sm font-semibold">
                        8901234567890
                      </span>

                      <span className="text-sm text-muted-foreground">
                        HSN Code
                      </span>
                      <span className="text-sm font-semibold">62052000</span>
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
