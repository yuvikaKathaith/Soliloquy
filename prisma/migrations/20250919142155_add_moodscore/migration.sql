/*
  Warnings:

  - You are about to drop the column `moodeScore` on the `Entry` table. All the data in the column will be lost.
  - Added the required column `moodScore` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Draft" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL,
ALTER COLUMN "mood" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Entry" DROP COLUMN "moodeScore",
ADD COLUMN     "moodScore" INTEGER NOT NULL;
