/*
  Warnings:

  - Made the column `shipping_address_id` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shipping_address_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "shipping_address_id" SET NOT NULL,
ALTER COLUMN "shipping_date" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "Address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;
