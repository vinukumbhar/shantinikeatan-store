import { SalesChart } from "./store-overview/sales-chart";
import { TopSellingProducts } from "./store-overview/top-selling-products";
import { LowStockAlert } from "./store-overview/low-stock-alert";

export function StoreOverview() {
  return (
    <div className="px-4 md:px-6">
      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        <div className="flex lg:col-span-4">
          <div className="w-full">
            <SalesChart />
          </div>
        </div>

        <div className="flex lg:col-span-4">
          <div className="w-full">
            <TopSellingProducts />
          </div>
        </div>

        <div className="flex lg:col-span-4">
          <div className="w-full">
            <LowStockAlert />
          </div>
        </div>
      </div>
    </div>
  );
}