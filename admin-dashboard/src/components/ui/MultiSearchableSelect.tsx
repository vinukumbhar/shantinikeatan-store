"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface SelectOption {
  id: string;
  name: string;
}

interface MultiSearchableSelectProps {
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;

  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;

  disabled?: boolean;
  className?: string;
}

export function MultiSearchableSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  disabled = false,
  className,
}: MultiSearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleOption = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const removeOption = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== id));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full min-h-9 h-auto justify-between",
            className
          )}
        >
          <div className="flex flex-wrap gap-1">
            {value.length === 0 ? (
              <span className="text-muted-foreground">
                {placeholder}
              </span>
            ) : (
              value.map((id) => {
                const item = options.find((o) => o.id === id);

                if (!item) return null;

                return (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {item.name}

                    <button
                      type="button"
                      onClick={(e) => removeOption(id, e)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })
            )}
          </div>

          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger> */}
      <PopoverTrigger asChild>
        <div
          role="combobox"
          aria-expanded={open}
          tabIndex={0}
          onClick={() => !disabled && setOpen(true)}
          className={cn(
            "flex min-h-9 w-full cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
        >
          <div className="flex flex-1 flex-wrap gap-1">
            {value.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              value.map((id) => {
                const item = options.find((o) => o.id === id);

                if (!item) return null;

                return (
                  <Badge
                    key={id}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {item.name}

                    <button
                      type="button"
                      onClick={(e) => removeOption(id, e)}
                      className="rounded-sm hover:bg-muted p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                );
              })
            )}
          </div>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />

          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>

            <CommandGroup>
              {options.map((item) => {
                const selected = value.includes(item.id);

                return (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => toggleOption(item.id)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected ? "opacity-100" : "opacity-0",
                      )}
                    />

                    {item.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
