"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBulkAttendance = exports.getStudentAttendanceAccumulation = exports.getAttendanceAccumulation = exports.updateAttendance = exports.createAttendance = exports.getAttendancesByStudentId = exports.getAttendanceById = exports.getAllAttendances = void 0;
const attendanceRepository_1 = __importDefault(require("../repository/attendanceRepository"));
const studentRepository_1 = __importDefault(require("../../student/repository/studentRepository"));
const createBulkAttendance = async (input) => {
    const date = input.date || input.tanggal;
    const classId = input.classId;
    const attendance = input.attendance;
    // Validasi input
    if (!date || !classId || !attendance || attendance.length === 0) {
        throw new Error("Field 'date', 'classId', dan 'attendance' wajib diisi");
    }
    // Validasi status
    const validStatuses = ["HADIR", "SAKIT", "IZIN", "ALPHA"];
    for (const item of attendance) {
        if (!validStatuses.includes(item.status)) {
            throw new Error(`Status '${item.status}' tidak valid`);
        }
    }
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);
    // Validasi semua students ada di class yang diminta
    const studentIds = attendance.map((a) => a.studentId);
    const students = await studentRepository_1.default.findByIds(studentIds);
    for (const item of attendance) {
        const student = students.find((s) => s.id === item.studentId);
        if (!student) {
            throw new Error(`Siswa dengan ID '${item.studentId}' tidak ditemukan`);
        }
        if (student.classId !== classId) {
            throw new Error(`Siswa '${item.studentName}' tidak ada di kelas ini`);
        }
    }
    // Validasi tidak ada duplicate attendance untuk tanggal yang sama
    const existingAttendances = await attendanceRepository_1.default.findByStudentIdsAndDate(studentIds, attendanceDate);
    if (existingAttendances.length > 0) {
        const duplicateNames = existingAttendances
            .map((a) => a.student.name)
            .join(", ");
        throw new Error(`Siswa ${duplicateNames} sudah tercatat absensi pada tanggal tersebut`);
    }
    // Bulk create attendance
    const attendanceData = attendance.map((item) => ({
        studentId: item.studentId,
        status: item.status,
        date: attendanceDate,
    }));
    await attendanceRepository_1.default.createBulk(attendanceData);
    // Ambil data yang baru saja dibuat beserta relasi student
    const createdAttendances = await attendanceRepository_1.default.findByStudentIdsAndDate(studentIds, attendanceDate);
    return createdAttendances.map((attendance) => ({
        id: attendance.id,
        studentId: attendance.studentId,
        studentName: attendance.student.name,
        status: attendance.status,
        date: attendance.date,
    }));
};
exports.createBulkAttendance = createBulkAttendance;
const getAllAttendances = async (date, classId) => {
    if (!date || !classId) {
        throw new Error("Parameter 'date' dan 'classId' wajib diisi");
    }
    const queryDate = new Date(date);
    const [students, attendances] = await Promise.all([
        studentRepository_1.default.findStudents(classId),
        attendanceRepository_1.default.findAllByDateAndClassId(queryDate, classId),
    ]);
    const attendanceMap = new Map(attendances.map((a) => [a.studentId, a]));
    return students.map((student) => {
        const attendance = attendanceMap.get(student.id);
        return {
            id: attendance?.id ?? null,
            studentId: student.id,
            name: student.name,
            nis: student.nis,
            classId: student.classId,
            status: attendance?.status ?? null,
            date: attendance?.date ?? null,
        };
    });
};
exports.getAllAttendances = getAllAttendances;
const getAttendanceById = async (id) => {
    const attendance = await attendanceRepository_1.default.findById(id);
    if (!attendance) {
        throw new Error("Data absensi tidak ditemukan");
    }
    return attendance;
};
exports.getAttendanceById = getAttendanceById;
const getAttendancesByStudentId = async (studentId) => {
    const student = await studentRepository_1.default.findById(studentId);
    if (!student) {
        throw new Error("Siswa tidak ditemukan");
    }
    const data = await attendanceRepository_1.default.findByStudentId(studentId);
    return data.map((item) => ({
        id: item.id,
        studentId: item.studentId,
        name: item.student.name,
        nis: item.student.nis,
        classId: item.student.classId,
        status: item.status,
        date: item.date,
    }));
};
exports.getAttendancesByStudentId = getAttendancesByStudentId;
const createAttendance = async (input) => {
    const { studentId, status, date } = input;
    if (!studentId || !status) {
        throw new Error("Field 'studentId' dan 'status' wajib diisi");
    }
    const student = await studentRepository_1.default.findById(studentId);
    if (!student) {
        throw new Error("Siswa tidak ditemukan");
    }
    const attendanceDate = date ? new Date(date) : new Date();
    const existing = await attendanceRepository_1.default.findByStudentIdAndDate(studentId, attendanceDate);
    if (existing) {
        throw new Error("Siswa sudah tercatat absensi pada tanggal tersebut");
    }
    const attendance = await attendanceRepository_1.default.create({
        status,
        date: attendanceDate,
        student: {
            connect: { id: studentId },
        },
    });
    return {
        id: attendance.id,
        studentId: attendance.studentId,
        name: attendance.student.name,
        nis: attendance.student.nis,
        classId: attendance.student.classId,
        status: attendance.status,
        date: attendance.date,
    };
};
exports.createAttendance = createAttendance;
const updateAttendance = async (id, input) => {
    const existing = await attendanceRepository_1.default.findById(id);
    if (!existing) {
        throw new Error("Data absensi tidak ditemukan");
    }
    const updateData = {};
    if (input.status)
        updateData.status = input.status;
    if (input.date)
        updateData.date = new Date(input.date);
    const attendance = await attendanceRepository_1.default.update(id, updateData);
    return {
        id: attendance.id,
        studentId: attendance.studentId,
        name: attendance.student.name,
        nis: attendance.student.nis,
        class: attendance.student.classId,
        status: attendance.status,
        date: attendance.date,
    };
};
exports.updateAttendance = updateAttendance;
const getAttendanceAccumulation = async (startDate, endDate) => {
    const cleanStartDate = startDate ? startDate.replace(/"/g, "") : undefined;
    const cleanEndDate = endDate ? endDate.replace(/"/g, "") : undefined;
    const start = cleanStartDate
        ? new Date(cleanStartDate)
        : new Date(new Date().setMonth(new Date().getMonth() - 1));
    const end = cleanEndDate ? new Date(cleanEndDate) : new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    const hadir = await attendanceRepository_1.default.countByStatusAndDateRange("HADIR", start, end);
    const sakit = await attendanceRepository_1.default.countByStatusAndDateRange("SAKIT", start, end);
    const izin = await attendanceRepository_1.default.countByStatusAndDateRange("IZIN", start, end);
    const alpha = await attendanceRepository_1.default.countByStatusAndDateRange("ALPHA", start, end);
    return {
        period: {
            startDate: start,
            endDate: end,
        },
        accumulation: {
            hadir,
            sakit,
            izin,
            alpha,
            total: hadir + sakit + izin + alpha,
        },
    };
};
exports.getAttendanceAccumulation = getAttendanceAccumulation;
const getStudentAttendanceAccumulation = async (studentId, startDate, endDate) => {
    const student = await studentRepository_1.default.findById(studentId);
    if (!student) {
        throw new Error("Siswa tidak ditemukan");
    }
    const start = startDate
        ? new Date(startDate)
        : new Date(new Date().setMonth(new Date().getMonth() - 1));
    const end = endDate ? new Date(endDate) : new Date();
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    const attendances = await attendanceRepository_1.default.findByStudentId(studentId);
    const filtered = attendances.filter((a) => {
        const d = new Date(a.date);
        return d >= start && d <= end;
    });
    const hadir = filtered.filter((a) => a.status === "HADIR").length;
    const sakit = filtered.filter((a) => a.status === "SAKIT").length;
    const izin = filtered.filter((a) => a.status === "IZIN").length;
    const alpha = filtered.filter((a) => a.status === "ALPHA").length;
    return {
        student: {
            id: student.id,
            name: student.name,
            nis: student.nis,
            class: student.classId,
        },
        period: {
            startDate: start,
            endDate: end,
        },
        accumulation: {
            hadir,
            sakit,
            izin,
            alpha,
            total: hadir + sakit + izin + alpha,
        },
    };
};
exports.getStudentAttendanceAccumulation = getStudentAttendanceAccumulation;
