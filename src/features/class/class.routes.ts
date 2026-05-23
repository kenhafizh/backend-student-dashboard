import { Router } from "express";
import { classController } from "./controller/classController.js";

const router = Router();

router.get("/class", classController.getAll);
router.get("/class/:id", classController.getById);

export default router;
