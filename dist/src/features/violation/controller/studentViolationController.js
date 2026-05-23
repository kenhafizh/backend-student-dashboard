"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentViolationController = void 0;
const studentViolationService_1 = require("../service/studentViolationService");
exports.studentViolationController = {
    create: async (req, res) => {
        try {
            const violation = await (0, studentViolationService_1.createViolation)(req.body);
            res.status(201).send({
                message: "Pelanggaran berhasil dibuat",
                data: violation,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
    getAll: async (req, res) => {
        try {
            const violations = await (0, studentViolationService_1.getAllViolations)();
            res.send({
                message: "Berhasil mengambil data pelanggaran",
                data: violations,
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
            const violation = await (0, studentViolationService_1.updateViolation)(id, req.body);
            res.send({
                message: "Pelanggaran berhasil diperbarui",
                data: violation,
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
            await (0, studentViolationService_1.deleteViolation)(id);
            res.send({
                message: "Pelanggaran berhasil dihapus",
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
};
