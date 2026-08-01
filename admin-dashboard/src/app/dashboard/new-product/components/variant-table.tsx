


"use client";

import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import BulkActions from "./bulk-actions"

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

type VariantTableMode =
  | "variant"
  | "pricing"
  | "inventory"
  | "images"
  | "full";
  

interface VariantTableProps {
  mode?: VariantTableMode;
}

const TABLE_MODES: Record<VariantTableMode, string[]> = {
  variant: [
    "select",
    "attributes",
    "sku",
    "barcode",
  ],

  images:[
     "select",
    "attributes",
    "sku",
  ],

  pricing: [
    "select",
    "attributes",
    "sku",
    "barcode",
    "sellingPrice",
    "costPrice",
  ],

  inventory: [
    "select",
    "attributes",
    "sku",
    "barcode",
    "openingStock",
  ],

  full: [
    "select",
    "attributes",
    "sku",
    "barcode",
    "sellingPrice",
    "costPrice",
    "openingStock",
  ],
};

function isColumnVisible(
  mode: VariantTableMode,
  id: string,
) {
  if (id.startsWith("attr-")) {
    return TABLE_MODES[mode].includes("attributes");
  }

  return TABLE_MODES[mode].includes(id);
}
export default function VariantTable({
  mode = "full",
}: VariantTableProps) {
  const { productVariants, updateVariant } = useProductStore();
  const [rowSelection, setRowSelection] = useState({});

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

  // const columns = useMemo<ColumnDef<ProductVariant>[]>(() => {
  //   const attributeColumns = attributeKeys.map<ColumnDef<ProductVariant>>(
  //     (key) => ({
  //       id: `attr-${key}`,
  //       header: key,
  //       cell: ({ row }) => row.original.attributes?.[key] || "",
  //     }),
  //   );

  //   return [
  //     {
  //       id: "select",
  //       header: ({ table }) => (
  //         <Checkbox
  //           checked={table.getIsAllPageRowsSelected()}
  //           onCheckedChange={(value) =>
  //             table.toggleAllPageRowsSelected(!!value)
  //           }
  //           aria-label="Select all"
  //         />
  //       ),
  //       cell: ({ row }) => (
  //         <Checkbox
  //           checked={row.getIsSelected()}
  //           onCheckedChange={(value) => row.toggleSelected(!!value)}
  //           aria-label="Select row"
  //         />
  //       ),
  //       enableSorting: false,
  //       enableHiding: false,
  //       size: 40,
  //     },
  //     ...attributeColumns,
  //     {
  //       accessorKey: "sku",
  //       header: "SKU",
  //       cell: ({ row }) => (
  //         <EditableCell
  //           value={row.original.sku}
  //           row={row.index}
  //           col={0}
  //           className="min-w-32"
  //           onKeyDown={handleKeyDown}
  //           onSave={(value) =>
  //             updateVariant(row.original.id, {
  //               sku: String(value),
  //             })
  //           }
  //         />
  //       ),
  //     },
  //     {
  //       accessorKey: "barcode",
  //       header: "Barcode",
  //       cell: ({ row }) => (
  //         <EditableCell
  //           value={row.original.barcode}
  //           row={row.index}
  //           col={1}
  //           className="min-w-32"
  //           onKeyDown={handleKeyDown}
  //           onSave={(value) =>
  //             updateVariant(row.original.id, {
  //               barcode: String(value),
  //             })
  //           }
  //         />
  //       ),
  //     },
  //     {
  //       accessorKey: "sellingPrice",
  //       header: "Selling Price",
  //       cell: ({ row }) => (
  //         <EditableCell
  //           value={row.original.sellingPrice}
  //           type="number"
  //           row={row.index}
  //           col={2}
  //           className="w-24"
  //           onKeyDown={handleKeyDown}
  //           onSave={(value) =>
  //             updateVariant(row.original.id, {
  //               sellingPrice: Number(value),
  //             })
  //           }
  //         />
  //       ),
  //     },

  //     {
  //       accessorKey: "costPrice",
  //       header: "Cost Price",
  //       cell: ({ row }) => (
  //         <EditableCell
  //           value={row.original.costPrice}
  //           type="number"
  //           row={row.index}
  //           col={3}
  //           className="w-24"
  //           onKeyDown={handleKeyDown}
  //           onSave={(value) =>
  //             updateVariant(row.original.id, {
  //               costPrice: Number(value),
  //             })
  //           }
  //         />
  //       ),
  //     },

  //     {
  //       accessorKey: "openingStock",
  //       header: "Opening Stock",
  //       cell: ({ row }) => (
  //         <EditableCell
  //           value={row.original.openingStock}
  //           type="number"
  //           row={row.index}
  //           col={4}
  //           className="w-24"
  //           onKeyDown={handleKeyDown}
  //           onSave={(value) =>
  //             updateVariant(row.original.id, {
  //               openingStock: Number(value),
  //             })
  //           }
  //         />
  //       ),
  //     },
  //   ];
  // }, [attributeKeys]);

  
  
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


  return allColumns.filter((column) => {
  const id = column.id!;

  if (id.startsWith("attr-")) {
    return TABLE_MODES[mode].includes("attributes");
  }

  return TABLE_MODES[mode].includes(id);
});

}, [attributeKeys, mode, updateVariant]);
  
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
