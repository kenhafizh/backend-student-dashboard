"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../db");
const getRecapitulationByMonth = async (startDate, endDate) => {
    const totalStudents = await db_1.prisma.student.count();
    const classes = await db_1.prisma.class.findMany({
        include: {
            students: true,
        },
        orderBy: {
            name: "asc",
        },
    });
    const attendances = await db_1.prisma.attendance.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate,
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
    let totalHadir = 0;
    let totalSakit = 0;
    let totalIzin = 0;
    let totalAlpha = 0;
    const classDetails = [];
    for (const cls of classes) {
        const classAttendances = attendances.filter((a) => a.student.classId === cls.id);
        const hadir = classAttendances.filter((a) => a.status === "HADIR").length;
        const sakit = classAttendances.filter((a) => a.status === "SAKIT").length;
        const izin = classAttendances.filter((a) => a.status === "IZIN").length;
        const alpha = classAttendances.filter((a) => a.status === "ALPHA").length;
        totalHadir += hadir;
        totalSakit += sakit;
        totalIzin += izin;
        totalAlpha += alpha;
        const totalAttendance = hadir + sakit + izin + alpha;
        const presentPercentage = totalAttendance > 0 ? Math.round((hadir / totalAttendance) * 100) : 0;
        classDetails.push({
            className: cls.name,
            totalStudents: cls.students.length,
            hadir,
            sakit,
            izin,
            alpha,
            presentPercentage,
        });
    }
    const totalAttendance = totalHadir + totalSakit + totalIzin + totalAlpha;
    const averagePresentPercentage = totalAttendance > 0
        ? Math.round((totalHadir / totalAttendance) * 100)
        : 0;
    return {
        totalStudents,
        averagePresentPercentage,
        totalPresent: totalHadir,
        totalAbsent: totalSakit + totalIzin + totalAlpha,
        classDetails,
    };
};
exports.default = {
    getRecapitulationByMonth,
};
