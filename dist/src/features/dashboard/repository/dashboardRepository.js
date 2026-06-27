"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../db");
const getDashboardSummary = async () => {
    const totalStudents = await db_1.prisma.student.count();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const todayAttendances = await db_1.prisma.attendance.findMany({
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
    const totalPresent = todayAttendances.filter((a) => a.status === "HADIR").length;
    const totalAbsent = todayAttendances.filter((a) => a.status !== "HADIR").length;
    const totalViolations = await db_1.prisma.violation.count();
    const absentStudentsToday = todayAttendances
        .filter((a) => a.status !== "HADIR")
        .map((a) => ({
        studentId: a.studentId,
        studentName: a.student.name,
        className: a.student.class?.name || "-",
        status: a.status,
    }));
    return {
        totalStudents,
        totalPresentToday: totalPresent,
        totalAbsentToday: totalAbsent,
        totalViolations,
        absentStudentsToday,
    };
};
exports.default = {
    getDashboardSummary,
};
