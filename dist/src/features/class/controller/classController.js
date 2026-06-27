"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classController = void 0;
const classService_1 = require("../service/classService");
exports.classController = {
    getAll: async (req, res) => {
        try {
            const classes = await classService_1.classService.getAll();
            res.send({
                message: "Berhasil mengambil data kelas",
                data: classes,
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
            const classData = await classService_1.classService.getById(id);
            res.send({
                message: "Berhasil mengambil data kelas",
                data: classData,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
};
