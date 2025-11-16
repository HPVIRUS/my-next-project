import NotFound from "@/app/not-found";
import Spinner from "@/components/Spinner";
import customMetadataGnerator from "@/lib/metadata";
import ProductDetail from "@/modules/products/components/ProductDetail‎";
import { getProductId } from "@/modules/products/services";
import { ProducstWithImage } from "@/type";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
type Props = {
  params: Promise<{
    id: string;
  }>;
};
// export async function generateMetadata({ params }: Props) {
//   const { id } = await params;
//   const product = (await getProductId(id)) as ProducstWithImage;
//   if (!product) {
//     notFound();
//     return customMetadataGnerator({
//       title: "not found",
//     });
//   }
//   return customMetadataGnerator({
//     title: product.name,
//     description: product.description,
//     images: product.image,
//   });
// }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = (await getProductId(id)) as ProducstWithImage;

  if (!product) {
    return customMetadataGnerator({
      title: "not found",
    });
  }

  return customMetadataGnerator({
    title: product.name,
    description: product.description,
    images: product.image,
  });
}
async function page({ params }: Props) {
  const { id } = await params;
  const product = (await getProductId(id)) as ProducstWithImage;
  if (!product) notFound();
  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "Product",
    name: product.name,
    image: product?.image.length && product.image[0].image,
    description: product.description,
  };
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetail product={product} />
    </section>
  );
}

export default page;
