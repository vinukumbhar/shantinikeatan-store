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

import { BarcodeCard } from "@/components/pos-uniform/scanned-barcode";
import { useState, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { useBarcodeScanner } from "@/hooks/useBarcodeScanner";

export default function Page() {
  const [barcode, setBarcode] = useState("");
  const [scanTime, setScanTime] = useState("");
  const [timesScanned, setTimesScanned] = useState(0);
  const [scanStatus, setScanStatus] = useState("Waiting for Scanner");
  const lastBarcodeRef = useRef("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const currentCartQuantity = cart[barcode] || 0;
  const [qtyAdded, setQtyAdded] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalItemsInCart = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0,
  );

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
              <BarcodeCard barcode={barcode} scanStatus={scanStatus} />
            </div>

            <div className="h-55  rounded-xl bg-muted/50">
              <div>
                {/* <div className="flex flex-col items-start gap-2">
                  <span className="text-sm font-semibold  text-muted-foreground mt-8">
                    Product
                  </span>
                  <h3 className="text-lg font-bold text-foreground mt-2">
                    School Shirt(Full Sleeve)
                  </h3>

                  <div className="flex flex-row ">
                 

                     <div className="flex flex-col items-center mt-8">
                      <span className="text-sm font-medium text-muted-foreground text-center">
                        Times Scanned
                      </span>
                      <h2 className="text-2xl font-bold text-blue-600">
                        {timesScanned}
                      </h2>
                    </div>

                    <div className="flex flex-col ml-6 items-center mt-8">
                      <span className="text-sm font-medium text-muted-foreground text-center">
                        Current Cart Quantity
                      </span>
                      <h2 className="text-2xl font-bold text-blue-600">
                        {currentCartQuantity}
                      </h2>
                    </div>
                  </div>
                </div> */}

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
                {/* <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-row ">
                

                    <div className="flex flex-col ml-6 items-center">
                      <span className="text-sm font-medium text-muted-foreground text-center">
                        Total Items In Cart
                      </span>
                      <h2 className="text-2xl font-bold text-blue-600">
                        {totalItemsInCart}
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-col ">
                    <div className="flex items-center gap-18">
                      <span className="text-sm font-medium text-muted-foreground">
                        Last Scan:
                      </span>

                      <span className="text-sm font-semibold">
                        {scanTime || "--:--:--"}
                      </span>
                    </div>

                    <div className="flex flex-row  items-center">
                      <span className="text-sm font-medium text-muted-foreground text-center">
                        Scanner Status
                      </span>
                      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 ml-6">
                        Connected
                      </Badge>
                    </div>
                  </div>
                </div> */}

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
            <div className="  col-span-12 lg:col-span-8 rounded-xl bg-muted/50  ">
              First
            </div>

            <div className="col-span-12 lg:col-span-4 rounded-xl bg-muted/50">
              Second
            </div>
          </div>
          <div className="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
