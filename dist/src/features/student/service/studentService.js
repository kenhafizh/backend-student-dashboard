"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getAllStudents = void 0;
const studentRepository_1 = __importDefault(require("../repository/studentRepository"));
const db_1 = require("../../../db");
const getAllStudents = async () => {
    return studentRepository_1.default.findStudents();
};
exports.getAllStudents = getAllStudents;
const createStudent = async (newStudentData) => {
    const { name, nis, classId } = newStudentData;
    if (!name || !nis || !classId) {
        throw new Error("Fields 'name', 'nis', and 'classId' are required.");
    }
    const student = await db_1.prisma.student.create({
        data: {
            name,
            nis,
            class: {
                connect: { id: classId },
            },
        },
    });
    return student;
};
exports.createStudent = createStudent;
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
