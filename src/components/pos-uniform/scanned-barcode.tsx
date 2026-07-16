"use client";

import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { CircleCheck } from "lucide-react";

import { Input } from "@/components/ui/input";

interface BarcodeCardProps {
  barcode: string;
  scanStatus: string;
  onScan: (barcode: string) => void;
}

export function BarcodeCard({ barcode, scanStatus, onScan }: BarcodeCardProps) {
  const [manualBarcode, setManualBarcode] = useState(barcode);

  useEffect(() => {
    setManualBarcode(barcode);
  }, [barcode]);

  const trimmedBarcode = manualBarcode.trim();
  const hasBarcode = trimmedBarcode.length > 0;

  const handleSubmit = () => {
    if (!trimmedBarcode) return;
    onScan(trimmedBarcode);
  };

  return (
    // 🟢 FIXED: Swapped out outer <Card> wrapper for a clean un-bordered layout shell
    <div className="w-full bg-transparent p-0">
      
      {/* 🟢 FIXED: Replaced <CardHeader> with a clean plain div block to strip secondary borders */}
      <div className="p-0 mb-1 ml-4">
        <div className="flex items-center gap-1.5">
          <CircleCheck
            className={`h-5 w-5 ${
              scanStatus === "Product Scanned Successfully"
                ? "text-green-600"
                : "text-muted-foreground"
            }`}
          />
          <span
            className={`text-[14px] font-semibold ${
              scanStatus === "Product Scanned Successfully"
                ? "text-green-600"
                : "text-muted-foreground"
            }`}
          >
            {scanStatus}
          </span>
        </div>
      </div>

      {/* 🟢 FIXED: Replaced <CardContent> with a clean plain padding container */}
      <div className="pt-1 pb-1">
        <div>
          <div className="flex flex-col items-center justify-center py-1">
            <p className="mb-1 text-[12px] font-bold text-blue-600">
              Scanned Barcode
            </p>
            
            {hasBarcode ? (
              <div className="overflow-x-auto w-full flex justify-center mb-1">
                <Barcode
                  value={trimmedBarcode}
                  format="CODE128"
                  width={trimmedBarcode.length > 15 ? 1.5 : 2.2}
                  height={35}
                  displayValue={false}
                  margin={0}
                  background="white"
                />
              </div>
            ) : (
              <div className="flex h-[45px] w-full items-center justify-center rounded-md border border-dashed mb-1">
                <p className="text-xs text-muted-foreground">
                  Scan a product barcode...
                </p>
              </div>
            )}

            <div className="w-full max-w-[280px]">
              <Input
                type="text"
                placeholder="Enter barcode"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                className="h-5 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 text-center text-sm font-bold tracking-widest break-all text-foreground placeholder:tracking-normal placeholder:font-normal"
              />
            </div>
          </div>

          <p className="mt-0.5 text-[10px] font-medium text-muted-foreground text-center">
            Scan a product barcode or QR code to add item to cart
          </p>
        </div>
      </div>
    </div>
  );
}
