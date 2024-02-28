-- CreateTable
CREATE TABLE "Workers" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "post" TEXT,
    "bio" TEXT,
    "verified" BOOLEAN,
    "password" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "image" TEXT,
    "coverImage" TEXT,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upadatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workers_email_key" ON "Workers"("email");
