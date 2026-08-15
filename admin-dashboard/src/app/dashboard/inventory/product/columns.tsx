"use client";

import { ColumnDef } from "@tanstack/react-table";

const IMAGE_URL = "http://localhost:8000";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center gap-3">
          <img
            src={`${IMAGE_URL}/${product.thumbnailPath}`}
            alt={product.name}
            className="h-12 w-12 rounded-md border object-cover"
          />

          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">
              {product.sku || product.code}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "variantCount",
    header: "Variants",
  },
    {
    accessorKey: "stock",
    header: "Total Stock",
  },

      {
    accessorKey: "low-stock",
    header: "Low Stock",
  },

        {
    accessorKey: "status",
    header: "Status",
  },
  

];