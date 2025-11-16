import React from "react";

import ProductItem from "../components/ProductItem";
import ProductList from "../components/ProductList";
import { getProduct } from "../services";
import ProductDetail from "../components/ProductDetail‎";

export default async function ProductListView() {
  const products = await getProduct();
  return (
    <div>
      {" "}
      <ProductList products={products} />{" "}
    </div>
  );
}
