import { Prisma } from "@prisma/client";

export type ProductsWithImage = Prisma.ProductGetPayload<{
  include: { image: true };
}>;
