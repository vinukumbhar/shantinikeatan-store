import { ScannerPanel } from "@/components/pos-uniform/scanner-panel";
import { ProductDetails } from "@/components/pos-uniform/product-details";

export default function Page() {
  return (
 <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 lg:p-6">
  <ScannerPanel />
  <ProductDetails />
</div>
  );
}