"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

interface EditableCellProps {
  value: string | number;
  type?: "text" | "number";
  onSave: (value: string | number) => void;

  row: number;
  col: number;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => void;

  className?: string;
}

export default function EditableCell({
  value,
  type = "text",
  onSave,
  row,
  col,
  onKeyDown,
  className,
}: EditableCellProps) {
  const [localValue, setLocalValue] = useState(String(value));

  useEffect(() => {
    setLocalValue(String(value));
  }, [value]);

  return (
    <Input
      type={type === "number" ? "text" : type}
      inputMode={type === "number" ? "numeric" : undefined}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={() => {
        if (type === "number") {
          onSave(localValue === "" ? 0 : Number(localValue));
        } else {
          onSave(localValue);
        }
      }}
      data-row={row}
      data-col={col}
      onKeyDown={(e) => onKeyDown(e, row, col)}
      className={className}
    />
  );
}