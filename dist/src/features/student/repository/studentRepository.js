"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../../db");
const findStudents = async () => {
    const students = await db_1.prisma.student.findMany();
    return students;
};
const findById = async (id, tx = db_1.prisma) => {
    return tx.student.findUnique({ where: { id } });
};
const update = async (id, data, tx = db_1.prisma) => {
    return tx.student.update({ where: { id }, data });
};
const deleteStudent = async (id, tx = db_1.prisma) => {
    return tx.student.delete({ where: { id } });
};
exports.default = {
    findStudents,
    findById,
    update,
    deleteStudent,
};
