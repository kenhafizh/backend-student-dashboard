"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recapitulationController = void 0;
const recapitulationService_1 = require("../service/recapitulationService");
exports.recapitulationController = {
    getRecapitulation: async (req, res) => {
        try {
            const { month, year } = req.query;
            const recapitulation = await (0, recapitulationService_1.getRecapitulation)(month ? parseInt(month) : undefined, year ? parseInt(year) : undefined);
            res.send({
                message: "Berhasil mengambil data rekapitulasi",
                data: recapitulation,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
};
