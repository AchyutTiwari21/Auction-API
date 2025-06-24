/*
  Warnings:

  - You are about to drop the column `content` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `CallLog` table. All the data in the column will be lost.
  - Added the required column `phone` to the `CallLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `CallLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `CallLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CallLog" DROP COLUMN "content",
DROP COLUMN "timestamp",
ADD COLUMN     "auctionId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endedAt" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "startedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_auctionId_fkey" FOREIGN KEY ("auctionId") REFERENCES "Auction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
