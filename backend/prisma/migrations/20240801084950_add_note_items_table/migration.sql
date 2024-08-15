-- CreateTable
CREATE TABLE "note" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noteItem" (
    "id" SERIAL NOT NULL,
    "noteId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "noteItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_date_idx" ON "note"("userId", "date");

-- AddForeignKey
ALTER TABLE "note" ADD CONSTRAINT "note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "noteItem" ADD CONSTRAINT "noteItem_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "note"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
