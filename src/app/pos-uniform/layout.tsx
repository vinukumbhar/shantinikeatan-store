import { PosShell } from "@/components/pos-uniform/pos-shell";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PosShell>{children}</PosShell>;
}