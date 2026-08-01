
"use client";

import { useEffect, useRef } from "react";

interface ScannerOptions {
  onScan: (barcode: string) => void;
  minLength?: number;
}

export function useBarcodeScanner({
  onScan,
  minLength = 4,
}: ScannerOptions) {
  const buffer = useRef("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetBuffer = () => {
      buffer.current = "";
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      // Don't scan while typing in editable elements
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        target.isContentEditable
      ) {
        return;
      }

      // Ignore modifier shortcuts (Ctrl+C, Ctrl+V, Ctrl+A, etc.)
      if (e.ctrlKey || e.altKey || e.metaKey) {
        return;
      }

      // Scanner sends Enter at the end
      if (e.key === "Enter") {
        if (buffer.current.length >= minLength) {
          onScan(buffer.current);
        }

        resetBuffer();
        return;
      }

      // Allow backspace
      if (e.key === "Backspace") {
        buffer.current = buffer.current.slice(0, -1);
        return;
      }

      // Ignore non-printable keys
      if (e.key.length !== 1) {
        return;
      }

      // Append scanned character
      buffer.current += e.key;

      // Clear buffer if scanner stops sending data
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        resetBuffer();
      }, 100);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [onScan, minLength]);
}