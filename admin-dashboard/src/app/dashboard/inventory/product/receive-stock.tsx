

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, PackagePlus, Barcode } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/ui/SearchableSelect";

interface ReceiveStockSheetProps {
  productId: string;
  variantId: string;
  sku: string;
  onSuccess: () => void;
}

type FormState = {
  priceListId: string;
  quantity: string;
  costPrice: string;
  mrp: string;
  sellingPrice: string;
};

type PriceListItem = {
  id: string;
  variantId: string;
  costPrice: number | string;
  mrp: number | string;
  sellingPrice: number | string;
};

type PriceList = {
  id: string;
  number: string;
  name: string;
  priceListItems?: PriceListItem[];
  items?: PriceListItem[]; // Included to support alternate relation naming
};

const initialForm: FormState = {
  priceListId: "",
  quantity: "",
  costPrice: "",
  mrp: "",
  sellingPrice: "",
};

export default function ReceiveStockSheet({
  productId,
  variantId,
  sku,
  onSuccess,
}: ReceiveStockSheetProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [priceLists, setPriceLists] = useState<PriceList[]>([]);
  const [loadingPriceLists, setLoadingPriceLists] = useState(false);
  const [isExistingPrice, setIsExistingPrice] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    const loadPriceLists = async () => {
      try {
        setLoadingPriceLists(true);
        const { data } = await axios.get<PriceList[]>(
          "http://localhost:8000/price-lists/today"
        );
        setPriceLists(data);
      } catch (error) {
        console.error("Failed to load price lists:", error);
      } finally {
        setLoadingPriceLists(false);
      }
    };

    loadPriceLists();
  }, [open]);

  const priceListOptions = priceLists.map((priceList) => ({
    id: priceList.id,
    label: `${priceList.number} - ${priceList.name}`,
  }));

  const update = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Check locally within loaded priceLists array when price list changes
  const handlePriceListChange = (priceListId: string) => {
    update("priceListId", priceListId);

    if (!priceListId) {
      setIsExistingPrice(false);
      return;
    }

    // Find the selected price list in local state
    const selectedPriceList = priceLists.find((pl) => pl.id === priceListId);
    
    // Support either `priceListItems` or `items` relation key
    const items = selectedPriceList?.priceListItems || selectedPriceList?.items || [];
    
    // Find item matching current variantId
    const matchingItem = items.find((item) => item.variantId === variantId);

    if (matchingItem) {
      // Variant exists -> populate prices and disable price inputs
      setForm((prev) => ({
        ...prev,
        priceListId,
        costPrice: String(matchingItem.costPrice ?? ""),
        mrp: String(matchingItem.mrp ?? ""),
        sellingPrice: String(matchingItem.sellingPrice ?? ""),
      }));
      setIsExistingPrice(true);
    } else {
      // Variant does not exist -> reset prices and allow manual entry
      setForm((prev) => ({
        ...prev,
        priceListId,
        costPrice: "",
        mrp: "",
        sellingPrice: "",
      }));
      setIsExistingPrice(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const quantity = Number(form.quantity);
    const costPrice = Number(form.costPrice);
    const mrp = Number(form.mrp);
    const sellingPrice = Number(form.sellingPrice);

    if (!form.priceListId || !form.quantity || quantity < 1) return;
    if (!form.costPrice || costPrice < 0) return;
    if (!form.mrp || mrp < 0) return;
    if (!form.sellingPrice || sellingPrice < 0) return;

    try {
      setSaving(true);
      const payload = {
        variantId,
        priceListId: form.priceListId,
        quantity,
        costPrice,
        mrp,
        sellingPrice,
        currencyId: undefined,
      };

      await axios.post("http://localhost:8000/receive-stock", payload);

      setForm(initialForm);
      setIsExistingPrice(false);
      onSuccess();
      setOpen(false);
    } catch (error) {
      console.error("Failed to receive stock:", error);
    } finally {
      setSaving(false);
    }
  };

  const isFormValid =
    form.priceListId &&
    form.quantity &&
    Number(form.quantity) >= 1 &&
    form.costPrice &&
    form.mrp &&
    form.sellingPrice;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <PackagePlus className="h-4 w-4" />
          Receive Stock
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col p-0 sm:max-w-md">
        <SheetHeader className="px-6 pt-6 space-y-1 text-left">
          <SheetTitle className="text-xl">Receive Stock</SheetTitle>
          <SheetDescription>
            Enter the pricing and inventory details to receive stock.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSave} className="flex flex-1 flex-col justify-between overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-6 px-6 py-4">
            {/* Product Metadata Badge */}
            <div className="rounded-lg border bg-muted/40 p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  SKU
                </span>
                <span className="font-mono text-xs font-semibold text-foreground">
                  {sku}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Variant ID
                </span>
                <span className="font-mono text-xs text-muted-foreground truncate max-w-[180px]">
                  {variantId}
                </span>
              </div>
            </div>

            {/* Price List Selection */}
            <div className="space-y-2">
              <Label htmlFor="price-list" className="text-sm font-medium">
                Price List <span className="text-destructive">*</span>
              </Label>
              <SearchableSelect
                options={priceListOptions}
                value={form.priceListId}
                onChange={handlePriceListChange}
                placeholder={
                  loadingPriceLists
                    ? "Loading price lists..."
                    : "Select price list..."
                }
                searchPlaceholder="Search price list..."
                emptyMessage="No price list found."
                disabled={loadingPriceLists || saving}
              />
            </div>

            {/* Inventory & Pricing Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Quantity <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  placeholder="0"
                  value={form.quantity}
                  onChange={(e) => update("quantity", e.target.value)}
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  disabled={saving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="costPrice" className="text-sm font-medium">
                  Cost Price <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="costPrice"
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={form.costPrice}
                  onChange={(e) => update("costPrice", e.target.value)}
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  disabled={saving || isExistingPrice}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mrp" className="text-sm font-medium">
                  MRP <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="mrp"
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={form.mrp}
                  onChange={(e) => update("mrp", e.target.value)}
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  disabled={saving || isExistingPrice}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sellingPrice" className="text-sm font-medium">
                  Selling Price <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="sellingPrice"
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={form.sellingPrice}
                  onChange={(e) => update("sellingPrice", e.target.value)}
                  className="[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  disabled={saving || isExistingPrice}
                />
              </div>
            </div>
          </div>

          <SheetFooter className="px-6 pb-6 pt-4 border-t flex-col gap-2 sm:flex-col">
            <Button
              className="w-full gap-2"
              variant="outline"
              type="button"
              disabled={saving}
            >
              <Barcode className="h-4 w-4" />
              Generate Barcode
            </Button>

            <Button
              className="w-full gap-2"
              type="submit"
              disabled={saving || !isFormValid}
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {saving ? "Receiving Stock..." : "Receive Stock"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}