"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createManyStudents = exports.createStudent = exports.getAllStudents = void 0;
const studentRepository_1 = __importDefault(require("../repository/studentRepository"));
const db_1 = require("../../../db");
const getAllStudents = async (classId) => {
    const students = await studentRepository_1.default.findStudents(classId);
    return students.map((student) => ({
        id: student.id,
        name: student.name,
        nis: student.nis,
        classId: student.classId,
        className: student.class?.name || "-",
    }));
};
exports.getAllStudents = getAllStudents;
const createStudent = async (newStudentData) => {
    const { name, nis, classId } = newStudentData;
    if (!name || !nis || !classId) {
        throw new Error("Fields 'name', 'nis', and 'classId' are required.");
    }
    await db_1.prisma.student.create({
        data: {
            name,
            nis,
            class: {
                connect: { id: classId },
            },
        },
        include: {
            class: true,
        },
    });
};
exports.createStudent = createStudent;
const createManyStudents = async (students) => {
    if (!students || students.length === 0)
        return;
    await studentRepository_1.default.createMany(students);
};
exports.createManyStudents = createManyStudents;
const updateStudent = async (id, updateData) => {
    const existing = await studentRepository_1.default.findById(id);
    if (!existing) {
        throw new Error("Siswa tidak ditemukan");
    }
    return studentRepository_1.default.update(id, updateData);
};
exports.updateStudent = updateStudent;
const deleteStudent = async (id) => {
    const existing = await studentRepository_1.default.findById(id);
    if (!existing) {
        throw new Error("Siswa tidak ditemukan");
    }
    return studentRepository_1.default.deleteStudent(id);
};
exports.deleteStudent = deleteStudent;
