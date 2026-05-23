"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentController = void 0;
const studentService_1 = require("../service/studentService");
exports.studentController = {
    create: async (req, res) => {
        try {
            const student = await (0, studentService_1.createStudent)(req.body);
            res.status(201).send({
                message: "Siswa berhasil dibuat",
                data: student,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
    getAll: async (req, res) => {
        try {
            const students = await (0, studentService_1.getAllStudents)();
            res.send({
                message: "Berhasil mengambil data siswa",
                data: students,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const student = await (0, studentService_1.updateStudent)(id, req.body);
            res.send({
                message: "Siswa berhasil diperbarui",
                data: student,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await (0, studentService_1.deleteStudent)(id);
            res.send({
                message: "Siswa berhasil dihapus",
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
};
