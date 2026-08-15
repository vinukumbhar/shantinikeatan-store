"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useProductStore } from "../../store/product-store";

interface AttributeValue {
  id: string;
  name: string;

  skuCode?: string;
  attributeId: string;
}

interface Attribute {
  id: string;
  name: string;
  code: string;
}

interface VariantTypeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attributes: Attribute[];
}

export default function VariantTypeSheet({
  open,
  onOpenChange,
  attributes,
}: VariantTypeSheetProps) {
  const masterData = useProductStore((state) => state.masterData);
  const setMasterData = useProductStore((state) => state.setMasterData);

  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"search" | "create" | "edit">("search");

  const [selectedAttribute, setSelectedAttribute] = useState<Attribute | null>(
    null,
  );

  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");
  const [editValues, setEditValues] = useState<AttributeValue[]>([]);

  const [createName, setCreateName] = useState("");
  const [createCode, setCreateCode] = useState("");
  const [createValues, setCreateValues] = useState<AttributeValue[]>([]);

  const [saving, setSaving] = useState(false);

  const results = attributes.filter((attribute) =>
    attribute.name.toLowerCase().includes(search.toLowerCase()),
  );

  const resetSheet = () => {
    setSearch("");
    setMode("search");
    setSelectedAttribute(null);

    setEditName("");
    setEditCode("");
    setEditValues([]);

    setCreateName("");
    setCreateCode("");
    setCreateValues([]);

    setSaving(false);

    onOpenChange(false);
  };

  const selectAttribute = (attribute: Attribute) => {
    setSelectedAttribute(attribute);
    setSearch(attribute.name);

    setEditName(attribute.name);
    setEditCode(attribute.code);

    const values = masterData.attributeValues.filter(
      (value) => String(value.attributeId) === String(attribute.id),
    );

    setEditValues(values);
    setMode("edit");
  };

  const resetForm = () => {
    // Reset search / selection
    setSearch("");
    setSelectedAttribute(null);

    if (mode === "create") {
      setCreateName("");
      setCreateCode("");
      setCreateValues([]);
    }

    if (mode === "edit" && selectedAttribute) {
      setEditName(selectedAttribute.name);
      setEditCode(selectedAttribute.code);

      const values = masterData.attributeValues.filter(
        (value) => String(value.attributeId) === String(selectedAttribute.id),
      );

      setEditValues(values);
    }

    // Return to search mode
    setMode("search");
  };
  const handleCreate = async () => {
    if (!createName.trim() || !createCode.trim()) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "http://localhost:8000/attributes/with-values",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: createName.trim(),
            code: createCode.trim(),
            description: `${createName.trim()} values`,
            isActive: true,

            values: createValues
              .filter((value) => value.name.trim())
              .map((value) => ({
                name: value.name.trim(),
                skuCode: value.skuCode?.trim() || "",
                description: `${value.name.trim()} ${createName.trim()}`,
                isActive: true,
              })),
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(errorData?.message || "Failed to create variant type");
      }

      const createdAttribute = await response.json();

      console.log("Created Attribute:", createdAttribute);

      setMasterData({
        ...masterData,

        attributes: [...masterData.attributes, createdAttribute],

        attributeValues: [
          ...masterData.attributeValues,
          ...(createdAttribute.values || []),
        ],
      });

      resetSheet();
    } catch (error) {
      console.error("Create attribute error:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedAttribute) {
      return;
    }

    if (!editName.trim() || !editCode.trim()) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `http://localhost:8000/attributes/${selectedAttribute.id}/with-values`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editName.trim(),
            code: editCode.trim(),
            description: `${editName.trim()} values`,
            isActive: true,

            values: editValues
              .filter((value) => value.name.trim())
              .map((value) => ({
                id: value.id?.startsWith("new-") ? undefined : value.id,

                name: value.name.trim(),
                skuCode: value.skuCode?.trim() || "",
                description: `${value.name.trim()} ${editName.trim()}`,
                isActive: true,
              })),
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(errorData?.message || "Failed to update variant type");
      }

      const updatedAttribute = await response.json();

      console.log("Updated Attribute:", updatedAttribute);

      // Update Zustand
      setMasterData({
        ...masterData,

        attributes: masterData.attributes.map((attribute) =>
          String(attribute.id) === String(selectedAttribute.id)
            ? updatedAttribute
            : attribute,
        ),

        attributeValues: [
          ...masterData.attributeValues.filter(
            (value) =>
              String(value.attributeId) !== String(selectedAttribute.id),
          ),
          ...(updatedAttribute.values || []),
        ],
      });

      resetSheet();
    } catch (error) {
      console.error("Update attribute error:", error);
    } finally {
      setSaving(false);
    }
  };
  return (
    <Sheet
      open={open}
      onOpenChange={(value) => {
        if (!value) {
          resetSheet();
        } else {
          onOpenChange(value);
        }
      }}
    >
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Variant Type</SheetTitle>

          <SheetDescription>
            Search an existing variant type or create a new one.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 px-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              value={search}
              readOnly={mode !== "search"}
              onChange={(e) => {
                setSearch(e.target.value);
                setMode("search");
                setSelectedAttribute(null);
              }}
              placeholder="Search or create variant type..."
              className="pl-9"
            />
          </div>

          {/* Search Results */}
          {search.trim() && mode === "search" && (
            <div className="rounded-md border">
              {results.map((attribute) => (
                <button
                  key={attribute.id}
                  type="button"
                  onClick={() => selectAttribute(attribute)}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  <span>{attribute.name}</span>

                  <span className="text-xs text-muted-foreground">
                    {attribute.code}
                  </span>
                </button>
              ))}

              {/* Create New */}
              <button
                type="button"
                onClick={() => {
                  setSelectedAttribute(null);
                  setCreateName(search);
                  setCreateCode("");
                  setCreateValues([]);
                  setMode("create");
                }}
                className="flex w-full items-center gap-2 border-t px-3 py-2 text-left text-sm text-blue-600 hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
                Create "{search}"
              </button>
            </div>
          )}
        </div>

        {/* Create Form */}
        {mode === "create" && (
          <div className="space-y-5 px-4 pt-4">
            <h3 className="font-semibold">Create Variant Type</h3>

            {/* Variant Type Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Variant Type Name</label>

              <Input
                value={createName}
                placeholder="Notebook Size"
                onChange={(e) => setCreateName(e.target.value)}
              />
            </div>

            {/* Variant Type Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Code</label>

              <Input
                value={createCode}
                placeholder="NOTEBOOK_SIZE"
                onChange={(e) => setCreateCode(e.target.value.toUpperCase())}
              />
            </div>

            {/* Variant Values */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Variant Values</label>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCreateValues([
                      ...createValues,
                      {
                        id: `new-${Date.now()}`,
                        name: "",
                        skuCode: "",
                        attributeId: "",
                      },
                    ])
                  }
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Value
                </Button>
              </div>

              {createValues.map((value, index) => (
                <div key={value.id} className="flex items-center gap-2">
                  {/* Value Name */}
                  <Input
                    value={value.name}
                    placeholder="A5"
                    onChange={(e) => {
                      const updated = [...createValues];

                      updated[index] = {
                        ...updated[index],
                        name: e.target.value,
                      };

                      setCreateValues(updated);
                    }}
                  />

                  {/* SKU Code - Editable */}
                  <Input
                    value={value.skuCode ?? ""}
                    placeholder="SKU Code"
                    onChange={(e) => {
                      const updated = [...createValues];

                      updated[index] = {
                        ...updated[index],
                        skuCode: e.target.value,
                      };

                      setCreateValues(updated);
                    }}
                  />

                  {/* Delete */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setCreateValues(
                        createValues.filter((_, i) => i !== index),
                      );
                    }}
                  >
                    <span className="text-red-500">×</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Form */}
        {mode === "edit" && selectedAttribute && (
          <div className="space-y-5 px-4 pt-4">
            <h3 className="font-semibold">Edit Variant Type</h3>

            {/* Variant Type Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Variant Type Name</label>

              <Input
                value={editName}
                placeholder="Notebook Size"
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            {/* Variant Type Code */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Code</label>

              <Input
                value={editCode}
                placeholder="NOTEBOOK_SIZE"
                onChange={(e) => setEditCode(e.target.value.toUpperCase())}
              />
            </div>

            {/* Variant Values */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Variant Values</label>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setEditValues([
                      ...editValues,
                      {
                        id: `new-${Date.now()}`,
                        name: "",
                        skuCode: "",
                        attributeId: selectedAttribute.id,
                      },
                    ])
                  }
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Value
                </Button>
              </div>

              {editValues.map((value, index) => (
                <div key={value.id} className="flex items-center gap-2">
                  {/* Value Name */}
                  <Input
                    value={value.name}
                    placeholder="A5"
                    onChange={(e) => {
                      const updated = [...editValues];

                      updated[index] = {
                        ...updated[index],
                        name: e.target.value,
                      };

                      setEditValues(updated);
                    }}
                  />

                  {/* SKU Code - Editable */}
                  <Input
                    value={value.skuCode ?? ""}
                    placeholder="SKU Code"
                    onChange={(e) => {
                      const updated = [...editValues];

                      updated[index] = {
                        ...updated[index],
                        skuCode: e.target.value,
                      };

                      setEditValues(updated);
                    }}
                  />

                  {/* Delete */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditValues(editValues.filter((_, i) => i !== index));
                    }}
                  >
                    <span className="text-red-500">×</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <SheetFooter className="flex flex-col gap-2">
          {/* Reset */}
          <Button
            type="button"
            variant="outline"
            disabled={saving}
            className="w-full"
            onClick={resetForm}
          >
            Reset
          </Button>

          {/* Cancel */}
          <Button
            type="button"
            variant="ghost"
            disabled={saving}
            className="w-full"
            onClick={resetSheet}
          >
            Cancel
          </Button>

          {/* Create / Save */}
          <Button
            type="button"
            disabled={saving}
            className="w-full"
            onClick={
              mode === "create"
                ? handleCreate
                : mode === "edit"
                  ? handleUpdate
                  : undefined
            }
          >
            {saving ? "Saving..." : mode === "create" ? "Create" : "Save"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
