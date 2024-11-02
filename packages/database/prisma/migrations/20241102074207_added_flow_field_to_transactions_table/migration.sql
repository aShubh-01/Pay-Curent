/*
  Warnings:

  - Added the required column `flow` to the `OnRampTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Flow" AS ENUM ('Credit', 'Debit');

-- AlterTable
ALTER TABLE "OnRampTransaction" ADD COLUMN     "flow" "Flow" NOT NULL;
