"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceController = void 0;
const attendanceService_1 = require("../service/attendanceService");
exports.attendanceController = {
    create: async (req, res) => {
        try {
            if (req.body.classId && req.body.absensi) {
                const attendance = await (0, attendanceService_1.createBulkAttendance)(req.body);
                res.status(201).send({
                    message: "Absensi berhasil dibuat",
                    data: attendance,
                });
            }
            const attendance = await (0, attendanceService_1.createAttendance)(req.body);
            res.status(201).send({
                message: "Absensi berhasil dibuat",
                data: attendance,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
    getAll: async (req, res) => {
        try {
            const attendances = await (0, attendanceService_1.getAllAttendances)();
            res.send({
                message: "Berhasil mengambil data absensi",
                data: attendances,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const attendance = await (0, attendanceService_1.getAttendanceById)(id);
            res.send({
                message: "Berhasil mengambil data absensi",
                data: attendance,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
    getByStudentId: async (req, res) => {
        try {
            const { studentId } = req.params;
            const attendances = await (0, attendanceService_1.getAttendancesByStudentId)(studentId);
            res.send({
                message: "Berhasil mengambil data absensi siswa",
                data: attendances,
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
            const attendance = await (0, attendanceService_1.updateAttendance)(id, req.body);
            res.send({
                message: "Absensi berhasil diperbarui",
                data: attendance,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
    getAccumulation: async (req, res) => {
        try {
            const { startDate, endDate } = req.query;
            const accumulation = await (0, attendanceService_1.getAttendanceAccumulation)(startDate, endDate);
            res.send({
                message: "Berhasil mengambil akumulasi absensi",
                data: accumulation,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
    getStudentAccumulation: async (req, res) => {
        try {
            const { studentId } = req.params;
            const { startDate, endDate } = req.query;
            const accumulation = await (0, attendanceService_1.getStudentAttendanceAccumulation)(studentId, startDate, endDate);
            res.send({
                message: "Berhasil mengambil akumulasi absensi siswa",
                data: accumulation,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
};
