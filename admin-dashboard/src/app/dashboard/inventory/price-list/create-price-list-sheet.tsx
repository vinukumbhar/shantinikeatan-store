"use client";

import { useState } from "react";
import axios from "axios";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";



type CreatePriceListSheetProps = {
  onCreated?: () => void;
};

export function CreatePriceListSheet({
  onCreated,
}: CreatePriceListSheetProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    invoiceId: "",
    poId: "",
    approvedById: "",
    date: "",
  });

  const handleChange = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8000/price-lists",
        {
          name: form.name,
          invoiceId: form.invoiceId || undefined,
          poId: form.poId || undefined,
          approvedById:
            form.approvedById || undefined,
          date: form.date || undefined,

          // Items can be added later
          items: [],
        },
      );

      // Reset form
      setForm({
        name: "",
        invoiceId: "",
        poId: "",
        approvedById: "",
        date: "",
      });

      setOpen(false);

      // Refresh parent table
      onCreated?.();
    } catch (error) {
      console.error(
        "Failed to create price list:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Price List
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full sm:max-w-lg"
      >
        <SheetHeader>
          <SheetTitle>
            Create Price List
          </SheetTitle>

          <SheetDescription>
            Create a new price list. The Price List number
            will be generated automatically.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-5 px-4 py-6">

          {/* Name */}
          <div className="grid gap-2">
            <label
              htmlFor="price-list-name"
              className="text-sm font-medium"
            >
              Price List Name
            </label>

            <Input
              id="price-list-name"
              placeholder="Retail Price"
              value={form.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
            />
          </div>

          {/* Invoice */}
          <div className="grid gap-2">
            <label
              htmlFor="invoice-id"
              className="text-sm font-medium"
            >
              Invoice ID
            </label>

            <Input
              id="invoice-id"
              placeholder="INV-001"
              value={form.invoiceId}
              onChange={(e) =>
                handleChange(
                  "invoiceId",
                  e.target.value,
                )
              }
            />
          </div>

          {/* PO */}
          <div className="grid gap-2">
            <label
              htmlFor="po-id"
              className="text-sm font-medium"
            >
              PO ID
            </label>

            <Input
              id="po-id"
              placeholder="PO-001"
              value={form.poId}
              onChange={(e) =>
                handleChange(
                  "poId",
                  e.target.value,
                )
              }
            />
          </div>

          {/* Approved By */}
          <div className="grid gap-2">
            <label
              htmlFor="approved-by"
              className="text-sm font-medium"
            >
              Approved By
            </label>

            <Input
              id="approved-by"
              placeholder="User ID"
              value={form.approvedById}
              onChange={(e) =>
                handleChange(
                  "approvedById",
                  e.target.value,
                )
              }
            />
          </div>

          {/* Date */}
          <div className="grid gap-2">
            <label
              htmlFor="price-list-date"
              className="text-sm font-medium"
            >
              Date
            </label>

            <Input
              id="price-list-date"
              type="date"
              value={form.date}
              onChange={(e) =>
                handleChange(
                  "date",
                  e.target.value,
                )
              }
            />
          </div>

        </div>

        <SheetFooter className="px-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={
              loading || !form.name.trim()
            }
          >
            {loading
              ? "Creating..."
              : "Create Price List"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}