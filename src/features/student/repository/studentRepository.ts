import { prisma, PrismaTx } from "../../../db";

const findStudents = async () => {
  const students = await prisma.student.findMany();
  return students;
};

const findById = async (id: string, tx: PrismaTx = prisma) => {
  return tx.student.findUnique({ where: { id } });
};

const update = async (id: string, data: { name?: string; nis?: string; class?: string }, tx: PrismaTx = prisma) => {
  return tx.student.update({ where: { id }, data });
};

const deleteStudent = async (id: string, tx: PrismaTx = prisma) => {
  return tx.student.delete({ where: { id } });
};

export default {
  findStudents,
  findById,
  update,
  deleteStudent,
};
