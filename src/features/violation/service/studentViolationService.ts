import studentViolationRepository from "../repository/studentViolationRepository";
import studentRepository from "../../student/repository/studentRepository";
import { prisma } from "../../../db";
import type {
  Violation,
  Level,
} from "../../../generated/prisma/client";

interface CreateViolationInput {
  studentId: string;
  violationType: string;
  level: Level;
  information: string;
  description: string;
  date: string | Date;
}

interface UpdateViolationInput {
  violationType?: string;
  level?: Level;
  information?: string;
  description?: string;
  date?: string | Date;
}

export const getAllViolations = async () => {
  const data = await studentViolationRepository.findAll();
  return data.map((item) => ({
    id: item.id,
    name: item.student.name,
    studentId: item.student.id,
    classId: item.student.classId,
    violationType: item.violationType,
    information: item.information,
    level: item.level,
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

export const createViolation = async (
  input: CreateViolationInput,
): Promise<void> => {
  // Promise void agar tidak mengembalikan return value jika data response tidak dipakai
  const { studentId, violationType, level, information, description, date } =
    input;

  if (
    !studentId ||
    !violationType ||
    !level ||
    !information ||
    !description ||
    !date
  ) {
    throw new Error(
      "Field 'studentId', 'violationType', 'level', 'information', 'description', dan 'date' wajib diisi",
    );
  }

  const student = await studentRepository.findById(studentId);
  if (!student) {
    throw new Error("Siswa tidak ditemukan");
  }

  await studentViolationRepository.create({
    violationType,
    level,
    information,
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
    violationType?: string;
    level?: Level;
    information?: string;
    description?: string;
    date?: Date;
  } = {};

  if (input.violationType) updateData.violationType = input.violationType;
  if (input.level) updateData.level = input.level;
  if (input.information) updateData.information = input.information;
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
