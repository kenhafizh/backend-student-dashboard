import studentRepository from "../repository/studentRepository";
import { prisma } from "../../../db";

interface CreateStudentInput {
  nis: string;
  name: string;
  class: string;
}

interface UpdateStudentInput {
  name?: string;
  nis?: string;
  class?: string;
}

export const getAllStudents = async () => {
  return studentRepository.findStudents();
};

export const createStudent = async (newStudentData: CreateStudentInput) => {
  const { name, nis, class: studentClass } = newStudentData;

  if (!name || !nis || !studentClass) {
    throw new Error("Fields 'name', 'nis', and 'studentClass' are required.");
  }

  const student = await prisma.student.create({
    data: {
      name,
      nis,
      class: studentClass,
    },
  });

  return student;
};

export const updateStudent = async (id: string, updateData: UpdateStudentInput) => {
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
