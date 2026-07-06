import { Request, Response } from "express";
import {
  getAllViolations,
  getViolationById,
  createViolation,
  updateViolation,
  deleteViolation,
} from "../service/studentViolationService";
import { getViolationRecapitulation } from "../service/violationRecapitulationService";

export const studentViolationController = {
  create: async (req: Request, res: Response) => {
    try {
      const violation = await createViolation(req.body);
      res.status(201).send({
        message: "Pelanggaran berhasil dibuat",
        data: violation,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const violations = await getAllViolations();
      res.send({
        message: "Berhasil mengambil data pelanggaran",
        data: violations,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const violation = await updateViolation(id as string, req.body);
      res.send({
        message: "Pelanggaran berhasil diperbarui",
        data: violation,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await deleteViolation(id as string);
      res.send({
        message: "Pelanggaran berhasil dihapus",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },

  getRecapitulation: async (req: Request, res: Response) => {
    try {
      const { startMonth, endMonth, year } = req.query;
      const recapitulation = await getViolationRecapitulation(
        startMonth ? parseInt(startMonth as string) : undefined,
        endMonth ? parseInt(endMonth as string) : undefined,
        year ? parseInt(year as string) : undefined,
      );
      res.send({
        message: "Berhasil mengambil data rekapitulasi pelanggaran",
        data: recapitulation,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },
};
