import Spinner from "@/components/Spinner";
import ProductDetailView from "@/modules/products/views/ProductDetailView";
import React, { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <ProductDetailView id={id} />
      </Suspense>
    </div>
  );
}
