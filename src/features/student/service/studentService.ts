import studentRepository from "../repository/studentRepository";
import { prisma } from "../../../db";

interface CreateStudentInput {
  nis: string;
  name: string;
  classId: string;
}

interface UpdateStudentInput {
  name?: string;
  nis?: string;
  classId?: string;
}

export const getAllStudents = async (classId: string) => {
  return studentRepository.findStudents(classId);
};

export const createStudent = async (newStudentData: CreateStudentInput) => {
  const { name, nis, classId } = newStudentData;

  if (!name || !nis || !classId) {
    throw new Error("Fields 'name', 'nis', and 'classId' are required.");
  }

  const student = await prisma.student.create({
    data: {
      name,
      nis,
      class: {
        connect: { id: classId },
      },
    },
  });

  return student;
};

export const updateStudent = async (
  id: string,
  updateData: UpdateStudentInput,
) => {
  const existing = await studentRepository.findById(id);
  if (!existing) {
    throw new Error("Siswa tidak ditemukan");
  }

  return studentRepository.update(id, updateData);
};

export const deleteStudent = async (id: string) => {
  const existing = await studentRepository.findById(id);
  if (!existing) {
    throw new Error("Siswa tidak ditemukan");
  }

  return studentRepository.deleteStudent(id);
};
