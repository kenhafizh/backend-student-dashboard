import { Router } from "express";
import { studentViolationController } from "./controller/studentViolationController";

const router = Router();

router.post("/student-violation", studentViolationController.create);
router.get("/student-violation", studentViolationController.getAll);
router.put("/student-violation/:id", studentViolationController.update);
router.delete("/student-violation/:id", studentViolationController.delete);

export default router;
