"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getGlobalFacetedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
} from "@tanstack/react-table";

import { CreatePriceListSheet } from "./create-price-list-sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { columns, PriceList } from "./columns";

import { useState } from "react";

type PriceListTableProps = {
  data: PriceList[];
};

export function PriceListTable({ data }: PriceListTableProps) {
  // ---------------------------------------------------------
  // Sorting
  // ---------------------------------------------------------

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "number",
      desc: false,
    },
  ]);

  // ---------------------------------------------------------
  // Column Filters
  // ---------------------------------------------------------

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // ---------------------------------------------------------
  // Global Search
  // ---------------------------------------------------------

  const [globalFilter, setGlobalFilter] = useState("");

  // ---------------------------------------------------------
  // Column Visibility
  // ---------------------------------------------------------

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // ---------------------------------------------------------
  // Table
  // ---------------------------------------------------------

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,

    // Rows
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),

    // Faceted filtering
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),

    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  // ---------------------------------------------------------
  // Clear Filters
  // ---------------------------------------------------------

  const clearFilters = () => {
    setGlobalFilter("");
    setColumnFilters([]);

    setSorting([
      {
        id: "number",
        desc: false,
      },
    ]);
  };

  return (
    <div className="space-y-4">
      {/* ================================================= */}
      {/* Search + Clear */}
      {/* ================================================= */}

      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search Price List..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>

          <CreatePriceListSheet
            onCreated={() => {
              // Refresh price lists here
            }}
          />
        </div>
      </div>

      {/* ================================================= */}
      {/* Column Filters */}
      {/* ================================================= */}

      <div className="flex flex-wrap gap-3">
        {/* Price List Number */}
        <Input
          placeholder="Filter Number..."
          value={(table.getColumn("number")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("number")?.setFilterValue(event.target.value)
          }
          className="w-[180px]"
        />

        {/* Name */}
        <Input
          placeholder="Filter Name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-[180px]"
        />

        {/* Invoice */}
        <Input
          placeholder="Filter Invoice..."
          value={
            (table.getColumn("invoiceId")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("invoiceId")?.setFilterValue(event.target.value)
          }
          className="w-[180px]"
        />
      </div>

      {/* ================================================= */}
      {/* Table */}
      {/* ================================================= */}

      <div className="rounded-md border">
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
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No price lists found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================================================= */}
      {/* Footer */}
      {/* ================================================= */}

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} price list
          {table.getFilteredRowModel().rows.length !== 1 ? "s" : ""}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
