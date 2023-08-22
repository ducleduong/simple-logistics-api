-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_shipping_address_id_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "shipping_address_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shipping_address_id_fkey" FOREIGN KEY ("shipping_address_id") REFERENCES "Address"("address_id") ON DELETE SET NULL ON UPDATE CASCADE;
