-- CreateTable
CREATE TABLE `users` (
    `UserId` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(255) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`UserId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
