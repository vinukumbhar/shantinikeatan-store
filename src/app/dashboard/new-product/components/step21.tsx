// "use client";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@/components/ui/button";
// import { Plus, Trash2, CheckCircle2 } from "lucide-react";
// import { useState } from "react";

// interface VariantItem {
//   name: string;
//   sku: string;
//   barcode: string;
//   mrp: number;
//   sellingPrice: number;
//   costPrice: number;
//   isDefault: boolean;
//   isActive: boolean;
// }

// interface StepTwoFormProps {
//   onNext: () => void;
// }

// export default function StepTwoForm({ onNext }: StepTwoFormProps) {
//   // Initialize with a default primary variant matching your DTO rules
//   const [variants, setVariants] = useState<VariantItem[]>([
//     {
//       name: "Standard",
//       sku: "CAM-GBOX-001-STD",
//       barcode: "",
//       mrp: 150,
//       sellingPrice: 120,
//       costPrice: 80,
//       isDefault: true,
//       isActive: true,
//     },
//   ]);

//   // Handler to push a brand new variant entry block into the array stack
//   const addVariant = () => {
//     setVariants([
//       ...variants,
//       {
//         name: "",
//         sku: `CAM-GBOX-001-V${variants.length + 1}`,
//         barcode: "",
//         mrp: 0,
//         sellingPrice: 0,
//         costPrice: 0,
//         isDefault: false,
//         isActive: true,
//       },
//     ]);
//   };

//   // Handler to drop specific variant sub-blocks from state mapping
//   const removeVariant = (index: number) => {
//     if (variants.length === 1) return; // Prevent deleting everything
//     const updated = variants.filter((_, i) => i !== index);

//     // Fallback logic: If deleted item was default, assign default flag to entry 0
//     if (variants[index].isDefault) {
//       updated[0].isDefault = true;
//     }
//     setVariants(updated);
//   };

//   // Field change controller handling field updates dynamically
//   const updateField = (index: number, field: keyof VariantItem, value: any) => {
//     const updated = variants.map((item, i) => {
//       if (i !== index) return item;

//       // If setting a new row as default, uncheck default status elsewhere
//       if (field === "isDefault" && value === true) {
//         return { ...item, [field]: value };
//       }
//       return { ...item, [field]: value };
//     });

//     if (field === "isDefault" && value === true) {
//       setVariants(updated.map((item, i) => i !== index ? { ...item, isDefault: false } : item));
//     } else {
//       setVariants(updated);
//     }
//   };

//   return (
//     <div className="w-full space-y-6">
//       {/* Form Section Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h2 className="text-base font-bold text-slate-900">Product Variants</h2>
//           <p className="text-2xs sm:text-xs text-slate-500 mt-0.5">
//             Manage alternative configurations, pricing models, and unique tracking barcodes.
//           </p>
//         </div>
//         <Button
//           type="button"
//           onClick={addVariant}
//           className="h-8 rounded-md bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-700 flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
//         >
//           <Plus className="h-3.5 w-3.5" /> Add Variant
//         </Button>
//       </div>

//       {/* Dynamic List Array Wrapper */}
//       <div className="space-y-4">
//         {variants.map((variant, index) => (
//           <div
//             key={index}
//             className={`relative rounded-xl border p-4 sm:p-5 transition-all bg-white ${
//               variant.isDefault ? "border-blue-200 bg-blue-50/5" : "border-slate-100"
//             }`}
//           >
//             {/* Header sub-row with tracking title indicators */}
//             <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
//               <div className="flex items-center gap-2">
//                 <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
//                   {index + 1}
//                 </span>
//                 <span className="text-xs font-bold text-slate-800">
//                   {variant.name || "Unnamed Variant"}
//                 </span>
//                 {variant.isDefault && (
//                   <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-100">
//                     <CheckCircle2 className="h-2.5 w-2.5" /> Default Variant
//                   </span>
//                 )}
//               </div>

//               {/* Trash removal trigger */}
//               {variants.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeVariant(index)}
//                   className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </button>
//               )}
//             </div>

//             {/* Input Attributes Fields Grid (Maps to DTO properties) */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-5">
//               {/* variant.name */}
//               <div className="space-y-1.5">
//                 <Label className="text-xs font-semibold text-slate-800">Variant Name *</Label>
//                 <Input
//                   type="text"
//                   placeholder="e.g. Red, XL, 500g"
//                   value={variant.name}
//                   onChange={(e) => updateField(index, "name", e.target.value)}
//                   className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
//                 />
//               </div>

//               {/* variant.sku */}
//               <div className="space-y-1.5">
//                 <Label className="text-xs font-semibold text-slate-800">Variant SKU *</Label>
//                 <Input
//                   type="text"
//                   value={variant.sku}
//                   onChange={(e) => updateField(index, "sku", e.target.value)}
//                   className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
//                 />
//               </div>

//               {/* variant.barcode */}
//               <div className="space-y-1.5">
//                 <Label className="text-xs font-semibold text-slate-800">Barcode (Optional)</Label>
//                 <Input
//                   type="text"
//                   placeholder="UPC / EAN String"
//                   value={variant.barcode}
//                   onChange={(e) => updateField(index, "barcode", e.target.value)}
//                   className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
//                 />
//               </div>

//               {/* variant.costPrice */}
//               <div className="space-y-1.5">
//                 <Label className="text-xs font-semibold text-slate-800">Cost Price *</Label>
//                 <Input
//                   type="number"
//                   value={variant.costPrice || ""}
//                   placeholder="0.00"
//                   onChange={(e) => updateField(index, "costPrice", parseFloat(e.target.value) || 0)}
//                   className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
//                 />
//               </div>

//               {/* variant.sellingPrice */}
//               <div className="space-y-1.5">
//                 <Label className="text-xs font-semibold text-slate-800">Selling Price *</Label>
//                 <Input
//                   type="number"
//                   value={variant.sellingPrice || ""}
//                   placeholder="0.00"
//                   onChange={(e) => updateField(index, "sellingPrice", parseFloat(e.target.value) || 0)}
//                   className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
//                 />
//               </div>

//               {/* variant.mrp */}
//               <div className="space-y-1.5">
//                 <Label className="text-xs font-semibold text-slate-800">MRP (Optional)</Label>
//                 <Input
//                   type="number"
//                   value={variant.mrp || ""}
//                   placeholder="0.00"
//                   onChange={(e) => updateField(index, "mrp", parseFloat(e.target.value) || 0)}
//                   className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
//                 />
//               </div>
//             </div>

//             {/* Boolean Control Switches (isDefault & isActive) */}
//             <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-3 border-t border-slate-100">
//               <div className="flex items-center gap-2">
//                 <Switch
//                   checked={variant.isDefault}
//                   onCheckedChange={(val) => updateField(index, "isDefault", val)}
//                   disabled={variant.isDefault} // At least one item must always be default
//                   className="data-[state=checked]:bg-blue-600"
//                 />
//                 <span className="text-[11px] font-medium text-slate-600">Set as Primary Default Variant</span>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Switch
//                   checked={variant.isActive}
//                   onCheckedChange={(val) => updateField(index, "isActive", val)}
//                   className="data-[state=checked]:bg-blue-600"
//                 />
//                 <span className="text-[11px] font-medium text-slate-600">Variant Available for Sale (Active)</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VariantItem {
  name: string;
  sku: string;
  barcode: string;
  mrp: number;
  sellingPrice: number;
  costPrice: number;
  isDefault: boolean;
  isActive: boolean;
}
const attributes = [
  { id: "1", name: "Color" },
  { id: "2", name: "Size" },
  { id: "3", name: "Material" },
  { id: "4", name: "Style" },
  { id: "5", name: "Capacity" },
  { id: "6", name: "Weight" },
];
interface VariantAttribute {
  id: string;
  attributeId?: string;
  attributeName: string;
  value: string;
}

interface StepTwoFormProps {
  onNext: () => void;
}

export default function StepTwoForm({ onNext }: StepTwoFormProps) {
  // Initialize with a default primary variant matching your DTO rules
  const [variants, setVariants] = useState<VariantItem[]>([
    {
      name: "Standard",
      sku: "CAM-GBOX-001-STD",
      barcode: "",
      mrp: 150,
      sellingPrice: 120,
      costPrice: 80,
      isDefault: true,
      isActive: true,
    },
  ]);

  const [attributes, setAttributes] = useState<VariantAttribute[]>([
    {
      id: crypto.randomUUID(),
      attributeName: "",
      value: "",
    },
  ]);

  const updateAttribute = (
    id: string,
    field: "attributeName" | "value",
    value: string,
  ) => {
    setAttributes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const removeAttribute = (id: string) => {
    setAttributes((prev) => prev.filter((a) => a.id !== id));
  };

  const addAttribute = () => {
    setAttributes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        attributeName: "",
        value: "",
      },
    ]);
  };

  // Handler to push a brand new variant entry block into the array stack
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        name: "",
        sku: `CAM-GBOX-001-V${variants.length + 1}`,
        barcode: "",
        mrp: 0,
        sellingPrice: 0,
        costPrice: 0,
        isDefault: false,
        isActive: true,
      },
    ]);
  };

  // Handler to drop specific variant sub-blocks from state mapping
  const removeVariant = (index: number) => {
    if (variants.length === 1) return; // Prevent deleting everything
    const updated = variants.filter((_, i) => i !== index);

    // Fallback logic: If deleted item was default, assign default flag to entry 0
    if (variants[index].isDefault) {
      updated[0].isDefault = true;
    }
    setVariants(updated);
  };

  // Field change controller handling field updates dynamically
  const updateField = (index: number, field: keyof VariantItem, value: any) => {
    const updated = variants.map((item, i) => {
      if (i !== index) return item;

      // If setting a new row as default, uncheck default status elsewhere
      if (field === "isDefault" && value === true) {
        return { ...item, [field]: value };
      }
      return { ...item, [field]: value };
    });

    if (field === "isDefault" && value === true) {
      setVariants(
        updated.map((item, i) =>
          i !== index ? { ...item, isDefault: false } : item,
        ),
      );
    } else {
      setVariants(updated);
    }
  };

  const variantPreview = attributes
    .map((x) => x.value)
    .filter(Boolean)
    .join(" / ");

  return (
    <div className="w-full space-y-6">
      {/* Form Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Product Variants
          </h2>
          <p className="text-2xs sm:text-xs text-slate-500 mt-0.5">
            Manage alternative configurations, pricing models, and unique
            tracking barcodes.
          </p>
        </div>
        <Button
          type="button"
          onClick={addVariant}
          className="h-8 rounded-md bg-blue-600 px-3 text-xs font-semibold text-white hover:bg-blue-700 flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" /> Add Variant
        </Button>
      </div>

      {/* Dynamic List Array Wrapper */}
      <div className="space-y-4">
        {variants.map((variant, index) => (
          <div
            key={index}
            className={`relative rounded-xl border p-4 sm:p-5 transition-all bg-white ${
              variant.isDefault
                ? "border-blue-200 bg-blue-50/5"
                : "border-slate-100"
            }`}
          >
            {/* Header sub-row with tracking title indicators */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                  {index + 1}
                </span>
                <span className="text-xs font-bold text-slate-800">
                  {variant.name || "Unnamed Variant"}
                </span>
                {variant.isDefault && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 border border-blue-100">
                    <CheckCircle2 className="h-2.5 w-2.5" /> Default Variant
                  </span>
                )}
              </div>

              {/* Trash removal trigger */}
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Input Attributes Fields Grid (Maps to DTO properties) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-5">
              {/* variant.name */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-800">
                  Variant Name *
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. Red, XL, 500g"
                  value={variant.name}
                  onChange={(e) => updateField(index, "name", e.target.value)}
                  className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
                />
              </div>

              {/* variant.sku */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-800">
                  Variant SKU *
                </Label>
                <Input
                  type="text"
                  value={variant.sku}
                  onChange={(e) => updateField(index, "sku", e.target.value)}
                  className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
                />
              </div>

              {/* variant.barcode */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-800">
                  Barcode (Optional)
                </Label>
                <Input
                  type="text"
                  placeholder="UPC / EAN String"
                  value={variant.barcode}
                  onChange={(e) =>
                    updateField(index, "barcode", e.target.value)
                  }
                  className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
                />
              </div>

              {/* variant.costPrice */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-800">
                  Cost Price *
                </Label>
                <Input
                  type="number"
                  value={variant.costPrice || ""}
                  placeholder="0.00"
                  onChange={(e) =>
                    updateField(
                      index,
                      "costPrice",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
                />
              </div>

              {/* variant.sellingPrice */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-800">
                  Selling Price *
                </Label>
                <Input
                  type="number"
                  value={variant.sellingPrice || ""}
                  placeholder="0.00"
                  onChange={(e) =>
                    updateField(
                      index,
                      "sellingPrice",
                      parseFloat(e.target.value) || 0,
                    )
                  }
                  className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
                />
              </div>

              {/* variant.mrp */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-800">
                  MRP (Optional)
                </Label>
                <Input
                  type="number"
                  value={variant.mrp || ""}
                  placeholder="0.00"
                  onChange={(e) =>
                    updateField(index, "mrp", parseFloat(e.target.value) || 0)
                  }
                  className="h-9 w-full rounded-md border-slate-200 bg-white px-3 text-xs text-slate-900 focus-visible:ring-1 focus-visible:ring-blue-600"
                />
              </div>
            </div>

            {/* Boolean Control Switches (isDefault & isActive) */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Switch
                  checked={variant.isDefault}
                  onCheckedChange={(val) =>
                    updateField(index, "isDefault", val)
                  }
                  disabled={variant.isDefault} // At least one item must always be default
                  className="data-[state=checked]:bg-blue-600"
                />
                <span className="text-[11px] font-medium text-slate-600">
                  Set as Primary Default Variant
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={variant.isActive}
                  onCheckedChange={(val) => updateField(index, "isActive", val)}
                  className="data-[state=checked]:bg-blue-600"
                />
                <span className="text-[11px] font-medium text-slate-600">
                  Variant Available for Sale (Active)
                </span>
               
              </div>
              
            </div>
             <div className="rounded-xl border border-slate-200 p-5 space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">Attributes</h3>

                      <p className="text-xs text-slate-500">
                        Define this variant using attributes.
                      </p>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addAttribute}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Attribute
                    </Button>
                  </div>

                  {attributes.map((attribute) => (
                    <div
                      key={attribute.id}
                      className="grid grid-cols-12 gap-3 items-end"
                    >
                      <div className="col-span-5">
                        <Label>Attribute</Label>

                        <Select
                          value={attribute.attributeId}
                          onValueChange={(value) =>
                            updateAttribute(attribute.id, "attributeId", value)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select attribute" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="1">Color</SelectItem>
                            <SelectItem value="2">Size</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-6">
                        <Label>Value</Label>

                        <Input
                          placeholder="Enter value"
                          value={attribute.value}
                          onChange={(e) =>
                            updateAttribute(
                              attribute.id,
                              "value",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      <div className="col-span-1 flex justify-end">
                        <Button
                          size="icon"
                          variant="ghost"
                          type="button"
                          onClick={() => removeAttribute(attribute.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-lg bg-slate-50 border px-4 py-3">
                    <Label className="text-xs text-slate-500">
                      Variant Preview
                    </Label>

                    <p className="mt-1 text-sm font-semibold">
                      {variantPreview || "No attributes selected"}
                    </p>
                  </div>
                </div>
          </div>
        ))}
      </div>

      
    
    </div>
  );
}
