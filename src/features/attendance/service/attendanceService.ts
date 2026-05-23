import attendanceRepository from "../repository/attendanceRepository";
import studentRepository from "../../student/repository/studentRepository";
import type { Status } from "../../../generated/prisma/client";

interface CreateAttendanceInput {
  studentId: string;
  status: Status;
  date?: string | Date;
}

interface UpdateAttendanceInput {
  status?: Status;
  date?: string | Date;
}

interface AttendanceItem {
  studentId: string;
  studentName: string;
  status: Status;
}

interface CreateBulkAttendanceInput {
  date?: string | Date;
  tanggal?: string | Date;
  classId: string;
  attendance?: AttendanceItem[];
}

const createBulkAttendance = async (input: CreateBulkAttendanceInput) => {
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
  const students = await studentRepository.findByIds(studentIds);

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
  const existingAttendances =
    await attendanceRepository.findByStudentIdsAndDate(
      studentIds,
      attendanceDate,
    );

  if (existingAttendances.length > 0) {
    const duplicateNames = existingAttendances
      .map((a) => a.student.name)
      .join(", ");
    throw new Error(
      `Siswa ${duplicateNames} sudah tercatat absensi pada tanggal tersebut`,
    );
  }

  // Bulk create attendance
  const attendanceData = attendance.map((item) => ({
    studentId: item.studentId,
    status: item.status,
    date: attendanceDate,
  }));

  await attendanceRepository.createBulk(attendanceData);

  // Ambil data yang baru saja dibuat beserta relasi student
  const createdAttendances = await attendanceRepository.findByStudentIdsAndDate(
    studentIds,
    attendanceDate,
  );

  return createdAttendances.map((attendance) => ({
    id: attendance.id,
    studentId: attendance.studentId,
    studentName: attendance.student.name,
    status: attendance.status,
    date: attendance.date,
  }));
};

export const getAllAttendances = async (date: string, classId: string) => {
  if (!date || !classId) {
    throw new Error("Parameter 'date' dan 'classId' wajib diisi");
  }

  const queryDate = new Date(date);
  const data = await attendanceRepository.findAllByDateAndClassId(
    queryDate,
    classId,
  );
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

const getAttendanceById = async (id: string) => {
  const attendance = await attendanceRepository.findById(id);
  if (!attendance) {
    throw new Error("Data absensi tidak ditemukan");
  }
  return attendance;
};

const getAttendancesByStudentId = async (studentId: string) => {
  const student = await studentRepository.findById(studentId);
  if (!student) {
    throw new Error("Siswa tidak ditemukan");
  }
  const data = await attendanceRepository.findByStudentId(studentId);
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

const createAttendance = async (input: CreateAttendanceInput) => {
  const { studentId, status, date } = input;

  if (!studentId || !status) {
    throw new Error("Field 'studentId' dan 'status' wajib diisi");
  }

  const student = await studentRepository.findById(studentId);
  if (!student) {
    throw new Error("Siswa tidak ditemukan");
  }

  const attendanceDate = date ? new Date(date) : new Date();
  const existing = await attendanceRepository.findByStudentIdAndDate(
    studentId,
    attendanceDate,
  );
  if (existing) {
    throw new Error("Siswa sudah tercatat absensi pada tanggal tersebut");
  }

  const attendance = await attendanceRepository.create({
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

const updateAttendance = async (id: string, input: UpdateAttendanceInput) => {
  const existing = await attendanceRepository.findById(id);
  if (!existing) {
    throw new Error("Data absensi tidak ditemukan");
  }

  const updateData: { status?: Status; date?: Date } = {};

  if (input.status) updateData.status = input.status;
  if (input.date) updateData.date = new Date(input.date);

  const attendance = await attendanceRepository.update(id, updateData);

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

const getAttendanceAccumulation = async (
  startDate?: string,
  endDate?: string,
) => {
  const cleanStartDate = startDate ? startDate.replace(/"/g, "") : undefined;
  const cleanEndDate = endDate ? endDate.replace(/"/g, "") : undefined;

  const start = cleanStartDate
    ? new Date(cleanStartDate)
    : new Date(new Date().setMonth(new Date().getMonth() - 1));
  const end = cleanEndDate ? new Date(cleanEndDate) : new Date();

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  const hadir = await attendanceRepository.countByStatusAndDateRange(
    "HADIR",
    start,
    end,
  );
  const sakit = await attendanceRepository.countByStatusAndDateRange(
    "SAKIT",
    start,
    end,
  );
  const izin = await attendanceRepository.countByStatusAndDateRange(
    "IZIN",
    start,
    end,
  );
  const alpha = await attendanceRepository.countByStatusAndDateRange(
    "ALPHA",
    start,
    end,
  );

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

const getStudentAttendanceAccumulation = async (
  studentId: string,
  startDate?: string,
  endDate?: string,
) => {
  const student = await studentRepository.findById(studentId);
  if (!student) {
    throw new Error("Siswa tidak ditemukan");
  }

  const start = startDate
    ? new Date(startDate)
    : new Date(new Date().setMonth(new Date().getMonth() - 1));
  const end = endDate ? new Date(endDate) : new Date();

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  const attendances = await attendanceRepository.findByStudentId(studentId);

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

export {
  getAttendanceById,
  getAttendancesByStudentId,
  createAttendance,
  updateAttendance,
  getAttendanceAccumulation,
  getStudentAttendanceAccumulation,
  createBulkAttendance,
};
