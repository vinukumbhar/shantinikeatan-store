import { BarcodeCard } from "@/components/pos-uniform/scanned-barcode";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";



export function ScannerPanel() {
  return (
    // Changed to items-stretch so child elements can fill the full height
    <div className="flex flex-col items-stretch gap-4 p-4 lg:flex-row lg:items-center">
      <div>
        <BarcodeCard barcode="12345678901" />
      </div>

      {/* Fallback horizontal separator for mobile screens when flex wraps vertically */}
      <Separator
        orientation="vertical"
        className="block lg:hidden w-full h-[1px] bg-border my-2"
      />

      <div>
        <div className="flex flex-col items-start gap-2">
          <span className="text-sm font-semibold text-muted-foreground">
            Product
          </span>
          <h3 className="text-lg font-bold text-foreground">
            School Shirt(Full Sleeve)
          </h3>

          <div className="flex flex-row ">
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-muted-foreground text-center">
                Qty Added To Cart
              </span>
              <h2 className="text-2xl font-bold text-blue-600">1</h2>
            </div>

            <div className="flex flex-col ml-6 items-center">
              <span className="text-sm font-medium text-muted-foreground text-center">
                Current Cart Quantity
              </span>
              <h2 className="text-2xl font-bold text-blue-600">1</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Fallback horizontal separator for mobile screens when flex wraps vertically */}
      <Separator
        orientation="vertical"
        className="block lg:hidden w-full h-[1px] bg-border my-2"
      />

      <div>
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-col items-center">
            <div>
              <span className="text-sm font-semibold text-muted-foreground">
                Times Scanned
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-600">2</h2>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="flex flex-row items-center">
              <span className="text-sm font-medium text-muted-foreground text-center ">
                Last Scan
              </span>
              <h2 className="text-2xl font-bold text-blue-600 px-6">1</h2>
            </div>

            <div className="flex flex-row  items-center">
              <span className="text-sm font-medium text-muted-foreground text-center">
                Scanner Status
              </span>
              <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 ml-6">
                Connected
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
