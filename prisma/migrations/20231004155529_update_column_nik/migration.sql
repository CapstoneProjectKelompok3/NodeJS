/*
  Warnings:

  - A unique constraint covering the columns `[nik]` on the table `documents` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `documents_nik_key` ON `documents`(`nik`);
