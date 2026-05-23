import { Request, Response } from "express";
import {
  getAllAttendances,
  getAttendanceById,
  getAttendancesByStudentId,
  createAttendance,
  updateAttendance,
  getAttendanceAccumulation,
  getStudentAttendanceAccumulation,
  createBulkAttendance,
} from "../service/attendanceService";

export const attendanceController = {
  create: async (req: Request, res: Response) => {
    try {
      if (req.body.classId && req.body.attendance) {
        const attendance = await createBulkAttendance(req.body);
        return res.status(201).send({
          message: "Data absensi berhasil diproses",
          data: attendance,
        });
      }

      const attendance = await createAttendance(req.body);
      return res.status(201).send({
        message: "Absensi berhasil dibuat",
        data: attendance,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    const { date, classId } = req.query;

    if (!date || !classId) {
      return res
        .status(400)
        .send({ message: "Tanggal dan Class ID wajib diisi" });
    }

    try {
      const attendances = await getAllAttendances(
        date as string,
        classId as string,
      );
      res.send({
        message: "Berhasil mengambil data absensi",
        data: attendances,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const attendance = await getAttendanceById(id as string);
      res.send({
        message: "Berhasil mengambil data absensi",
        data: attendance,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },

  getByStudentId: async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
      const attendances = await getAttendancesByStudentId(studentId as string);
      res.send({
        message: "Berhasil mengambil data absensi siswa",
        data: attendances,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const attendance = await updateAttendance(id as string, req.body);
      res.send({
        message: "Absensi berhasil diperbarui",
        data: attendance,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },

  getAccumulation: async (req: Request, res: Response) => {
    try {
      const { startDate, endDate } = req.query;
      const accumulation = await getAttendanceAccumulation(
        startDate as string | undefined,
        endDate as string | undefined,
      );
      res.send({
        message: "Berhasil mengambil akumulasi absensi",
        data: accumulation,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },

  getStudentAccumulation: async (req: Request, res: Response) => {
    try {
      const { studentId } = req.params;
      const { startDate, endDate } = req.query;
      const accumulation = await getStudentAttendanceAccumulation(
        studentId as string,
        startDate as string | undefined,
        endDate as string | undefined,
      );
      res.send({
        message: "Berhasil mengambil akumulasi absensi siswa",
        data: accumulation,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },
};
