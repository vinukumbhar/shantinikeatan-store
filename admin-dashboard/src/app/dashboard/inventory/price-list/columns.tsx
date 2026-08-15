"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type PriceList = {
  id: string;
  number: string;
  name: string;
  invoiceId: string | null;
  poId: string | null;
  approvedById: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;

  _count: {
    items: number;
  };
};

export const columns: ColumnDef<PriceList>[] = [
  // ---------------------------------------------------------
  // No.
  // ---------------------------------------------------------
  {
    id: "serial",
    header: "No.",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    enableColumnFilter: false,
  },

  // ---------------------------------------------------------
  // Price List Number
  // ---------------------------------------------------------
  {
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Price List No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="font-medium">
        {row.original.number}
      </span>
    ),
  },

  // ---------------------------------------------------------
  // Name
  // ---------------------------------------------------------
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  // ---------------------------------------------------------
  // Created Date
  // ---------------------------------------------------------
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Created Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return new Date(
        row.original.createdAt,
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    },
  },

  // ---------------------------------------------------------
  // Invoice ID
  // ---------------------------------------------------------
  {
    accessorKey: "invoiceId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Invoice ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>
      row.original.invoiceId || "-",
  },

  // ---------------------------------------------------------
  // Approved By
  // ---------------------------------------------------------
  {
    accessorKey: "approvedById",
    header: "Approved By",
    cell: ({ row }) =>
      row.original.approvedById || "Pending",
  },

  // ---------------------------------------------------------
  // Items
  // ---------------------------------------------------------
  {
    id: "items",
    accessorFn: (row) => row._count.items,

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === "asc")
          }
        >
          Items
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => (
      <span className="font-medium">
        {row.original._count.items}
      </span>
    ),
  },
];