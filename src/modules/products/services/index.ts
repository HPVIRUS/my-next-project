"use server"
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getProduct = async () => {
  const result = await prisma.product.findMany({ include: { image: true } });
  return result;
};
export const uploadImage = async () => {
};
export const deleteProduct = async (id:string) => {
  await prisma.product.delete({
    where:{
      id
    }
  })
  revalidatePath("/dashboard/products");
};
export const getProductId = async (id: string) => {
  const result = await prisma.product.findFirst({
    where: {
      id,
    },
    include: { image: true },
  });
  if (!result) return null;
  return result;
};

// export async function upsertProduct(product: Product) {
//   const { id } = product;
//   let result;
//   if (id) {
//     result = await prisma.product.update({
//       where: {
//         id,
//       },
//       data: product,
//     });
//   } else {
//     result = await prisma.product.create({
//       data: product,
//     });
//   }
//   return result;
// }
export const upsertProduct = async (product: Product) => {
  const { id } = product;
  let result;
  if (id) {
    result = await prisma.product.update({
      where: {
        id,
      },
      data: product,
    });
  } else {
    result = await prisma.product.create({
      data: product,
    });
  }

  revalidatePath("/dashboard/products");
  
  // await redirect("/dashboard/products")
  return result;
};
