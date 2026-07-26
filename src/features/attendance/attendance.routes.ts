import { Router } from "express";
import { attendanceController } from "./controller/attendanceController";

const router = Router();

router.post("/attendance", attendanceController.create);
router.get("/attendance", attendanceController.getAll);
router.get("/attendance/accumulation", attendanceController.getAccumulation);
router.get(
  "/attendance/student/:studentId/accumulation",
  attendanceController.getStudentAccumulation,
);
router.put("/attendance", attendanceController.update);

export default router;
