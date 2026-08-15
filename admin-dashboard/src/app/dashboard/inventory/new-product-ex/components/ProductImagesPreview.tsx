// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useProductStore } from "../store/product-store";

// interface ProductImageResponse {
//   id: string;
//   productId: string;
//   path: string;
// }

// export default function ProductImagesPreview() {
//   const { defaultImages } = useProductStore();

//   const [images, setImages] = useState<ProductImageResponse[]>([]);

//   useEffect(() => {
//     const loadImages = async () => {
//       if (defaultImages.imageIds.length === 0) {
//         setImages([]);
//         return;
//       }

//       try {
//         const responses = await Promise.all(
//           defaultImages.imageIds.map((id) =>
//             axios.get<ProductImageResponse>(
//               `http://localhost:8000/product-images/${id}`
//             )
//           )
//         );

//         setImages(responses.map((res) => res.data));
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     loadImages();
//   }, [defaultImages.imageIds]);

//   return (
//     <div className="grid grid-cols-3 gap-6">
//       {images.map((image) => {
//         const isThumbnail = image.id === defaultImages.thumbnailId;
//         const isHero = image.id === defaultImages.heroImageId;

//         return (
//           <div
//             key={image.id}
//             className="rounded-lg border bg-white p-3 shadow-sm"
//           >
//             <img
//               src={`http://localhost:8000/${image.path}`}
//               alt={image.id}
//               className="h-48 w-full rounded object-cover"
//             />

//             <div className="mt-3 flex flex-wrap gap-2">
//               <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium">
//                 Gallery
//               </span>

//               {isThumbnail && (
//                 <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
//                   Thumbnail
//                 </span>
//               )}

//               {isHero && (
//                 <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
//                   Hero
//                 </span>
//               )}
//             </div>

//             {/* <p className="mt-2 break-all text-xs text-gray-500">
//               {image.id}
//             </p> */}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { useProductStore } from "../store/product-store";

interface ProductImageResponse {
  id: string;
  productId: string;
  path: string;
}

export default function ProductPreviewImages() {
  const { defaultImages, productVariants } = useProductStore();

  const [images, setImages] = useState<
    Record<string, ProductImageResponse>
  >({});

  const imageIds = useMemo(() => {
    const ids = new Set<string>();

    defaultImages.imageIds.forEach((id) => ids.add(id));

    productVariants.forEach((variant) => {
      variant.imageIds.forEach((id) => ids.add(id));
    });

    return [...ids];
  }, [defaultImages, productVariants]);

  useEffect(() => {
    const loadImages = async () => {
      if (imageIds.length === 0) return;

      const responses = await Promise.all(
        imageIds.map((id) =>
          axios.get<ProductImageResponse>(
            `http://localhost:8000/product-images/${id}`,
          ),
        ),
      );

      const map: Record<string, ProductImageResponse> = {};

      responses.forEach((response) => {
        map[response.data.id] = response.data;
      });

      setImages(map);
    };

    loadImages();
  }, [imageIds]);

  return (
    <div className="space-y-12">
      {/* ===================================== */}
      {/* Default Images */}
      {/* ===================================== */}

      <div>
        <h2 className="mb-5 text-xl font-semibold">
          Product Default Images
        </h2>

        <div className="grid grid-cols-5 gap-5">
          {defaultImages.imageIds.map((id) => {
            const image = images[id];

            if (!image) return null;

            return (
              <div
                key={id}
                className="rounded-lg border bg-white p-3 shadow-sm"
              >
                <img
                  src={`http://localhost:8000/${image.path}`}
                  className="h-48 w-full rounded object-cover"
                  alt=""
                />

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                    Gallery
                  </span>

                  {id === defaultImages.thumbnailId && (
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                      Thumbnail
                    </span>
                  )}

                  {id === defaultImages.heroImageId && (
                    <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                      Hero
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================== */}
      {/* Variant Images */}
      {/* ===================================== */}

      {productVariants.map((variant) => (
        <div key={variant.id}>
          <h2 className="mb-5 text-xl font-semibold">
            {variant.sku}
          </h2>

          <div className="grid grid-cols-5 gap-5">
            {variant.imageIds.map((id) => {
              const image = images[id];

              if (!image) return null;

              return (
                <div
                  key={id}
                  className="rounded-lg border bg-white p-3 shadow-sm"
                >
                  <img
                    src={`http://localhost:8000/${image.path}`}
                    className="h-48 w-full rounded object-cover"
                    alt=""
                  />

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded bg-gray-100 px-2 py-1 text-xs">
                      Gallery
                    </span>

                    {id === variant.thumbnailId && (
                      <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                        Thumbnail
                      </span>
                    )}

                    {id === variant.heroImageId && (
                      <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                        Hero
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}