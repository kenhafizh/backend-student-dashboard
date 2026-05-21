import { Router } from "express";
import { studentController } from "./controller/studentController";

const router = Router();

router.post("/student", studentController.create);
router.get("/student", studentController.getAll);
router.put("/student/:id", studentController.update);
router.delete("/student/:id", studentController.delete);

export default router;
