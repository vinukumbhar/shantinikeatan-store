import { Button } from "@/components/ui/button";

export function PosFooter() {
  return (
    <footer className="h-20 border-t bg-background flex items-center justify-center gap-4">

      <Button variant="outline">
        F2 Search
      </Button>

      <Button variant="outline">
        F3 Scanner
      </Button>

      <Button variant="outline">
        F4 Damage
      </Button>

      <Button>
        F5 Checkout
      </Button>

      <Button variant="secondary">
        F6 Hold
      </Button>

    </footer>
  );
}