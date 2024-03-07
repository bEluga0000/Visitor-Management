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
    "hasNotification" BOOLEAN,
    "guest" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Workers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "hashedPassword" TEXT NOT NULL,
    "bio" TEXT,
    "verified" BOOLEAN,
    "idImage" TEXT,
    "profileImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "upadatedAt" TIMESTAMP(3) NOT NULL,
    "hasNotifications" BOOLEAN,
    "guest" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Meeting" (
    "id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "guests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "location" TEXT NOT NULL,
    "parkingLocation" TEXT,
    "starttime" TEXT NOT NULL,
    "endtime" TEXT NOT NULL,

    CONSTRAINT "Meeting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Workers_email_key" ON "Workers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guest_email_key" ON "Guest"("email");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_host_fkey" FOREIGN KEY ("host") REFERENCES "Workers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
