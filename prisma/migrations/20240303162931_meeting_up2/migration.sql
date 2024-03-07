/*
  Warnings:

  - You are about to drop the column `guests` on the `Meeting` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "guests";

-- CreateTable
CREATE TABLE "_GuestToMeeting" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GuestToMeeting_AB_unique" ON "_GuestToMeeting"("A", "B");

-- CreateIndex
CREATE INDEX "_GuestToMeeting_B_index" ON "_GuestToMeeting"("B");

-- AddForeignKey
ALTER TABLE "_GuestToMeeting" ADD CONSTRAINT "_GuestToMeeting_A_fkey" FOREIGN KEY ("A") REFERENCES "Guest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GuestToMeeting" ADD CONSTRAINT "_GuestToMeeting_B_fkey" FOREIGN KEY ("B") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;
