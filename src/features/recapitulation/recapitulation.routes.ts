import { Router } from "express";
import { recapitulationController } from "./controller/recapitulationController";

const router = Router();

router.get("/recapitulation", recapitulationController.getRecapitulation);

export default router;
