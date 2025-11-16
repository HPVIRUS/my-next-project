import React from "react";
import ProductTable from "../components/ProductTable";
import { getProduct } from "../services";
export default async function ProductDashboardView() {
  const products = await getProduct();
  return (
    <div>
      <ProductTable products={products} />
    </div>
  );
}
