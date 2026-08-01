"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  "zinc",
  "blue",
  "green",
  "violet",
  "rose",
  "orange",
];

export function ThemeSelector() {
  const [theme, setTheme] = useState("zinc");

  const changeTheme = (color: string) => {
    document.documentElement.setAttribute("data-theme", color);
    setTheme(color);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          🎨 {theme}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {themes.map((color) => (
          <DropdownMenuItem
            key={color}
            onClick={() => changeTheme(color)}
          >
            {color}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}