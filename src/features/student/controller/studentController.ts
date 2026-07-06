import { Request, Response } from "express";
import {
	createStudent,
	getAllStudents,
	updateStudent,
	deleteStudent,
} from "../service/studentService";

export const studentController = {
	create: async (req: Request, res: Response) => {
		try {
			const student = await createStudent(req.body);
			res.status(201).send({
				message: "Siswa berhasil dibuat",
				data: student,
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Terjadi kesalahan";
			res.status(400).send({ message });
		}
	},

	createMany: async (req: Request, res: Response) => {
		try {
			const { students } = req.body;
			if (!students || !Array.isArray(students)) {
				return res.status(400).send({ message: "Data students tidak valid" });
			}
			// Use the new createManyStudents function (need to import it)
			await require("../service/studentService").createManyStudents(students);
			res.status(201).send({
				message: `Berhasil import ${students.length} data siswa`,
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Terjadi kesalahan";
			res.status(400).send({ message });
		}
	},

	getAll: async (req: Request, res: Response) => {
		try {
			const { classId } = req.query;
			const students = await getAllStudents(classId as string | undefined);
			res.send({
				message: "Berhasil mengambil data siswa",
				data: students,
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Terjadi kesalahan";
			res.status(400).send({ message });
		}
	},

	update: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const student = await updateStudent(id as string, req.body);
			res.send({
				message: "Siswa berhasil diperbarui",
				data: student,
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Terjadi kesalahan";
			res.status(400).send({ message });
		}
	},

	delete: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			await deleteStudent(id as string);
			res.send({
				message: "Siswa berhasil dihapus",
			});
		} catch (err) {
			const message = err instanceof Error ? err.message : "Terjadi kesalahan";
			res.status(400).send({ message });
		}
	},
};
