"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ReceiveStockSheetProps {
  productId: string;
  variantId: string;
  sku: string;
}

type FormState = {
  invoiceNo: string;
  supplier: string;
  quantity: number;
  costPrice: number;
  mrp: number;
  sellingPrice: number;
};

export default function ReceiveStockSheet({
  productId,
  variantId,
  sku,
}: ReceiveStockSheetProps) {
  const [form, setForm] = useState<FormState>({
    invoiceNo: "",
    supplier: "",
    quantity: 1,
    costPrice: 0,
    mrp: 0,
    sellingPrice: 0,
  });

  const update = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log({
      productId,
      variantId,
      ...form,
    });

    // POST /purchase-items
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Receive Stock
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Receive Stock</SheetTitle>
        </SheetHeader>

        <div className="space-y-5 mt-6">

          <div className="rounded-md border p-3 bg-muted/30">
            <p className="text-sm font-medium">{sku}</p>
            <p className="text-xs text-muted-foreground">
              Product ID : {productId}
            </p>
            <p className="text-xs text-muted-foreground">
              Variant ID : {variantId}
            </p>
          </div>

          <div>
            <Label>Price List </Label>
            <Input
              value={form.invoiceNo}
              onChange={(e) =>
                update("invoiceNo", e.target.value)
              }
            />
          </div>

         

          <div className="grid grid-cols-2 gap-4">

            <div>
              <Label>Quantity</Label>
              <Input
                type="number"
                value={form.quantity}
                onChange={(e) =>
                  update("quantity", Number(e.target.value))
                }
              />
            </div>

            <div>
              <Label>Cost Price</Label>
              <Input
                type="number"
                value={form.costPrice}
                onChange={(e) =>
                  update("costPrice", Number(e.target.value))
                }
              />
            </div>

            <div>
              <Label>MRP</Label>
              <Input
                type="number"
                value={form.mrp}
                onChange={(e) =>
                  update("mrp", Number(e.target.value))
                }
              />
            </div>

            <div>
              <Label>Selling Price</Label>
              <Input
                type="number"
                value={form.sellingPrice}
                onChange={(e) =>
                  update("sellingPrice", Number(e.target.value))
                }
              />
            </div>

          </div>

           <Button
            className="w-full"
            onClick={handleSave}
          >
            Genarte barcode 
          </Button>

          <Button
            className="w-full"
            onClick={handleSave}
          >
            Receive Stock
          </Button>

        </div>
      </SheetContent>
    </Sheet>
  );
}