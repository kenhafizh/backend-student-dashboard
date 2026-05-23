import express, { Request, Response } from "express";
import dotenv from "dotenv";
import studentRoutes from "./features/student/student.routes";
import studentViolationRoutes from "./features/violation/student.violation.routes";
import attendanceRoutes from "./features/attendance/attendance.routes";
import classRoutes from "./features/class/class.routes";
import dashboardRoutes from "./features/dashboard/dashboard.routes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	res.send("Halo, sistem absensi sudah jalan!");
});

app.use(studentRoutes);
app.use(studentViolationRoutes);
app.use(attendanceRoutes);
app.use(classRoutes);
app.use(dashboardRoutes);

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
