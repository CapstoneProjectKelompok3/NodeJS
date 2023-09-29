-- CreateTable
CREATE TABLE `feedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `content` VARCHAR(255) NULL,
    `rating` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `emergencies_id` INTEGER NOT NULL,

    UNIQUE INDEX `feedback_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
