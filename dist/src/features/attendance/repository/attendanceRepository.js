"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../db");
const findAll = async (tx = db_1.prisma) => {
    return tx.attendance.findMany({
        include: {
            student: true,
        },
        orderBy: {
            date: "desc",
        },
    });
};
const findById = async (id, tx = db_1.prisma) => {
    return tx.attendance.findUnique({
        where: { id },
        include: {
            student: true,
        },
    });
};
const findByIds = async (ids) => {
    return db_1.prisma.student.findMany({
        where: { id: { in: ids } },
    });
};
const findByStudentIdsAndDate = async (studentIds, date) => {
    return db_1.prisma.attendance.findMany({
        where: {
            studentId: { in: studentIds },
            date: {
                gte: new Date(date.setHours(0, 0, 0, 0)),
                lt: new Date(date.setHours(23, 59, 59, 999)),
            },
        },
        include: { student: true },
    });
};
const createBulk = async (data) => {
    return db_1.prisma.attendance.createMany({
        data,
        skipDuplicates: false,
    });
};
const findByStudentId = async (studentId, tx = db_1.prisma) => {
    return tx.attendance.findMany({
        where: { studentId },
        include: {
            student: true,
        },
        orderBy: {
            date: "desc",
        },
    });
};
const findByStudentIdAndDate = async (studentId, date, tx = db_1.prisma) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return tx.attendance.findFirst({
        where: {
            studentId,
            date: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });
};
const create = async (data, tx = db_1.prisma) => {
    return tx.attendance.create({
        data,
        include: {
            student: true,
        },
    });
};
const update = async (id, data, tx = db_1.prisma) => {
    return tx.attendance.update({
        where: { id },
        data,
        include: {
            student: true,
        },
    });
};
const countByStatus = async (status, tx = db_1.prisma) => {
    return tx.attendance.count({
        where: { status },
    });
};
const countByStatusAndDateRange = async (status, startDate, endDate, tx = db_1.prisma) => {
    return tx.attendance.count({
        where: {
            status,
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
    });
};
const findAllByDateRange = async (startDate, endDate, tx = db_1.prisma) => {
    return tx.attendance.findMany({
        where: {
            date: {
                gte: startDate,
                lte: endDate,
            },
        },
        include: {
            student: true,
        },
        orderBy: {
            date: "desc",
        },
    });
};
exports.default = {
    findAll,
    findById,
    findByStudentId,
    findByStudentIdAndDate,
    create,
    update,
    countByStatus,
    countByStatusAndDateRange,
    findAllByDateRange,
    findByIds,
    findByStudentIdsAndDate,
    createBulk,
};
