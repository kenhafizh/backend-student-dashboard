import { Request, Response } from "express";
import { getRecapitulation } from "../service/recapitulationService";

export const recapitulationController = {
  getRecapitulation: async (req: Request, res: Response) => {
    try {
      const { startMonth, endMonth, year } = req.query;
      const recapitulation = await getRecapitulation(
        startMonth ? parseInt(startMonth as string) : undefined,
        endMonth ? parseInt(endMonth as string) : undefined,
        year ? parseInt(year as string) : undefined,
      );
      res.send({
        message: "Berhasil mengambil data rekapitulasi",
        data: recapitulation,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan";
      res.status(400).send({ message });
    }
  },
};
