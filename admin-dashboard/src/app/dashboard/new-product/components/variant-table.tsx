"use client";

import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import BulkActions from "./bulk-actions";
import ImageSelectionSheet from "./image-selection-sheet";
import { Button } from "@base-ui/react";

import { useProductStore, ProductVariant } from "../store/product-store"; // Adjust path to store

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditableCell from "./editable-cell";

type VariantTableMode = "variant" | "pricing" | "barcode" | "images" | "full";

interface VariantTableProps {
  mode?: VariantTableMode;
}

const TABLE_MODES: Record<VariantTableMode, string[]> = {
  variant: ["select", "attributes", "sku", "barcode", "images"],

  images: ["select", "attributes", "sku", "images"],

  pricing: [
    "select",
    "attributes",
    "sku",
    "barcode",
    "sellingPrice",
    "costPrice",
    "image",
  ],

  barcode: ["select", "attributes", "sku", "barcode"],

  full: [
    "select",
    "attributes",
    "sku",
    "barcode",
     "images",
  ],
};

export default function VariantTable({ mode = "full" }: VariantTableProps) {
  const { productVariants, updateVariant, images } = useProductStore();
  const [rowSelection, setRowSelection] = useState({});
  const [imageSheetOpen, setImageSheetOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null,
  );

  const EDITABLE_COLUMNS = 5;

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    row: number,
    col: number,
  ) => {
    let nextRow = row;
    let nextCol = col;

    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        nextCol++;
        break;
      case "ArrowLeft":
        e.preventDefault();
        nextCol--;
        break;
      case "ArrowDown":
        e.preventDefault();
        nextRow++;
        break;
      case "ArrowUp":
        e.preventDefault();
        nextRow--;
        break;
      case "Enter":
        e.preventDefault();
        nextRow++;
        break;
      default:
        return;
    }

    if (nextRow < 0 || nextRow >= productVariants.length) return;
    if (nextCol < 0 || nextCol >= EDITABLE_COLUMNS) return;

    const nextInput = document.querySelector<HTMLInputElement>(
      `[data-row="${nextRow}"][data-col="${nextCol}"]`,
    );

    if (nextInput) {
      nextInput.focus();
      nextInput.select();
    }
  };

  // ✅ FIX: Extract keys safely from the first index if variants exist
  const attributeKeys = useMemo(() => {
    if (!productVariants || productVariants.length === 0) return [];
    return Object.keys(productVariants[0].attributes || {});
  }, [productVariants.length > 0]); // Dependency only shifts when transitioning from 0 items to populated items

  const columns = useMemo<ColumnDef<ProductVariant>[]>(() => {
    const attributeColumns = attributeKeys.map<ColumnDef<ProductVariant>>(
      (key) => ({
        id: `attr-${key}`,
        header: key,
        cell: ({ row }) => row.original.attributes?.[key] || "",
      }),
    );

    const allColumns: ColumnDef<ProductVariant>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      },

      ...attributeColumns,
     
      {
  id: "images",
  header: "Images",
  cell: ({ row }) => {
    const thumbnail =
      images.find((img) => img.id === row.original.thumbnailId) ??
      // Added optional chaining here: row.original.imageIds?.includes(...)
      images.find((img) => row.original.imageIds?.includes(img.id));

    return (
      <button
        onClick={() => {
          setSelectedVariantId(row.original.id);
          setImageSheetOpen(true);
        }}
        className="overflow-hidden rounded border"
      >
        <img
          src={thumbnail?.preview ?? "/placeholder.png"}
          className="h-12 w-12 object-cover"
          alt=""
        />
      </button>
    );
  },
},


      {
        id: "sku",
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.sku}
            row={row.index}
            col={0}
            className="min-w-32"
            onKeyDown={handleKeyDown}
            onSave={(value) =>
              updateVariant(row.original.id, {
                sku: String(value),
              })
            }
          />
        ),
      },

      {
        id: "barcode",
        accessorKey: "barcode",
        header: "Barcode",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.barcode}
            row={row.index}
            col={1}
            className="min-w-32"
            onKeyDown={handleKeyDown}
            onSave={(value) =>
              updateVariant(row.original.id, {
                barcode: String(value),
              })
            }
          />
        ),
      },

      {
        id: "sellingPrice",
        accessorKey: "sellingPrice",
        header: "Selling Price",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.sellingPrice}
            type="number"
            row={row.index}
            col={2}
            className="w-24"
            onKeyDown={handleKeyDown}
            onSave={(value) =>
              updateVariant(row.original.id, {
                sellingPrice: Number(value),
              })
            }
          />
        ),
      },

      {
        id: "costPrice",
        accessorKey: "costPrice",
        header: "Cost Price",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.costPrice}
            type="number"
            row={row.index}
            col={3}
            className="w-24"
            onKeyDown={handleKeyDown}
            onSave={(value) =>
              updateVariant(row.original.id, {
                costPrice: Number(value),
              })
            }
          />
        ),
      },

      {
        id: "openingStock",
        accessorKey: "openingStock",
        header: "Opening Stock",
        cell: ({ row }) => (
          <EditableCell
            value={row.original.openingStock}
            type="number"
            row={row.index}
            col={4}
            className="w-24"
            onKeyDown={handleKeyDown}
            onSave={(value) =>
              updateVariant(row.original.id, {
                openingStock: Number(value),
              })
            }
          />
        ),
      },
    ];



    // Change this block at the end of your useMemo:
    return allColumns.filter((column) => {
      const id = column.id!;

      if (id.startsWith("attr-")) {
        return TABLE_MODES[mode]?.includes("attributes") ?? false;
      }

      // Added optional chaining here to prevent undefined crashes
      return TABLE_MODES[mode]?.includes(id) ?? false;
    });

  }, [attributeKeys, mode, images]); // ensure mode and images are properly added to dependencies


  const table = useReactTable({
    data: productVariants,
    columns,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getSelectedRowModel().rows.length} Selected
        </div>

        <BulkActions
          selectedIds={table
            .getSelectedRowModel()
            .rows.map((row) => row.original.id)}
        />

       
        <ImageSelectionSheet
          open={imageSheetOpen}
          onOpenChange={setImageSheetOpen}
          variantId={selectedVariantId}
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length || 1}
                className="h-24 text-center"
              >
                No variants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
