import studentViolationRepository from "../repository/studentViolationRepository";
import studentRepository from "../../student/repository/studentRepository";
import { prisma } from "../../../db";
import type {
  Violation,
  ViolationType,
  ActionType,
} from "../../../generated/prisma/client";

interface CreateViolationInput {
  studentId: string;
  violationType: ViolationType;
  actionType: ActionType;
  point: number;
  description: string;
  date: string | Date;
}

interface UpdateViolationInput {
  violationType?: ViolationType;
  actionType?: ActionType;
  point?: number;
  description?: string;
  date?: string | Date;
}

export const getAllViolations = async () => {
  const data = await studentViolationRepository.findAll();
  return data.map((item) => ({
    id: item.id,
    name: item.student.name, // Hanya mengembalikan nama siswa untuk setiap pelanggaran yang diambil dari students dengan cara mapping
    class: item.student.class,
    violationType: item.violationType,
    point: item.point,
    actionType: item.actionType,
    description: item.description,
    date: item.date,
  }));
};

export const getViolationById = async (id: string) => {
  const violation = await studentViolationRepository.findById(id);
  if (!violation) {
    throw new Error("Pelanggaran tidak ditemukan");
  }
  return violation;
};

export const getViolationsByStudentId = async (studentId: string) => {
  const student = await studentRepository.findById(studentId);
  if (!student) {
    throw new Error("Siswa tidak ditemukan");
  }
  return studentViolationRepository.findByStudentId(studentId);
};

export const createViolation = async (
  input: CreateViolationInput,
): Promise<void> => {
  // Promise void agar tidak mengembalikan return value jika data response tidak dipakai
  const { studentId, violationType, actionType, point, description, date } =
    input;

  if (
    !studentId ||
    !violationType ||
    !actionType ||
    point === undefined ||
    !description ||
    !date
  ) {
    throw new Error(
      "Field 'studentId', 'violationType', 'actionType', 'point', 'description', dan 'date' wajib diisi",
    );
  }

  const student = await studentRepository.findById(studentId);
  if (!student) {
    throw new Error("Siswa tidak ditemukan");
  }

  await studentViolationRepository.create({
    violationType,
    actionType,
    point,
    description,
    date: new Date(date),
    student: {
      connect: { id: studentId },
    },
  });
};

export const updateViolation = async (
  id: string,
  input: UpdateViolationInput,
): Promise<void> => {
  const existing = await studentViolationRepository.findById(id);
  if (!existing) {
    throw new Error("Pelanggaran tidak ditemukan");
  }

  const updateData: {
    violationType?: ViolationType;
    actionType?: ActionType;
    point?: number;
    description?: string;
    date?: Date;
  } = {};

  if (input.violationType) updateData.violationType = input.violationType;
  if (input.actionType) updateData.actionType = input.actionType;
  if (input.point !== undefined) updateData.point = input.point;
  if (input.description) updateData.description = input.description;
  if (input.date) updateData.date = new Date(input.date);

  await studentViolationRepository.update(id, updateData);
};

export const deleteViolation = async (id: string) => {
  const existing = await studentViolationRepository.findById(id);
  if (!existing) {
    throw new Error("Pelanggaran tidak ditemukan");
  }

  return studentViolationRepository.deleteViolation(id);
};
