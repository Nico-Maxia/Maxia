-- CreateTable
CREATE TABLE "mailjet_config" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "apiKeyPublic" TEXT NOT NULL,
    "apiKeyPrivate" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mailjet_config_pkey" PRIMARY KEY ("id")
);
