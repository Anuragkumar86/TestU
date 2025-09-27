/*
  Warnings:

  - A unique constraint covering the columns `[topicId,title]` on the table `Quiz` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Quiz_topicId_title_key" ON "public"."Quiz"("topicId", "title");
