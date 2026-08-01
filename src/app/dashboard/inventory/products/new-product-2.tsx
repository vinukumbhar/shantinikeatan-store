"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  productSchema,
  ProductFormValues,
} from "./product.schema";

import { ProductService } from "./product.service";

interface ProductSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductSheet({
  open,
  onOpenChange,
}: ProductSheetProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      code: "",
      sku: "",
      description: "",
      brandId: "",
      categoryId: "",
      unitId: "",
      taxId: "",
      hsnCode: "",
      manufacturer: "",
      originCountry: "",
      hasVariants: false,
      trackInventory: true,
      allowBackorder: false,
      isActive: true,
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    console.log("Submit Clicked");
    console.log(values);

    try {
      const response = await ProductService.create(values);
      console.log("API Response:", response);
      toast.success("Product created successfully");
      reset();
      onOpenChange(false);
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Unable to create product");
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[550px] p-0 flex flex-col"
      >
        {/* Header */}
        <SheetHeader className="border-b p-4">
          <SheetTitle>New Product</SheetTitle>
          <SheetDescription>
            Add a new product to inventory.
          </SheetDescription>
        </SheetHeader>

        {/* Body */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col"
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* Primary Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="code">
                  Product Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="code"
                  placeholder="PRD0001"
                  {...register("code")}
                />
                {errors.code && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.code.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="SKU-XYZ"
                  {...register("sku")}
                />
                {errors.sku && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.sku.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter item description"
                {...register("description")}
              />
            </div>

            {/* Inventory & Status Toggles */}
            <div className="space-y-3 pt-2 border-t">
              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="trackInventory"
                  render={({ field }) => (
                    <Checkbox
                      id="trackInventory"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="trackInventory" className="cursor-pointer">Track Inventory</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="allowBackorder"
                  render={({ field }) => (
                    <Checkbox
                      id="allowBackorder"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="allowBackorder" className="cursor-pointer">Allow Backorders</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="hasVariants"
                  render={({ field }) => (
                    <Checkbox
                      id="hasVariants"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="hasVariants" className="cursor-pointer">This product has variants</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field }) => (
                    <Checkbox
                      id="isActive"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="isActive" className="cursor-pointer">Active / Published</Label>
              </div>
            </div>

            {/* Expandable Section for Additional Metadata */}
            <Accordion type="single" collapsible className="w-full border-t pt-2">
              <AccordionItem value="additional-details" className="border-b-0">
                <AccordionTrigger className="text-sm font-medium text-muted-foreground hover:no-underline py-2">
                  Advanced / Additional Details
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pt-3 pb-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="brandId">Brand ID</Label>
                      <Input id="brandId" placeholder="Brand reference" {...register("brandId")} />
                    </div>
                    <div>
                      <Label htmlFor="categoryId">Category ID</Label>
                      <Input id="categoryId" placeholder="Category reference" {...register("categoryId")} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="unitId">Unit ID</Label>
                      <Input id="unitId" placeholder="e.g. PCS, KG" {...register("unitId")} />
                    </div>
                    <div>
                      <Label htmlFor="taxId">Tax ID</Label>
                      <Input id="taxId" placeholder="Tax slab rule" {...register("taxId")} />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="hsnCode">HSN Code</Label>
                    <Input id="hsnCode" placeholder="Harmonized System Code" {...register("hsnCode")} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="manufacturer">Manufacturer</Label>
                      <Input id="manufacturer" placeholder="Company Name" {...register("manufacturer")} />
                    </div>
                    <div>
                      <Label htmlFor="originCountry">Country of Origin</Label>
                      <Input id="originCountry" placeholder="e.g. India" {...register("originCountry")} />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Footer */}
          <div className="border-t p-4 flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
