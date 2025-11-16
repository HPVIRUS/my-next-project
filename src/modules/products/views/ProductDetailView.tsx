import React, { Suspense } from "react";

import { getProductId } from "../services";
import ProductForm from "../components/ProductFormWithAction";

async function ProductDetailView(props: { id: string }) {
  const { id } = props;
  const product = await getProductId(id);
  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
}

export default ProductDetailView;
