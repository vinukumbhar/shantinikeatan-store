import { usePOSStore } from "@/stores/usePOSStore";

export function BillingSidebar() {
  const selectedProduct = usePOSStore(
    (state) => state.selectedProduct
  );

  return (
    <div>
      <h2>{selectedProduct?.name ?? "No Product"}</h2>

      <p>{selectedProduct?.price ?? "--"}</p>

      <p>{selectedProduct?.sku ?? "--"}</p>
    </div>
  );
}