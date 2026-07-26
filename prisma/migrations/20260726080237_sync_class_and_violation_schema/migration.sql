-- CreateEnum
CREATE TYPE "Level" AS ENUM ('LEVEL_1', 'LEVEL_2', 'LEVEL_3');

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Violation" DROP CONSTRAINT "Violation_studentId_fkey";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "class",
ADD COLUMN     "classId" TEXT;

-- AlterTable
ALTER TABLE "Violation" DROP COLUMN "actionType",
DROP COLUMN "point",
ADD COLUMN     "information" TEXT NOT NULL,
ADD COLUMN     "level" "Level" NOT NULL,
DROP COLUMN "violationType",
ADD COLUMN     "violationType" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ActionType";

-- DropEnum
DROP TYPE "ViolationType";

-- CreateTable
CREATE TABLE "Class" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_name_key" ON "Class"("name");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Violation" ADD CONSTRAINT "Violation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

