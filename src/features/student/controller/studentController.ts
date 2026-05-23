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

  getAll: async (req: Request, res: Response) => {
    const { classId } = req.query;

    if (!classId) {
      return res
        .status(400)
        .send({ message: "Parameter 'classId' wajib diisi" });
    }

    try {
      const students = await getAllStudents(classId as string);
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
