-- DropForeignKey
ALTER TABLE "public"."Topic" DROP CONSTRAINT "Topic_fieldId_fkey";

-- AlterTable
ALTER TABLE "public"."Topic" ALTER COLUMN "fieldId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "expireResetToken" TEXT,
ADD COLUMN     "resetToken" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Topic" ADD CONSTRAINT "Topic_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "public"."Field"("id") ON DELETE SET NULL ON UPDATE CASCADE;
