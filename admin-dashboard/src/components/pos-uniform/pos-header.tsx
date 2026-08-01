import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PosHeader() {
  return (
    <header className="h-16 border-b bg-background px-6 flex items-center justify-between">

      <h1 className="text-xl font-bold">
        SchoolHub POS
      </h1>

      <Input
        className="w-[500px]"
        placeholder="Search product..."
      />

      <div className="flex gap-2">

        <Button variant="outline">
          Scanner
        </Button>

        <Button>
          Store Keeper
        </Button>

      </div>

    </header>
  );
}