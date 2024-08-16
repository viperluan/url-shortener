/*
  Warnings:

  - A unique constraint covering the columns `[shorten]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_shorten_key" ON "Url"("shorten");
