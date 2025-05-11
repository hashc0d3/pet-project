-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropIndex
DROP INDEX "Rating_userId_productId_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "fullDescription" TEXT;

-- AlterTable
ALTER TABLE "Rating" ALTER COLUMN "value" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
