/*
  Warnings:

  - You are about to drop the `UserTable` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MatchToUserTable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MatchToUserTable" DROP CONSTRAINT "_MatchToUserTable_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatchToUserTable" DROP CONSTRAINT "_MatchToUserTable_B_fkey";

-- DropTable
DROP TABLE "UserTable";

-- DropTable
DROP TABLE "_MatchToUserTable";

-- CreateTable
CREATE TABLE "Breno" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Breno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BrenoToMatch" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BrenoToMatch_AB_unique" ON "_BrenoToMatch"("A", "B");

-- CreateIndex
CREATE INDEX "_BrenoToMatch_B_index" ON "_BrenoToMatch"("B");

-- AddForeignKey
ALTER TABLE "_BrenoToMatch" ADD CONSTRAINT "_BrenoToMatch_A_fkey" FOREIGN KEY ("A") REFERENCES "Breno"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrenoToMatch" ADD CONSTRAINT "_BrenoToMatch_B_fkey" FOREIGN KEY ("B") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;
