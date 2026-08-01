import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2, "Product name must be at least 2 characters"),
  code: z.string().trim().min(1, "Product code is required"),

  sku: z.string().optional(),
  description: z.string().optional(),

  brandId: z.string().optional(),
  categoryId: z.string().optional(),
  unitId: z.string().optional(),
  taxId: z.string().optional(),

  hsnCode: z.string().optional(),
  manufacturer: z.string().optional(),
  originCountry: z.string().optional(),

  hasVariants: z.boolean().optional(),
  trackInventory: z.boolean().optional(),
  allowBackorder: z.boolean().optional(),
  isActive: z.boolean().optional(),

  weight: z.number().optional(),
  length: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;