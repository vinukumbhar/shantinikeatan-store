// hooks/useBarcodeScanner.ts

"use client";

import { useEffect, useRef } from "react";

interface ScannerOptions {
  onScan: (barcode: string) => void;
}

export function useBarcodeScanner({ onScan }: ScannerOptions) {
  const buffer = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (buffer.current.length > 3) {
          onScan(buffer.current);
        }

        buffer.current = "";
        return;
      }

      if (e.key.length === 1) {
        buffer.current += e.key;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [onScan]);
}