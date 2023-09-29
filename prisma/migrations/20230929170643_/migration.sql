/*
  Warnings:

  - A unique constraint covering the columns `[emergencies_id]` on the table `feedback` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `feedback_emergencies_id_key` ON `feedback`(`emergencies_id`);
