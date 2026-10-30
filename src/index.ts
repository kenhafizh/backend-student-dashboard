import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import studentRoutes from "./features/student/student.routes";
import studentViolationRoutes from "./features/violation/student.violation.routes";
import attendanceRoutes from "./features/attendance/attendance.routes";
import classRoutes from "./features/class/class.routes";
import dashboardRoutes from "./features/dashboard/dashboard.routes";
import recapitulationRoutes from "./features/recapitulation/recapitulation.routes";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGIN
  ? process.env.ALLOWED_ORIGIN.split(",").map((origin) => origin.trim())
  : "*";

const corsOptions: CorsOptions = {
  origin: allowedOrigins === "*" ? "*" : allowedOrigins,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: allowedOrigins !== "*",
};

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Halo, sistem absensi sudah jalan!");
});

app.use(studentRoutes);
app.use(studentViolationRoutes);
app.use(attendanceRoutes);
app.use(classRoutes);
app.use(dashboardRoutes);
app.use(recapitulationRoutes);

export default app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}
