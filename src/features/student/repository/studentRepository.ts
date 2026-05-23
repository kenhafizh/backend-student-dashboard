import { prisma, PrismaTx } from "../../../db";

const findStudents = async (classId: string) => {
  const students = await prisma.student.findMany({
    where: { classId },
  });
  return students;
};

const findById = async (id: string, tx: PrismaTx = prisma) => {
  return tx.student.findUnique({ where: { id } });
};

const findByIds = async (ids: string[], tx: PrismaTx = prisma) => {
  return tx.student.findMany({
    where: { id: { in: ids } },
  });
};

const update = async (
  id: string,
  data: { name?: string; nis?: string; classId?: string },
  tx: PrismaTx = prisma,
) => {
  const updateData: {
    name?: string;
    nis?: string;
    class?: { connect: { id: string } };
  } = {};
  if (data.name) updateData.name = data.name;
  if (data.nis) updateData.nis = data.nis;
  if (data.classId) updateData.class = { connect: { id: data.classId } };
  return tx.student.update({ where: { id }, data: updateData });
};

const deleteStudent = async (id: string, tx: PrismaTx = prisma) => {
  return tx.student.delete({ where: { id } });
};

export default {
  findStudents,
  findById,
  findByIds,
  update,
  deleteStudent,
};
