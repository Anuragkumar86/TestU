/*
  Warnings:

  - The `expireResetToken` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "expireResetToken",
ADD COLUMN     "expireResetToken" TIMESTAMP(3);
