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

export const getAllStudents = async (classId?: string) => {
  const students = await studentRepository.findStudents(classId);
  return students.map((student) => ({
    id: student.id,
    name: student.name,
    nis: student.nis,
    classId: student.classId,
    className: student.class?.name || "-",
  }));
};

export const createStudent = async (
  newStudentData: CreateStudentInput,
): Promise<void> => {
  const { name, nis, classId } = newStudentData;

  if (!name || !nis || !classId) {
    throw new Error("Fields 'name', 'nis', and 'classId' are required.");
  }

  await prisma.student.create({
    data: {
      name,
      nis,
      class: {
        connect: { id: classId },
      },
    },
    include: {
      class: true,
    },
  });
};

export const createManyStudents = async (
  students: CreateStudentInput[],
): Promise<void> => {
  if (!students || students.length === 0) return;
  await studentRepository.createMany(students);
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
