-- CreateTable
CREATE TABLE `authentications` (
    `id` VARCHAR(255) NOT NULL,
    `token` TEXT NOT NULL,

    UNIQUE INDEX `authentications_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
