"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentService_1 = require("../service/studentService");
const router = express_1.default.Router();
router.post("/student", async (req, res) => {
    const newStudentData = req.body;
    try {
        const student = await (0, studentService_1.createStudent)(newStudentData);
        res.send({
            message: "Student created successfully",
            data: student,
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        res.status(400).send({
            message,
        });
    }
});
router.get("/student", async (req, res) => {
    try {
        const students = await (0, studentService_1.getAllStudents)();
        res.send({
            message: "Students retrieved successfully",
            data: students,
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        res.status(400).send({
            message,
        });
    }
});
router.put("/student/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const student = await (0, studentService_1.updateStudent)(id, updateData);
        res.send({
            message: "Siswa berhasil diperbarui",
            data: student,
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan";
        res.status(400).send({
            message,
        });
    }
});
router.delete("/student/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await (0, studentService_1.deleteStudent)(id);
        res.send({
            message: "Siswa berhasil dihapus",
        });
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan";
        res.status(400).send({
            message,
        });
    }
});
exports.default = router;
