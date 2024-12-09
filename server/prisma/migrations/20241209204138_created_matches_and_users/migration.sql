-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "matches_qtd" INTEGER NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTable" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "UserTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MatchToUserTable" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MatchToUserTable_AB_unique" ON "_MatchToUserTable"("A", "B");

-- CreateIndex
CREATE INDEX "_MatchToUserTable_B_index" ON "_MatchToUserTable"("B");

-- AddForeignKey
ALTER TABLE "_MatchToUserTable" ADD CONSTRAINT "_MatchToUserTable_A_fkey" FOREIGN KEY ("A") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToUserTable" ADD CONSTRAINT "_MatchToUserTable_B_fkey" FOREIGN KEY ("B") REFERENCES "UserTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;
