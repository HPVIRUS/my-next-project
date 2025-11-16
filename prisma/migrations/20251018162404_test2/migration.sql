/*
  Warnings:

  - Changed the type of `category` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProductCategoey" AS ENUM ('MOBILE', 'LAPTOP', 'WATCH', 'OTHERS');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN     "category" "ProductCategoey" NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
