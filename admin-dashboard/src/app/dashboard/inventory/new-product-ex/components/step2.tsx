"use client";

import { useState } from "react";
import { ArrowRight, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { MultiSearchableSelect } from "@/components/ui/MultiSearchableSelect";

import { useProductStore } from "../store/product-store";
import { ChevronDown, ChevronUp } from "lucide-react";
import { generateVariants } from "./generate-variants";

import VariantTypeSheet from "./variant-add/VariantTypeSheet";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attributes: any[];
}

interface StepTwoFormProps {
  onNext: () => void;
}

export default function StepTwoForm({ onNext }: StepTwoFormProps) {
  //const { variants: rows, setVariants: setRows } = useProductStore();

  const {
    variants: rows,
    setVariants: setRows,
    setProductVariants,
  } = useProductStore();

  const masterData = useProductStore((state) => state.masterData);
  const [variantTypeSheetOpen, setVariantTypeSheetOpen] = useState(false);

  const addAttribute = () => {
    setRows([
      ...rows,
      {
        attributeId: "",
        attributeValues: [],
      },
    ]);
  };

  const removeAttribute = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const updateAttribute = (index: number, attributeId: string) => {
    setRows(
      rows.map((row, i) =>
        i === index
          ? {
              attributeId,
              attributeValues: [],
            }
          : row,
      ),
    );
  };

  const updateAttributeValues = (index: number, values: string[]) => {
    setRows(
      rows.map((row, i) =>
        i === index
          ? {
              ...row,
              attributeValues: values,
            }
          : row,
      ),
    );
  };

  const getAvailableAttributes = (currentIndex: number) => {
    const selectedAttributeIds = rows
      .filter((_, index) => index !== currentIndex)
      .map((row) => String(row.attributeId));

    return masterData.attributes.filter(
      (attribute) => !selectedAttributeIds.includes(String(attribute.id)),
    );
  };

  // Master Data
  //const masterData = useProductStore((state) => state.masterData);

  const [expandedIndex, setExpandedIndex] = useState(0);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {rows.map((row, index) => {
          const filteredValues = masterData.attributeValues.filter(
            (item) => String(item.attributeId) === String(row.attributeId),
          );

          const attributeName =
            masterData.attributes.find(
              (a) => String(a.id) === String(row.attributeId),
            )?.name || `Variant ${index + 1}`;

          const selectedValues = row.attributeValues
            .map(
              (id) =>
                masterData.attributeValues.find(
                  (v) => String(v.id) === String(id),
                )?.name,
            )
            .filter(Boolean)
            .join(", ");

          return (
            <div
              key={index}
              className="overflow-hidden rounded-lg border bg-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h3 className="text-sm font-semibold">{attributeName}</h3>

                  {selectedValues && (
                    <p className="text-xs text-muted-foreground">
                      {selectedValues}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {rows.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAttribute(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setExpandedIndex(expandedIndex === index ? -1 : index)
                    }
                  >
                    {expandedIndex === index ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Expandable Content */}
              {expandedIndex === index && (
                <div className="grid grid-cols-1 gap-4 border-t p-4 md:grid-cols-[1fr_1fr]">
                  <div className="space-y-1.5">
                    {/* <Label>Variant Type</Label> */}

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <SearchableSelect
                          options={getAvailableAttributes(index)}
                          value={row.attributeId}
                          onChange={(value) => updateAttribute(index, value)}
                          placeholder="Select Variant Type"
                          searchPlaceholder="Search Variant Type"
                        />
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setVariantTypeSheetOpen(true)}
                        title="Add Variant Type"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <VariantTypeSheet
                    open={variantTypeSheetOpen}
                    onOpenChange={setVariantTypeSheetOpen}
                    attributes={masterData.attributes}
                  />

                  <div className="space-y-1.5">
                  

                    <SearchableSelect
                      options={filteredValues}
                      value={row.attributeValues?.[0] ?? ""}
                      onChange={(value) =>
                        updateAttributeValues(index, value ? [value] : [])
                      }
                      placeholder="Select Variant Type Value"
                      searchPlaceholder="Search Variant Type Value"
                      disabled={!row.attributeId}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <Button
          type="button"
          variant="outline"
          onClick={() => {
            addAttribute();
            setExpandedIndex(rows.length);
          }}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Variant
        </Button>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={() => {
            const generatedVariants = generateVariants(rows, masterData);

            setProductVariants(generatedVariants);

            console.log("Selected Attributes:", rows);
            console.log("Generated Variants:", generatedVariants);

            onNext();
          }}
          className="flex h-9 items-center gap-2 bg-blue-600 px-5 text-xs font-semibold hover:bg-blue-700"
        >
          Next
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
