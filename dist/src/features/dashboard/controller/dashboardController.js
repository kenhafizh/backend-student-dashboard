"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const dashboardService_1 = require("../service/dashboardService");
exports.dashboardController = {
    getSummary: async (req, res) => {
        try {
            const dashboard = await (0, dashboardService_1.getDashboard)();
            res.send({
                message: "Berhasil mengambil data dashboard",
                data: dashboard,
            });
        }
        catch (err) {
            const message = err instanceof Error ? err.message : "Terjadi kesalahan";
            res.status(400).send({ message });
        }
    },
};
