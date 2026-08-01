import { BillingSidebar } from "./billing-sidebar";
import { PosFooter } from "./pos-footer";
import { PosHeader } from "./pos-header";

export function PosShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">

      <PosHeader />
      

      <div className="flex flex-1 overflow-hidden">

        <BillingSidebar />

        {/* <main className="flex-1 overflow-auto bg-muted/20"> */}
        <main className="min-w-0 flex-1 overflow-auto bg-muted/20">
          {children}
        </main>

      </div>

      <PosFooter />

    </div>
  );
}