import { prisma } from "../../../db";
import studentViolationRepository from "../repository/studentViolationRepository";

const getViolationRecapitulation = async (
  startMonth?: number,
  endMonth?: number,
  year?: number,
) => {
  const currentYear = year || new Date().getFullYear();
  const currentStartMonth = startMonth || new Date().getMonth() + 1;
  const currentEndMonth = endMonth || currentStartMonth;

  const startDate = new Date(currentYear, currentStartMonth - 1, 1);
  const endDate = new Date(currentYear, currentEndMonth, 0, 23, 59, 59, 999);

  const classes = await prisma.class.findMany({
    include: {
      students: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const violations = await studentViolationRepository.getViolationsByDateRange(
    startDate,
    endDate,
  );

  let totalLevel1 = 0;
  let totalLevel2 = 0;
  let totalLevel3 = 0;

  const classDetails: Array<{
    className: string;
    totalStudents: number;
    level1: number;
    level2: number;
    level3: number;
    totalViolations: number;
  }> = [];

  for (const cls of classes) {
    const classViolations = violations.filter(
      (v) => v.student.classId === cls.id,
    );

    const level1 = classViolations.filter((v) => v.level === "LEVEL_1").length;
    const level2 = classViolations.filter((v) => v.level === "LEVEL_2").length;
    const level3 = classViolations.filter((v) => v.level === "LEVEL_3").length;

    totalLevel1 += level1;
    totalLevel2 += level2;
    totalLevel3 += level3;

    classDetails.push({
      className: cls.name,
      totalStudents: cls.students.length,
      level1,
      level2,
      level3,
      totalViolations: level1 + level2 + level3,
    });
  }

  const totalStudents = classes.reduce((sum, cls) => sum + cls.students.length, 0);
  const totalViolations = totalLevel1 + totalLevel2 + totalLevel3;
  const averageViolation =
    totalStudents > 0
      ? Math.round((totalViolations / totalStudents) * 100) / 100
      : 0;

  const mostViolationsClass =
    totalViolations > 0
      ? (classDetails.reduce((top, cls) =>
          cls.totalViolations > top.totalViolations ? cls : top,
        ).className ?? null)
      : null;

  return {
    totalStudents,
    totalViolations,
    averageViolation,
    mostViolationsClass,
    classDetails,
  };
};

export { getViolationRecapitulation };
