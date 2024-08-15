/*
  Warnings:

  - Added the required column `updatedAt` to the `note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `noteItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `noteItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "note" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "noteItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "note_order_idx" ON "noteItem"("noteId", "order");
