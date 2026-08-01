import { Button } from "@/components/ui/button";

export function BillingSidebar() {
  return (
    <aside className="w-80 border-r bg-background flex flex-col">

      <div className="border-b p-4 font-semibold">
        Current Cart
      </div>

      <div className="flex-1 overflow-auto p-4">

        Cart Items...

      </div>

      <div className="border-t p-4 space-y-2">

        <div className="flex justify-between">
          <span>Total</span>
          <span>₹0.00</span>
        </div>

        <Button className="w-full">
          Checkout
        </Button>

      </div>

    </aside>
  );
}