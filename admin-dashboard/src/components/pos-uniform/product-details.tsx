// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { IndianRupee,  ShoppingCart } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import {Separator} from "@/components/ui/separator"

// export function ProductDetails() {
//   return (
//     <Card className="flex-1 p-6">
//       <h2 className="text-2xl font-bold">Product Details</h2>

//       <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
//         {/* Image */}
//         <div className="flex h-80 items-center justify-center rounded border">
//           <Image
//             src="/products/shirt.png"
//             alt="Product"
//             width={300}
//             height={300}
//             className="h-auto max-h-72 w-auto object-contain"
//           />
//         </div>

//         {/* Details */}
//         <div className="flex flex-col justify-center space-y-4">
//           <h1 className="text-3xl font-bold">School Shirt (Full Sleeve)</h1>

//           <div className="flex items-center ml-2">
//             <IndianRupee className="h-6 w-6 text-blue-600 " />
//             <span className=" text-3xl font-semibold text-blue-600">
//               450.00
//             </span>
//             <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300 ml-6">
//               <ShoppingCart data-icon="inline-start" />
//               In Stock
//             </Badge>

//             <p className="ml-4">Stock: 120</p>
//           </div>

//            {/* Fallback horizontal separator for mobile screens when flex wraps vertically */}
//       <Separator
//         orientation="horizontal"
//         className="block lg:hidden w-full  bg-border my-4 "
//       />

//           <p>SKU: UNI-20001</p>

//           <p>Stock: 120</p>

//           <Button className="w-fit">Add To Cart</Button>
//         </div>
//       </div>
//     </Card>
//   );
// }
import Image from "next/image";
import {
  IndianRupee,
  ShoppingCart,
  CheckCircle2,
  Minus,
  Plus,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card,CardHeader,CardTitle,CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const productDetails = [
  { label: "SKU", value: "UNI-20001" },
  { label: "Category", value: "Uniforms" },
  { label: "Brand", value: "SchoolHub" },
  { label: "Size", value: "S, M, L, XL, XXL" },
  { label: "Color", value: "Light Blue" },
  { label: "Material", value: "Cotton Blend" },
];

const quickInfo = [
  { label: "Stock", value: "120 pcs" },
  { label: "Rack / Location", value: "A-03 / Shelf 2" },
  { label: "GST (Tax)", value: "5%" },
  { label: "Cart Quantity", value: "2" },
  { label: "Last Scanned", value: "10:24:35 AM" },
];

// export function ProductDetails() {
//   return (
//     <Card className="w-full p-6">
//       <h2 className="text-2xl font-bold">Product Details</h2>

//       <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
//         {/* Image */}
//         <div className="flex h-80 w-300px items-center justify-center rounded-lg border">
//           <Image
//             src="/products/shirt.png"
//             alt="School Shirt"
//             width={300}
//             height={300}
//             className="object-contain"
//           />
//         </div>

//         {/* Details */}
//         <div className="flex flex-col space-y-5">
//           <h1 className="text-3xl font-bold">School Shirt (Full Sleeve)</h1>

//           {/* Price */}
//           <div className="flex items-center gap-2">
//             <IndianRupee className="h-6 w-6 text-blue-600" />
//             <span className="text-3xl font-bold text-blue-600">450.00</span>
//           </div>

//           {/* Stock */}
//           <div className="flex items-center justify-between">
//             <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
//               <ShoppingCart className="mr-1 h-4 w-4" />
//               In Stock
//             </Badge>

//             <span className="text-sm text-muted-foreground">
//               Stock: <strong>120 pcs</strong>
//             </span>
//           </div>

//           <Separator />

//           {/* Product Details */}
//           <Card className="p-4">
//             <div className="space-y-3">
//               {productDetails.map((item) => (
//                 <div
//                   key={item.label}
//                   className="flex items-center justify-between"
//                 >
//                   <span className="text-muted-foreground">{item.label}</span>

//                   <span className="font-medium">{item.value}</span>
//                 </div>
//               ))}
//             </div>
//           </Card>

//         </div>
//          {/* Purchase Panel */}
//           <div className="space-y-4">
//             <Card className="p-5">
//               <h3 className="mb-4 font-semibold">Quantity</h3>

//               <div className="mb-5 flex items-center justify-between rounded-md border px-3 py-2">
//                 <Button variant="ghost" size="icon">
//                   <Minus className="h-4 w-4" />
//                 </Button>

//                 <span className="text-lg font-semibold">1</span>

//                 <Button variant="ghost" size="icon">
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>

//               <Button className="w-full">
//                 <ShoppingCart className="mr-2 h-4 w-4" />
//                 Add To Cart
//               </Button>
//             </Card>

//             <Card className="p-5">
//               <h3 className="mb-4 font-semibold">Quick Information</h3>

//               <div className="space-y-3">
//                 {quickInfo.map((item) => (
//                   <div
//                     key={item.label}
//                     className="flex items-center justify-between"
//                   >
//                     <span className="text-sm text-muted-foreground">
//                       {item.label}
//                     </span>

//                     <span className="text-sm font-medium">{item.value}</span>
//                   </div>
//                 ))}
//               </div>
//             </Card>
//           </div>

//       </div>
//     </Card>
//   );
// }

export function ProductDetails() {
  return (
    // <Card className="w-full p-6">
    //   <h2 className="text-2xl font-bold">Product Details</h2>

    //   <div className="mt-6 flex flex-col gap-8 xl:flex-row">
    //     {/* Image */}
    //     <div className="xl:w-[320px] shrink-0">
    //       <div className="flex h-80 items-center justify-center rounded-lg border">
    //         <Image
    //           src="/products/shirt.png"
    //           alt="School Shirt"
    //           width={300}
    //           height={300}
    //           className="object-contain"
    //         />
    //       </div>
    //     </div>

    //     {/* Details */}
    //     <div className="flex-1 min-w-0 space-y-5">
    //       <h1 className="text-3xl font-bold">
    //         School Shirt (Full Sleeve)
    //       </h1>

    //       {/* Price */}
    //       <div className="flex items-center gap-2">
    //         <IndianRupee className="h-6 w-6 text-blue-600" />
    //         <span className="text-3xl font-bold text-blue-600">
    //           450.00
    //         </span>
    //       </div>

    //       {/* Stock */}
    //       <div className="flex items-center justify-between">
    //         <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
    //           <ShoppingCart className="mr-1 h-4 w-4" />
    //           In Stock
    //         </Badge>

    //         <span className="text-sm text-muted-foreground">
    //           Stock: <strong>120 pcs</strong>
    //         </span>
    //       </div>

    //       <Separator />

    //       {/* Product Details */}
    //       <Card className="p-4">
    //         <div className="space-y-3">
    //           {productDetails.map((item) => (
    //             <div
    //               key={item.label}
    //               className="flex items-center justify-between"
    //             >
    //               <span className="text-muted-foreground">
    //                 {item.label}
    //               </span>

    //               <span className="font-medium">
    //                 {item.value}
    //               </span>
    //             </div>
    //           ))}
    //         </div>
    //       </Card>
    //     </div>

    //     {/* Purchase Panel */}
    //     <div className="xl:w-[300px] shrink-0 space-y-4">
    //       <Card className="p-5">
    //         <h3 className="mb-4 font-semibold">Quantity</h3>

    //         <div className="mb-5 flex items-center justify-between rounded-md border px-3 py-2">
    //           <Button variant="ghost" size="icon">
    //             <Minus className="h-4 w-4" />
    //           </Button>

    //           <span className="text-lg font-semibold">1</span>

    //           <Button variant="ghost" size="icon">
    //             <Plus className="h-4 w-4" />
    //           </Button>
    //         </div>

    //         <Button className="w-full">
    //           <ShoppingCart className="mr-2 h-4 w-4" />
    //           Add To Cart
    //         </Button>
    //       </Card>

    //       <Card className="p-5">
    //         <h3 className="mb-4 font-semibold">
    //           Quick Information
    //         </h3>

    //         <div className="space-y-3">
    //           {quickInfo.map((item) => (
    //             <div
    //               key={item.label}
    //               className="flex items-center justify-between"
    //             >
    //               <span className="text-sm text-muted-foreground">
    //                 {item.label}
    //               </span>

    //               <span className="text-sm font-medium">
    //                 {item.value}
    //               </span>
    //             </div>
    //           ))}
    //         </div>
    //       </Card>
    //     </div>
    //   </div>
    // </Card>

    // <div className="mt-6 flex flex-col items-stretch gap-6 lg:flex-row lg:items-start">
    //   {/* Image */}
    //   <div className="flex h-80 items-center justify-center rounded-lg border">
    //     <Image
    //       src="/products/shirt.png"
    //       alt="School Shirt"
    //       width={300}
    //       height={300}
    //       className="object-contain"
    //     />
    //   </div>

    //   <Separator
    //     orientation="vertical"
    //     className="hidden lg:block h-auto self-stretch"
    //   />

    //   {/* Product Details */}
    //   <div className="flex-1">
    //     <h1 className="text-3xl font-bold">School Shirt (Full Sleeve)</h1>

    //     <div className="mt-4 flex items-center gap-2">
    //       <IndianRupee className="h-6 w-6 text-blue-600" />
    //       <span className="text-3xl font-bold text-blue-600">450.00</span>
    //     </div>

    //     <div className="mt-4 flex items-center justify-between">
    //       <Badge className="bg-green-100 text-green-700">
    //         <ShoppingCart className="mr-1 h-4 w-4" />
    //         In Stock
    //       </Badge>

    //       <span className="text-sm text-muted-foreground">
    //         Stock: <strong>120 pcs</strong>
    //       </span>
    //     </div>

    //     <Separator className="my-4" />

    //     <Card className="p-4">
    //       <div className="space-y-3">
    //         {productDetails.map((item) => (
    //           <div
    //             key={item.label}
    //             className="flex items-center justify-between"
    //           >
    //             <span className="text-muted-foreground">{item.label}</span>

    //             <span className="font-medium">{item.value}</span>
    //           </div>
    //         ))}
    //       </div>
    //     </Card>
    //   </div>

    //   <Separator
    //     orientation="vertical"
    //     className="hidden lg:block h-auto self-stretch"
    //   />

    //   {/* Purchase Panel */}
    //   <div className="w-full lg:w-[300px] space-y-4">
    //     <Card className="p-5">
    //       <h3 className="mb-4 font-semibold">Quantity</h3>

    //       <div className="mb-5 flex items-center justify-between rounded-md border px-3 py-2">
    //         <Button variant="ghost" size="icon">
    //           <Minus className="h-4 w-4" />
    //         </Button>

    //         <span className="text-lg font-semibold">1</span>

    //         <Button variant="ghost" size="icon">
    //           <Plus className="h-4 w-4" />
    //         </Button>
    //       </div>

    //       <Button className="w-full">
    //         <ShoppingCart className="mr-2 h-4 w-4" />
    //         Add To Cart
    //       </Button>
    //     </Card>

    //     <Card className="p-5">
    //       <h3 className="mb-4 font-semibold">Quick Information</h3>

    //       <div className="space-y-3">
    //         {quickInfo.map((item) => (
    //           <div
    //             key={item.label}
    //             className="flex items-center justify-between"
    //           >
    //             <span className="text-sm text-muted-foreground">
    //               {item.label}
    //             </span>

    //             <span className="text-sm font-medium">{item.value}</span>
    //           </div>
    //         ))}
    //       </div>
    //     </Card>
    //   </div>
    // </div>

    // <Card className="w-full p-6">
    //   <h2 className="text-2xl font-bold">Product Details</h2>

    //   {/* Added items-center to align grid items horizontally relative to each other */}
    //   <div className="mt-6 grid grid-cols-12 gap-4 items-center">
    //     {/* Added flex items-center justify-center to center the "Image" text */}
    //     <div className="col-span-3 h-64 rounded-lg bg-red-500 flex items-center justify-center text-white">
    //       Image
    //     </div>

    //     {/* Added flex items-center justify-center to center "Product Details" */}
    //     <div className="col-span-6 h-64 rounded-lg bg-green-600 flex items-center justify-center text-white">
    //       Product Details
    //     </div>

    //     {/* Added flex items-center justify-center to center "Purchase Panel" */}
    //     <div className="col-span-3 h-64 rounded-lg bg-blue-600 flex items-center justify-center text-white">
    //       Purchase Panel
    //     </div>
    //   </div>
    // </Card>

    // <div className="flex flex-col items-stretch gap-4 p-4 lg:flex-row lg:items-center">
    //   {/* First Main Div */}

    //   <Card>
    //      <div>vinayal</div>

    //   </Card>
     

    //   {/* Fallback horizontal separator for mobile screens when flex wraps vertically */}
    //   <Separator
    //     orientation="vertical"
    //     className="block lg:hidden w-full h-[1px] bg-border my-2"
    //   />

    //   {/* Second Main Div */}
    //    <Card>
    //      <div>vinayal</div>

    //   </Card>
     

    //   {/* Fallback horizontal separator for mobile screens when flex wraps vertically */}
    //   <Separator
    //     orientation="vertical"
    //     className="block lg:hidden w-full h-[1px] bg-border my-2"
    //   />

    //   {/* Third Main Div */}
    //    <Card>
    //      <div>vinayal</div>

    //   </Card>
     
    // </div>

//     <div
//   style={{
//     display: "grid",
//     gridTemplateColumns: "5fr 4fr 3fr",
//     gap: "16px",
//   }}
// >
//   <div style={{ background: "red", height: 200 }}>5</div>
//   <div style={{ background: "green", height: 200 }}>4</div>
//   <div style={{ background: "blue", height: 200 }}>3</div>
// </div>

<div className="grid grid-cols-1 divide-y divide-border rounded-xl border bg-card text-card-foreground shadow-sm p-2 lg:grid-cols-(--dashboard-custom-row) lg:divide-y-0 lg:divide-x lg:gap-2 items-stretch w-full">
  {/* Card 1 */}
  <Card className="border-0 shadow-none bg-transparent rounded-none pb-4 lg:pb-0 lg:pr-2">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Card One</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">vinayak</div>
    </CardContent>
  </Card>

  {/* Card 2 */}
  <Card className="border-0 shadow-none bg-transparent rounded-none py-4 lg:py-0 lg:px-4">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Card Two</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">vinayak</div>
    </CardContent>
  </Card>

  {/* Card 3 */}
  <Card className="border-0 shadow-none bg-transparent rounded-none pt-4 lg:pt-0 lg:pl-4">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">Card Three</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">vinayak</div>
    </CardContent>
  </Card>
</div>



  );
}
