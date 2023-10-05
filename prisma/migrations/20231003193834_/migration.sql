/*
  Warnings:

  - Added the required column `adminId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `ChatRoom` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `ChatRoom_name_key` ON `chatroom`;

-- AlterTable
ALTER TABLE `chatroom` ADD COLUMN `adminId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;
