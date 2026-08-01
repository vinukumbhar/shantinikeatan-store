"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useProductStore } from "../../store/product-store";

interface PriceFormProps {
  ids: string[];
}

export default function PriceForm({ ids }: PriceFormProps) {
  const { updateVariants } = useProductStore();

  const [sellingPrice, setSellingPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [openingStock, SetOpeningStock] = useState("");
//   const [mrp, setMrp] = useState("");

  const handleApply = () => {
    updateVariants(ids, {
      sellingPrice: sellingPrice ? Number(sellingPrice) : undefined,
      costPrice: costPrice ? Number(costPrice) : undefined,
      openingStock: openingStock ? Number(openingStock) : undefined,
    //   mrp: mrp ? Number(mrp) : undefined,
    });
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Selling Price"
        value={sellingPrice}
        onChange={(e) => setSellingPrice(e.target.value)}
      />

      <Input
        placeholder="Cost Price"
        value={costPrice}
        onChange={(e) => setCostPrice(e.target.value)}
      />

        <Input
        placeholder="Opening Stock"
        value={openingStock}
        onChange={(e) => SetOpeningStock(e.target.value)}
      />

      {/* <Input
        placeholder="MRP"
        value={mrp}
        onChange={(e) => setMrp(e.target.value)}
      /> */}

      <Button className="w-full" onClick={handleApply}>
        Apply Changes
      </Button>
    </div>
  );
}