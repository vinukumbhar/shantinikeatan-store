"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import PriceForm from "./bulk-actions/set-price"

// types.ts
export type BulkAction =
  | "price"
  | "openingStock"
  | "barcode"
  | "delete";

interface BulkActionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: BulkAction | null;
  selectedIds: string[];
}

function getTitle(action: BulkAction | null) {
  switch (action) {
    case "price":
      return "Update Prices";

    case "openingStock":
      return "Update Opening Stock";

    case "barcode":
      return "Generate Barcodes";

    case "delete":
      return "Delete Variants";

    default:
      return "";
  }
}

function renderContent(
  action: BulkAction | null,
  selectedIds: string[],
) {
  switch (action) {
    case "price":
      return <PriceForm ids={selectedIds} />;

    // case "costPrice":
    //   return <CostPriceForm ids={selectedIds} />;

    // case "openingStock":
    //   return <OpeningStockForm ids={selectedIds} />;

    // case "barcode":
    //   return <BarcodeForm ids={selectedIds} />;

    // case "delete":
    //   return <DeleteVariants ids={selectedIds} />;

    default:
      return null;
  }
}


export default function BulkActionSheet({
  open,
  onOpenChange,
  action,
  selectedIds,
}: BulkActionSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>
            {getTitle(action)}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {renderContent(action, selectedIds)}

        </div>
      </SheetContent>
    </Sheet>
  );
}