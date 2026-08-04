import { prisma } from "../../../db";

const DAY_NAMES = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
];

const getWeeklyAttendance = async () => {
  const now = new Date();
  const startOfWeek = new Date(now);
  const dayOffset = (now.getDay() + 6) % 7; // Senin sebagai awal minggu
  startOfWeek.setDate(now.getDate() - dayOffset);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  const attendances = await prisma.attendance.findMany({
    where: {
      date: {
        gte: startOfWeek,
        lt: endOfWeek,
      },
    },
  });

  const days: Array<{
    date: string;
    day: string;
    hadir: number;
    sakit: number;
    izin: number;
    alpha: number;
  }> = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const dayAttendances = attendances.filter(
      (a) => a.date >= day && a.date < nextDay,
    );

    days.push({
      date: day.toISOString().slice(0, 10),
      day: DAY_NAMES[day.getDay()],
      hadir: dayAttendances.filter((a) => a.status === "HADIR").length,
      sakit: dayAttendances.filter((a) => a.status === "SAKIT").length,
      izin: dayAttendances.filter((a) => a.status === "IZIN").length,
      alpha: dayAttendances.filter((a) => a.status === "ALPHA").length,
    });
  }

  return days;
};

const getMonthlyAttendanceTrend = async (year: number) => {
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);

  const attendances = await prisma.attendance.findMany({
    where: {
      date: {
        gte: startOfYear,
        lte: endOfYear,
      },
    },
  });

  const months: Array<{
    month: string;
    presentPercentage: number;
  }> = [];

  for (let i = 0; i < 12; i++) {
    const monthAttendances = attendances.filter(
      (a) => a.date.getMonth() === i,
    );

    const hadir = monthAttendances.filter((a) => a.status === "HADIR").length;
    const total = monthAttendances.length;

    months.push({
      month: MONTH_NAMES[i],
      presentPercentage: total > 0 ? Math.round((hadir / total) * 100) : 0,
    });
  }

  return months;
};

const getDashboardSummary = async () => {
  const totalStudents = await prisma.student.count();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayAttendances = await prisma.attendance.findMany({
    where: {
      date: {
        gte: today,
        lt: tomorrow,
      },
    },
    include: {
      student: {
        include: {
          class: true,
        },
      },
    },
  });

  const totalPresent = todayAttendances.filter(
    (a) => a.status === "HADIR",
  ).length;
  const totalAbsent = todayAttendances.filter(
    (a) => a.status !== "HADIR",
  ).length;

  const totalViolations = await prisma.violation.count();

  const absentStudentsToday = todayAttendances
    .filter((a) => a.status !== "HADIR")
    .map((a) => ({
      studentId: a.studentId,
      studentName: a.student.name,
      className: a.student.class?.name || "-",
      status: a.status,
    }));

  const weeklyAttendance = await getWeeklyAttendance();
  const monthlyAttendanceTrend = await getMonthlyAttendanceTrend(
    today.getFullYear(),
  );

  return {
    totalStudents,
    totalPresentToday: totalPresent,
    totalAbsentToday: totalAbsent,
    totalViolations,
    absentStudentsToday,
    weeklyAttendance,
    monthlyAttendanceTrend,
  };
};

export default {
  getDashboardSummary,
  getWeeklyAttendance,
  getMonthlyAttendanceTrend,
};
