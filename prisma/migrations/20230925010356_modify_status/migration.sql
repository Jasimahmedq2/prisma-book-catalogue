/*
  Warnings:

  - The values [PENDING,SHIPPED,DELIVERED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [ADMIN,CUSTOMER] on the enum `UserRoles` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('pending', 'shipped', 'delevered');
ALTER TABLE "order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserRoles_new" AS ENUM ('admin', 'customer');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "UserRoles_new" USING ("role"::text::"UserRoles_new");
ALTER TYPE "UserRoles" RENAME TO "UserRoles_old";
ALTER TYPE "UserRoles_new" RENAME TO "UserRoles";
DROP TYPE "UserRoles_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'customer';
COMMIT;

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" SET DEFAULT 'pending';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'customer';
