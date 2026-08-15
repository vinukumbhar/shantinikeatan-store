"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  PriceList,
  columns,
} from "./columns";

import { PriceListTable } from "./price-list-table";

export default function PriceListsPage() {
  const [priceLists, setPriceLists] = useState<PriceList[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPriceLists = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/price-lists",
        );

        setPriceLists(data);
        console.log("price list",data);
      } catch (error) {
        console.error(
          "Failed to load price lists",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    loadPriceLists();
  }, []);

  if (loading) {
    return <div>Loading price lists...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Price Lists
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage product price lists and pricing items.
        </p>
      </div>

      <PriceListTable data={priceLists} />
    </div>
  );
}