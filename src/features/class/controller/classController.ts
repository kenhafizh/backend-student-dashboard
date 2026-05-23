import { Request, Response } from "express";
import { classService } from "../service/classService.js";

export const classController = {
	getAll: async (req: Request, res: Response) => {
		try {
			const classes = await classService.getAll();
			res.send({
				message: "Berhasil mengambil data kelas",
				data: classes,
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Terjadi kesalahan";
			res.status(400).send({ message });
		}
	},

	getById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const classData = await classService.getById(id as string);
			res.send({
				message: "Berhasil mengambil data kelas",
				data: classData,
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Terjadi kesalahan";
			res.status(400).send({ message });
		}
	},
};
