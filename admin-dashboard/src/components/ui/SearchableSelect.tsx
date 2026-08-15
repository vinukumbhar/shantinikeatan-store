"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

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

export type SearchableSelectOption = {
  id: string;
  label: string;
};

interface SearchableSelectProps {
  options: SearchableSelectOption[];

  value: string;
  onChange: (value: string) => void;

  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;

  disabled?: boolean;
  className?: string;
}

export function SearchableSelect({
  options,
  value,
  onChange,

  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",

  disabled = false,
  className,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedOption = options.find(
    (option) => option.id === value,
  );

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !selectedOption &&
              "text-muted-foreground",
            className,
          )}
        >
          <span className="truncate">
            {selectedOption
              ? selectedOption.label
              : placeholder}
          </span>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
          />

          <CommandList>
            <CommandEmpty>
              {emptyMessage}
            </CommandEmpty>

            <CommandGroup>
              {options.map((option) => {
                const selected =
                  option.id === value;

                return (
                  <CommandItem
                    key={option.id}
                    value={option.label}
                    onSelect={() => {
                      onChange(option.id);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />

                    {option.label}
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