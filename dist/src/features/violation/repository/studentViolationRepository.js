"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../db");
const findAll = async (tx = db_1.prisma) => {
    return tx.violation.findMany({
        include: {
            student: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const findById = async (id, tx = db_1.prisma) => {
    return tx.violation.findUnique({
        where: { id },
        include: {
            student: true,
        },
    });
};
const create = async (data, tx = db_1.prisma) => {
    return tx.violation.create({
        data,
        include: {
            student: true,
        },
    });
};
const update = async (id, data, tx = db_1.prisma) => {
    return tx.violation.update({
        where: { id },
        data,
        include: {
            student: true,
        },
    });
};
const deleteViolation = async (id, tx = db_1.prisma) => {
    return tx.violation.delete({
        where: { id },
    });
};
const getViolationsByDateRange = async (startDate, endDate, tx = db_1.prisma) => {
    return tx.violation.findMany({
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
};
exports.default = {
    findAll,
    findById,
    create,
    update,
    deleteViolation,
    getViolationsByDateRange,
};
