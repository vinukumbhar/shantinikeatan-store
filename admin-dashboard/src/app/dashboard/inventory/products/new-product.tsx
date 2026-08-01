"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ScanBarcode,
  Trash2,
  Plus,
  Minus,
  Image as ImageIcon,
} from "lucide-react";

interface NewProductSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: any) => void;
}

export default function NewProductSheet({
  open,
  onOpenChange,
  onSave,
}: NewProductSheetProps) {
  const [openingStock, setOpeningStock] = useState(0);
  const [noBarcode, setNoBarcode] = useState(false);
  const [description, setDescription] = useState("");

  // Track uploaded images for 4 slots (null means empty)
const [images, setImages] = React.useState<( { file: File; preview: string } | null)[]>([
  null, // Slot 1 (Primary)
  null, // Slot 2
  null, // Slot 3
  null, // Slot 4
]);

// Hidden file input references for each slot
const fileInputRefs = [
  React.useRef<HTMLInputElement>(null),
  React.useRef<HTMLInputElement>(null),
  React.useRef<HTMLInputElement>(null),
  React.useRef<HTMLInputElement>(null),
];

// Handle file selection and generate preview URL
const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const newImages = [...images];
  if (newImages[index]) {
    URL.revokeObjectURL(newImages[index]!.preview);
  }

  newImages[index] = {
    file,
    preview: URL.createObjectURL(file),
  };
  setImages(newImages);
};

// Handle removing an image and resetting the input field
const removeImage = (index: number) => {
  const newImages = [...images];
  if (newImages[index]) {
    URL.revokeObjectURL(newImages[index]!.preview);
  }
  newImages[index] = null;
  setImages(newImages);
  
  if (fileInputRefs[index].current) {
    fileInputRefs[index].current!.value = "";
  }
};


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[550px] p-0 flex flex-col h-full bg-white"
      >
        {/* Header container */}
        <SheetHeader className="p-2 border-b text-left">
          <SheetTitle className="text-sm font-bold text-foreground">
            New Product
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Add a new product to inventory
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable form body content */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {/* Barcode/SKU input row */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              Barcode / SKU <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                placeholder="Scan/Enter Barcode or SKU"
                disabled={noBarcode}
                className="pr-10 bg-gray-50/30"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer">
                <ScanBarcode className="h-5 w-5" />
              </div>
            </div>
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="no-barcode"
                checked={noBarcode}
                onCheckedChange={(checked) => setNoBarcode(!!checked)}
              />
              <label
                htmlFor="no-barcode"
                className="text-xs font-medium text-muted-foreground cursor-pointer select-none"
              >
                This product does not have a barcode
              </label>
            </div>
          </div>

          {/* Product Name & Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Product Name <span className="text-destructive">*</span>
              </Label>
              <Input placeholder="Enter product name" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Category <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Stationery">Stationery</SelectItem>
                  <SelectItem value="Uniforms">Uniforms</SelectItem>
                  <SelectItem value="Footwear">Footwear</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Brand & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Brand
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Camlin">Camlin</SelectItem>
                  <SelectItem value="SchoolHub">SchoolHub</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Unit <span className="text-destructive">*</span>
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pcs">Pcs</SelectItem>
                  <SelectItem value="Boxes">Boxes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing Rows */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Purchase Price (₹) <span className="text-destructive">*</span>
              </Label>
              <Input type="text" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Selling Price (₹) <span className="text-destructive">*</span>
              </Label>
              <Input type="text" placeholder="0" />
            </div>
          </div>

          {/* Stock Configuration Numbers */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Opening Stock <span className="text-destructive">*</span>
              </Label>
              <div className="flex border rounded-md overflow-hidden h-10 items-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpeningStock(Math.max(0, openingStock - 1))}
                  className="rounded-none border-r h-full px-2"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 text-center font-medium text-sm text-gray-800">
                  {openingStock}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpeningStock(openingStock + 1)}
                  className="rounded-none border-l border-r h-full px-2"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <div className="bg-gray-50 text-muted-foreground text-xs px-3 font-semibold h-full flex items-center select-none">
                  Pcs
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Reorder Level
              </Label>
              <Input type="number" placeholder="0" className="h-10" />
            </div>
          </div>

          {/* Product Images Upload Area */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs text-gray-700">Product Images</Label>
            </div>

            <div className="border rounded-md divide-y overflow-hidden text-sm">
              {/* Hidden native file inputs */}
              {images.map((_, index) => (
                <input
                  key={index}
                  type="file"
                  accept="image/*"
                  ref={fileInputRefs[index]}
                  className="hidden"
                  onChange={(e) => handleFileChange(index, e)}
                />
              ))}

              {/* Image 1 (Primary with Preview) */}
              <div className="flex items-center justify-between p-1 bg-white">
                <div className="flex items-center gap-3">
                  {images[0] ? (
                    <img
                      src={images[0].preview}
                      alt="Primary Preview"
                      className="w-10 h-10 rounded border object-cover shadow-sm"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded border border-dashed bg-gray-50 flex items-center justify-center text-gray-400 font-medium">
                      <span className="text-[10px]">No Img</span>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-700 text-xs">
                      Image 1 (Primary)
                    </span>
                    {images[0] && (
                      <span className="text-[10px] text-green-800 max-w-[180px] truncate">
                        {images[0].file.name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                    Primary
                  </span>
                  {images[0] ? (
                    <Trash2
                      className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-600"
                      onClick={() => removeImage(0)}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRefs[0].current?.click()}
                      className="text-sm font-semibold text-blue-600 hover:underline"
                    >
                      Add Image
                    </button>
                  )}
                </div>
              </div>

              {/* Images 2, 3, 4 (No Preview, Text Only) */}
              {[1, 2, 3].map((index) => {
                const num = index + 1;
                const hasImage = !!images[index];

                return (
                  <div
                    key={num}
                    className="flex items-center justify-between p-2 bg-gray-50/30"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">
                        Image {num}{" "}
                        {hasImage && (
                          <span className="text-xs text-green-800 font-normal">
                            ({images[index]?.file.name})
                          </span>
                        )}
                      </span>
                    </div>
                    {hasImage ? (
                      <Trash2
                        className="h-4 w-4 text-red-500 cursor-pointer hover:text-red-600"
                        onClick={() => removeImage(index)}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRefs[index].current?.click()}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Add Image
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Description Text Container */}
        </div>
        {/* Description Input Container with Dynamic Character Counter */}
        <div className="space-y-2 p-3">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-semibold text-gray-700">
              Description
            </Label>
            <span className="text-xs font-medium text-blue-600">
              {description.length} / 200
            </span>
          </div>
          <Textarea
            placeholder="Camlin Geometry Box with all standard instruments."
            maxLength={200}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none h-24 border-gray-200 focus-visible:ring-blue-600 focus-visible:ring-1 focus-visible:border-blue-600"
          />
        </div>
        {/* Footer Action Buttons Sticky Panel */}
        <SheetFooter className="p-5 border-t bg-white flex flex-row gap-4 sm:space-x-0">
          <SheetClose asChild>
            <Button
              variant="outline"
              className="flex-1 bg-white font-semibold text-blue-600 border-blue-600 hover:bg-blue-50/50 transition-colors h-11"
            >
              Cancel
            </Button>
          </SheetClose>
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition-colors h-11"
            onClick={() => {
              if (onSave) onSave({ description });
              onOpenChange(false);
            }}
          >
            Save Product
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
