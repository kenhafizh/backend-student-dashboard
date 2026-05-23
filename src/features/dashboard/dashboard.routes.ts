import { Router } from "express";
import { dashboardController } from "./controller/dashboardController";

const router = Router();

router.get("/dashboard", dashboardController.getSummary);

export default router;
