import React from "react";
import { DATA } from "../mock/Product";
import ProductItem from "./ProductItem";
import { PrismaType } from "@/lib/prisma";
import { ProducstWithImage } from "@/type/index";

export default function ProductList({
  products,
}: {
  products: ProducstWithImage[];
}) {
  return (
    <div className="flex flex-wrap justify-between items-center w-full my-10">
      {" "}
      {products.map((item) => (
        <ProductItem product={item} key={item.id} />
      ))}
    </div>
  );
}
