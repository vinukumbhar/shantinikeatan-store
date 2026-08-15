"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import ProductVariants from "./ProductVariants";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/products/summary-list"
        );

        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
    
      {!selectedProductId ? (
        <DataTable
          columns={columns}
          data={products}
          onRowClick={setSelectedProductId}
        />
      ) : (
        <ProductVariants
          productId={selectedProductId}
          onBack={() => setSelectedProductId("")}
        />
      )}
    </>
  );
}