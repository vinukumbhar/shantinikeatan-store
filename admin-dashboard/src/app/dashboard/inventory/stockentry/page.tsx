"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/products/summary-list"
        );

        console.log("Products:", data);

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={products} />
    </div>
  );
}