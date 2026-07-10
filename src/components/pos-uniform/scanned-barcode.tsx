"use client";

import Barcode from "react-barcode";
import { CircleCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BarcodeCardProps {
  barcode: string;
  scanStatus: string;
}
export function BarcodeCard({ barcode, scanStatus, }: BarcodeCardProps) {
  const hasBarcode = barcode.trim().length > 0;

  return (
    <Card className="w-full shadow-none border-0">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2">
          <CircleCheck
            className={`h-5 w-5 ${
              scanStatus === "Product Scanned Successfully"
                ? "text-green-600"
                : "text-muted-foreground"
            }`}
          />

          <span
            className={`text-sm font-semibold ${
              scanStatus === "Product Scanned Successfully"
                ? "text-green-600"
                : "text-muted-foreground"
            }`}
          >
            {scanStatus}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div>
          <p className="text-xs font-bold text-blue-600 mb-2">
            Scanned Barcode
          </p>

          {hasBarcode ? (
            <>
              <Barcode
                value={barcode}
                width={2.5}
                height={60}
                displayValue={false}
                margin={0}
                background="white"
              />

              <p className="mt-4 text-xl font-bold tracking-widest">
                {barcode}
              </p>
            </>
          ) : (
            <div className="h-[90px] flex items-center justify-center rounded-md border border-dashed">
              <p className="text-sm text-muted-foreground">
                Scan a product barcode...
              </p>
            </div>
          )}
          <p className="text-xs font-medium text-muted-foreground mt-2">
            Scan a product barcode or Qr code to add item to cart
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
