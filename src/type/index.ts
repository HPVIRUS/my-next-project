import { PrismaType } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type ProducstWithImage=Prisma.ProductGetPayload<{include:{image:true}}>