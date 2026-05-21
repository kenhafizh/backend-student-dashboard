import { Router } from "express";
import { studentViolationController } from "./controller/studentViolationController";

const router = Router();

router.post("/student-violation", studentViolationController.create);
router.get("/student-violation", studentViolationController.getAll);
router.get("/student-violation/student/:studentId", studentViolationController.getByStudentId);
router.get("/student-violation/:id", studentViolationController.getById);
router.put("/student-violation/:id", studentViolationController.update);
router.delete("/student-violation/:id", studentViolationController.delete);

export default router;
