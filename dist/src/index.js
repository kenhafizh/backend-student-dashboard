"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const student_routes_1 = __importDefault(require("./features/student/student.routes"));
const student_violation_routes_1 = __importDefault(require("./features/violation/student.violation.routes"));
const attendance_routes_1 = __importDefault(require("./features/attendance/attendance.routes"));
const class_routes_1 = __importDefault(require("./features/class/class.routes"));
const dashboard_routes_1 = __importDefault(require("./features/dashboard/dashboard.routes"));
const recapitulation_routes_1 = __importDefault(require("./features/recapitulation/recapitulation.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
const allowedOrigins = process.env.ALLOWED_ORIGIN
    ? process.env.ALLOWED_ORIGIN.split(",").map((origin) => origin.trim())
    : "*";
const corsOptions = {
    origin: allowedOrigins === "*" ? "*" : allowedOrigins,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: allowedOrigins !== "*",
};
app.use((0, cors_1.default)(corsOptions));
app.get("/", (req, res) => {
    res.send("Halo, sistem absensi sudah jalan!");
});
app.use(student_routes_1.default);
app.use(student_violation_routes_1.default);
app.use(attendance_routes_1.default);
app.use(class_routes_1.default);
app.use(dashboard_routes_1.default);
app.use(recapitulation_routes_1.default);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
