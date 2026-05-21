/*
  Warnings:

  - You are about to drop the column `type` on the `Violation` table. All the data in the column will be lost.
  - Added the required column `actionType` to the `Violation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `point` to the `Violation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `violationType` to the `Violation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ViolationType" AS ENUM ('UNIFORM', 'LATE', 'PHONE', 'SKIP_CLASS', 'OTHER');

-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('VERBAL_WARNING', 'WARNING_LETTER', 'PARENT_SUMMONS', 'SUSPENSION');

-- AlterTable
ALTER TABLE "Violation" DROP COLUMN "type",
ADD COLUMN     "actionType" "ActionType" NOT NULL,
ADD COLUMN     "point" INTEGER NOT NULL,
ADD COLUMN     "violationType" "ViolationType" NOT NULL;
