"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import EditVariantSheet from "./edit-variant-sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import ReceiveStockSheet from "./receive-stock";

const IMAGE_URL = "http://localhost:8000";

interface Variant {
  variantId: string;
  productId: string;
  sku: string;
  stock: number;
  lowStockLimit: number;
  thumbnailPath: string | null;
}

interface Props {
  productId: string;
  onBack: () => void;
}

export default function ProductVariants({ productId, onBack }: Props) {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const [editSheetOpen, setEditSheetOpen] = useState(false);

  const fetchVariants = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:8000/product-variants/product/${productId}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch variants");
      }

      const data = await res.json();

      console.log("variants", data);

      setVariants(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchVariants();
    }
  }, [productId]);

  const columns: ColumnDef<Variant>[] = [
    {
      accessorKey: "thumbnailPath",
      header: "Thumbnail",
      cell: ({ row }) => (
        <img
          src={
            row.original.thumbnailPath
              ? `${IMAGE_URL}/${row.original.thumbnailPath}`
              : "/placeholder.png"
          }
          alt="Variant"
          className="h-12 w-12 rounded-md border object-cover"
        />
      ),
    },
    {
      accessorKey: "sku",
      header: "SKU",
    },
    {
      accessorKey: "variantId",
      header: "Variant ID",
    },
    {
      accessorKey: "productId",
      header: "Product ID",
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.original.stock;
        const lowStockLimit = row.original.lowStockLimit;

        let className = "";

        if (stock === 0) {
          className = "bg-red-500 text-white";
        } else if (stock <= lowStockLimit) {
          className = "bg-orange-500 text-white";
        } else {
          className = "bg-green-500 text-white";
        }

        return (
          <span
            className={`inline-flex min-w-[42px] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}
          >
            {stock}
          </span>
        );
      },
    },
    {
      accessorKey: "lowStockLimit",
      header: "Low Stock Limit",
    },

        {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        // 👇 Catch the click event here and stop it from reaching the TableRow
        <div onClick={(e) => e.stopPropagation()}>
          <ReceiveStockSheet
            productId={row.original.productId}
            variantId={row.original.variantId}
            sku={row.original.sku}
            onSuccess={fetchVariants}
          />
        </div>
      ),
    },

  ];

  const table = useReactTable({
    data: variants,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div>Loading variants...</div>;
  }

  return (
    <div className="rounded-md border mt-6">
      <div>
        <h2 className="text-xl font-semibold">Product Variants</h2>
        <p className="text-sm text-muted-foreground">
          {variants.length} variants
        </p>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
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
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => {
                  setSelectedVariant(row.original);
                  setEditSheetOpen(true);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No variants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Button onClick={onBack}>← Back to Products</Button>
      <EditVariantSheet
        variantId={selectedVariant?.variantId || null} // 👈 Correct prop name and value
        open={editSheetOpen}
        onOpenChange={setEditSheetOpen}
        onSuccess={fetchVariants}
      />
    </div>
  );
}
