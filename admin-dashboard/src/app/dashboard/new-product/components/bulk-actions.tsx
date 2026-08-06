"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import BulkActionSheet from "./bulk-action-sheet";
import { BulkAction } from "./types";

interface BulkActionsProps {
  selectedIds: string[];
}

export default function BulkActions({
  selectedIds,
}: BulkActionsProps) {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<BulkAction | null>(null);

  const openSheet = (action: BulkAction) => {
    setAction(action);
    setOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={selectedIds.length === 0}
            variant="outline"
          >
            Bulk Actions
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => openSheet("price")}>
           Bulk Images 
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => openSheet("openingStock")}
          >
            Update Opening Stock
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => openSheet("barcode")}>
            Generate Barcodes
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600"
            onClick={() => openSheet("delete")}
          >
            Delete Selected
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <BulkActionSheet
        open={open}
        onOpenChange={setOpen}
        action={action}
        selectedIds={selectedIds}
      />
    </>
  );
}