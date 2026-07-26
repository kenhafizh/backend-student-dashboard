"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../db");
const findStudents = async (classId) => {
    const where = classId ? { classId } : {};
    const students = await db_1.prisma.student.findMany({
        where,
        include: {
            class: true,
        },
        orderBy: {
            name: "asc",
        },
    });
    return students;
};
const findById = async (id, tx = db_1.prisma) => {
    return tx.student.findUnique({ where: { id } });
};
const findByIds = async (ids, tx = db_1.prisma) => {
    return tx.student.findMany({
        where: { id: { in: ids } },
    });
};
const update = async (id, data, tx = db_1.prisma) => {
    const updateData = {};
    if (data.name)
        updateData.name = data.name;
    if (data.nis)
        updateData.nis = data.nis;
    if (data.classId)
        updateData.class = { connect: { id: data.classId } };
    return tx.student.update({ where: { id }, data: updateData });
};
const deleteStudent = async (id, tx = db_1.prisma) => {
    return tx.student.delete({ where: { id } });
};
const createMany = async (data, tx = db_1.prisma) => {
    return tx.student.createMany({ data });
};
exports.default = {
    findStudents,
    findById,
    findByIds,
    update,
    deleteStudent,
    createMany,
};
