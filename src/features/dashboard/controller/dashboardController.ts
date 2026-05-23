import { Request, Response } from "express";
import { getDashboard } from "../service/dashboardService";

export const dashboardController = {
	getSummary: async (req: Request, res: Response) => {
		try {
			const dashboard = await getDashboard();
			res.send({
				message: "Berhasil mengambil data dashboard",
				data: dashboard,
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Terjadi kesalahan";
			res.status(400).send({ message });
		}
	},
};
