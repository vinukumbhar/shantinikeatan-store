"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface BulkUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (values: {
    sellingPrice: string;
    costPrice: string;
    openingStock: string;
  }) => void;
}

export function BulkUpdateDialog({
  open,
  onOpenChange,
  onApply,
}: BulkUpdateDialogProps) {
  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [openingStock, setOpeningStock] = useState("");

  const handleApply = () => {
    onApply({
      sellingPrice,
      costPrice,
      openingStock,
    });

    onOpenChange(false);

    setSellingPrice("");
    setCostPrice("");
    setOpeningStock("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Bulk Update</DialogTitle>

          <DialogDescription>
            Update all selected variants. Leave a field empty to keep its current
            value.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <Input
            type="number"
            placeholder="Selling Price"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Cost Price"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Opening Stock"
            value={openingStock}
            onChange={(e) => setOpeningStock(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button onClick={handleApply}>
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}