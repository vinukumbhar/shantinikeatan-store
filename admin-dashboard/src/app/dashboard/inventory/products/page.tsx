"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  Eye,
  MoreVertical,
  Download,
  Plus,
  Package,
  Tags,
  Layers,
  Boxes,
  ClipboardList,
  RefreshCw,
  ArrowLeftRight,
  Barcode,
} from "lucide-react";

import NewProductSheet from "@/app/dashboard/inventory/products/new-product";
import NewProductSheet2 from "@/app/dashboard/inventory/products/new-product-2";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import productsData from "./products.json";
import Product_mng from "./product_mng";

type Product = {
  barcode: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  sizes: string[];
  color: string;
  material: string;
  hsn: string;
  images: string[];
};

export default function InventoryDashboard() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [newProductSheetOpen, setNewProductSheetOpen] = useState(false);

  // Filter logic synced with TanStack data updates
  const filteredData = useMemo(() => {
    return productsData.filter((item) => {
      if (categoryFilter !== "all" && item.category !== categoryFilter)
        return false;
      if (brandFilter !== "all" && item.brand !== brandFilter) return false;
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      if (lowStockOnly && item.status !== "Low Stock") return false;
      return true;
    });
  }, [categoryFilter, brandFilter, statusFilter, lowStockOnly]);

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => {
    return (
      globalFilter !== "" ||
      categoryFilter !== "all" ||
      brandFilter !== "all" ||
      statusFilter !== "all" ||
      lowStockOnly === true
    );
  }, [globalFilter, categoryFilter, brandFilter, statusFilter, lowStockOnly]);

  // Handler to reset all filters
  const handleClearFilters = () => {
    setGlobalFilter("");
    setCategoryFilter("all");
    setBrandFilter("all");
    setStatusFilter("all");
    setLowStockOnly(false);
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Product",
        cell: ({ row }) => {
          // Safe access to the primary thumbnail image index
          const thumbnail = row.original.images?.[0] || "/placeholder.png";

          return (
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded border overflow-hidden bg-muted flex-shrink-0">
                <Image
                  src={thumbnail}
                  alt={row.original.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">
                  {row.original.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {row.original.sku}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "barcode",
        header: "Barcode / SKU",
        cell: ({ getValue }) => (
          <span className="font-medium text-sm">{getValue() as string}</span>
        ),
      },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "brand", header: "Brand" },
      {
        accessorKey: "purchasePrice", // Points back strictly to your first JSON property model structure
        header: "Purchase Price",
        cell: ({ getValue }) => {
          const val = getValue() as number;
          return <span className="font-medium">₹{(val ?? 0).toFixed(2)}</span>;
        },
      },
      {
        accessorKey: "sellingPrice", // Points back strictly to your first JSON property model structure
        header: "Selling Price",
        cell: ({ getValue }) => {
          const val = getValue() as number;
          return <span className="font-medium">₹{(val ?? 0).toFixed(2)}</span>;
        },
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ getValue }) => {
          const stock = getValue() as number;
          const isLow = stock <= 40; // Dynamics based on new stock levels
          return (
            <span
              className={`font-semibold text-sm ${isLow ? "text-destructive" : "text-emerald-600"}`}
            >
              {stock} pcs
            </span>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        cell: ({ row }) => {
          const stock = row.original.stock;
          const isLow = stock <= 40;
          return (
            <Badge
              className={
                !isLow
                  ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200"
                  : "bg-orange-50 text-orange-700 hover:bg-orange-50 border border-orange-200"
              }
            >
              {!isLow ? "In Stock" : "Low Stock"}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: () => (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-blue-600 hover:text-blue-700"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <div className="w-full bg-background min-h-screen text-foreground antialiased">
      {/* Top Navigation Strip */}

      <div className="p-6 max-w-[1600px] mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
            <p className="text-sm text-muted-foreground">
              All products in your inventory
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="gap-2 bg-white text-gray-700">
              <Download className="h-4 w-4" /> Import
            </Button>
            
            {/* The sheet element container rendering conditionally from right edge layout */}
            <Button asChild>
              <Link href="/dashboard/inventory/new-product-ex">
                <Plus className="mr-2 h-4 w-4" />
                New Product External
              </Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard/new-product">
                <Plus className="mr-2 h-4 w-4" />
                New Product Internal
              </Link>
            </Button>
            <NewProductSheet open={sheetOpen} onOpenChange={setSheetOpen} />
            <NewProductSheet2
              open={newProductSheetOpen}
              onOpenChange={setNewProductSheetOpen}
            />
          </div>
        </div>

        {/* Filters Panel */}
        <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by product name, barcode, SKU..."
              className="left-3 pl-9 bg-gray-50/50"
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px] bg-gray-50/50">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            {/* Category Select Content */}
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Uniforms">Uniforms</SelectItem>
              <SelectItem value="Footwear">Footwear</SelectItem>
              <SelectItem value="Accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>

          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-[160px] bg-gray-50/50">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              <SelectItem value="SchoolHub">SchoolHub</SelectItem>
              <SelectItem value="Navneet">Navneet</SelectItem>
              <SelectItem value="NCERT">NCERT</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px] bg-gray-50/50">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="In Stock">In Stock</SelectItem>
              <SelectItem value="Low Stock">Low Stock</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 border-l pl-4 h-9">
            <span className="text-sm font-medium text-muted-foreground">
              Low Stock
            </span>
            <Switch checked={lowStockOnly} onCheckedChange={setLowStockOnly} />
          </div>

          {/* Conditional Clear Filters Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={handleClearFilters}
              className="h-9 px-3 text-destructive hover:text-destructive hover:bg-destructive/10 text-sm font-medium transition-colors"
            >
              Clear Filters
            </Button>
          )}

          <Button variant="outline" size="icon" className="h-9 w-9 ml-auto">
            <SlidersHorizontal className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* TanStack Table Data Layout */}
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/70 border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-gray-600 font-semibold h-11 text-xs uppercase tracking-wider"
                    >
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
                    className="hover:bg-gray-50/50 transition-colors border-b last:border-0"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-3 px-4 text-sm text-gray-700"
                      >
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
                    className="h-32 text-center text-muted-foreground"
                  >
                    No results found matching your search parameters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Footer Controls & Pagination Wrapper */}
          <div className="p-4 border-t bg-white flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>
              Showing{" "}
              <span className="font-semibold text-foreground">
                {table.getState().pagination.pageIndex *
                  table.getState().pagination.pageSize +
                  1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-foreground">
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) *
                    table.getState().pagination.pageSize,
                  filteredData.length,
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {filteredData.length}
              </span>{" "}
              entries
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(val) => table.setPageSize(Number(val))}
                >
                  <SelectTrigger className="h-8 w-[110px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 50, 100].map((size) => (
                      <SelectItem key={size} value={`${size}`}>
                        {size} / page
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Exact pagination numbering styled to match layout */}
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="h-8 w-8"
                >
                  &lt;
                </Button>

                {/* Active Page Indicator */}
                <Button
                  variant="default"
                  size="icon"
                  className="h-8 w-8 bg-blue-600 text-white hover:bg-blue-700"
                >
                  {table.getState().pagination.pageIndex + 1}
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="h-8 w-8"
                >
                  &gt;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


