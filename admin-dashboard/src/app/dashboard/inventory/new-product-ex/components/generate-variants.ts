

// import {
//   MasterData,
//   ProductVariant,
//   VariantAttribute,
//   useProductStore,
// } from "../store/product-store";

// export function generateVariants(
//   rows: VariantAttribute[],
//   masterData: MasterData,
//   previousVariants: ProductVariant[] = [],
// ): ProductVariant[] {
//   const { basicInformation } = useProductStore.getState();

//   const baseSku = basicInformation.sku?.trim() ?? "";
//   const productCode = basicInformation.code?.trim() ?? ""; // e.g. "12"

//   const attributeGroups = rows.map((row) => {
//     const attributeName =
//       masterData.attributes.find(
//         (a) => String(a.id) === String(row.attributeId),
//       )?.name ?? "";

//     const values = row.attributeValues
//       .map((valueId) => {
//         const value = masterData.attributeValues.find(
//           (v) => String(v.id) === String(valueId),
//         );

//         if (!value) return null;

//         return {
//           name: value.name,
//           skuCode: value.skuCode ?? "",
//           code: value.code ?? "",
//         };
//       })
//       .filter(
//         (
//           value,
//         ): value is {
//           name: string;
//           skuCode: string;
//           code: string;
//         } => value !== null,
//       );

//     return {
//       attributeName,
//       values,
//     };
//   });

//   const result: ProductVariant[] = [];

//   function combine(
//     index: number,
//     current: Record<string, string>,
//     skuParts: string[],
//     barcodeParts: string[],
//   ) {
//     if (index === attributeGroups.length) {
//       const existing = previousVariants.find((variant) => {
//         const keys = Object.keys(current);

//         return (
//           keys.length === Object.keys(variant.attributes).length &&
//           keys.every((key) => variant.attributes[key] === current[key])
//         );
//       });

//       const sku = [baseSku, ...skuParts].filter(Boolean).join("-");

//       // const barcode = [productCode, ...barcodeParts]
//       //   .filter(Boolean)
//       //   .join("");

//       const barcode = [productCode, ...barcodeParts]
//         .filter(Boolean)
//         .join("-");

//       result.push({
//         id: existing?.id ?? crypto.randomUUID(),

//         sku: existing?.sku ?? sku,
//         barcode: existing?.barcode ?? barcode,

//         attributes: { ...current },

//         sellingPrice: existing?.sellingPrice ?? 0,
//         costPrice: existing?.costPrice ?? 0,
//         openingStock: existing?.openingStock ?? 0,

//         // Preserve images
//         imageIds: existing?.imageIds ?? [],

//         // Preserve thumbnail
//         thumbnailId: existing?.thumbnailId,

//         // Preserve hero image
//         heroImageId: existing?.heroImageId,
//       });

//       return;
//     }

//     const group = attributeGroups[index];

//     for (const value of group.values) {
//       combine(
//         index + 1,
//         {
//           ...current,
//           [group.attributeName]: value.skuCode,
//         },
//         [...skuParts, value.skuCode],
//         [...barcodeParts, value.code],
//       );
//     }
//   }

//   combine(0, {}, [], []);

//   return result;
// }

import {
  MasterData,
  ProductVariant,
  VariantAttribute,
  useProductStore,
} from "../store/product-store";

export function generateVariants(
  rows: VariantAttribute[],
  masterData: MasterData,
  previousVariants: ProductVariant[] = [],
): ProductVariant[] {
  const { basicInformation } = useProductStore.getState();

  const baseSku = basicInformation.sku?.trim() ?? "";

  // Use exactly the barcode entered by the user in Step 1
  const barcode = basicInformation.barcode?.trim() ?? "";

  const attributeGroups = rows.map((row) => {
    const attributeName =
      masterData.attributes.find(
        (a) => String(a.id) === String(row.attributeId),
      )?.name ?? "";

    const values = row.attributeValues
      .map((valueId) => {
        const value = masterData.attributeValues.find(
          (v) => String(v.id) === String(valueId),
        );

        if (!value) return null;

        return {
          name: value.name,
          skuCode: value.skuCode ?? "",
        };
      })
      .filter(
        (
          value,
        ): value is {
          name: string;
          skuCode: string;
        } => value !== null,
      );

    return {
      attributeName,
      values,
    };
  });

  const result: ProductVariant[] = [];

  function combine(
    index: number,
    current: Record<string, string>,
    skuParts: string[],
  ) {
    if (index === attributeGroups.length) {
      const existing = previousVariants.find((variant) => {
        const keys = Object.keys(current);

        return (
          keys.length === Object.keys(variant.attributes).length &&
          keys.every(
            (key) => variant.attributes[key] === current[key],
          )
        );
      });

      const sku = [baseSku, ...skuParts]
        .filter(Boolean)
        .join("-");

      result.push({
        id: existing?.id ?? crypto.randomUUID(),

        sku: existing?.sku ?? sku,

        // EXACTLY the barcode entered in Step 1
        barcode: existing?.barcode ?? barcode,

        attributes: { ...current },

        sellingPrice: existing?.sellingPrice ?? 0,
        costPrice: existing?.costPrice ?? 0,
        openingStock: existing?.openingStock ?? 0,

        imageIds: existing?.imageIds ?? [],
        thumbnailId: existing?.thumbnailId,
        heroImageId: existing?.heroImageId,
      });

      return;
    }

    const group = attributeGroups[index];

    for (const value of group.values) {
      combine(
        index + 1,
        {
          ...current,
          [group.attributeName]: value.skuCode,
        },
        [...skuParts, value.skuCode],
      );
    }
  }

  combine(0, {}, []);

  return result;
}