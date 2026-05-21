import { prisma, PrismaTx } from "../../../db";
import type { Violation, Prisma } from "../../../generated/prisma/client";

const findAll = async (tx: PrismaTx = prisma) => {
  return tx.violation.findMany({
    include: {
      student: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const findById = async (id: string, tx: PrismaTx = prisma) => {
  return tx.violation.findUnique({
    where: { id },
    include: {
      student: true,
    },
  });
};

const findByStudentId = async (studentId: string, tx: PrismaTx = prisma) => {
  return tx.violation.findMany({
    where: { studentId },
    include: {
      student: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const create = async (
  data: Prisma.ViolationCreateInput,
  tx: PrismaTx = prisma,
) => {
  return tx.violation.create({
    data,
    include: {
      student: true,
    },
  });
};

const update = async (
  id: string,
  data: Prisma.ViolationUpdateInput,
  tx: PrismaTx = prisma,
) => {
  return tx.violation.update({
    where: { id },
    data,
    include: {
      student: true,
    },
  });
};

const deleteViolation = async (id: string, tx: PrismaTx = prisma) => {
  return tx.violation.delete({
    where: { id },
  });
};

export default {
  findAll,
  findById,
  findByStudentId,
  create,
  update,
  deleteViolation,
};
