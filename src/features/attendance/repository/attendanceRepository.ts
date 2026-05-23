import { prisma, PrismaTx } from "../../../db";
import type { Prisma, Status } from "../../../generated/prisma/client";

const findAll = async (tx: PrismaTx = prisma) => {
  return tx.attendance.findMany({
    include: {
      student: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};

const findById = async (id: string, tx: PrismaTx = prisma) => {
  return tx.attendance.findUnique({
    where: { id },
    include: {
      student: true,
    },
  });
};

const findByIds = async (ids: string[]) => {
  return prisma.student.findMany({
    where: { id: { in: ids } },
  });
};

const findByStudentIdsAndDate = async (studentIds: string[], date: Date) => {
  return prisma.attendance.findMany({
    where: {
      studentId: { in: studentIds },
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
    include: { student: true },
  });
};

const createBulk = async (
  data: Array<{ studentId: string; status: Status; date: Date }>,
) => {
  return prisma.attendance.createMany({
    data,
    skipDuplicates: false,
  });
};

const findByStudentId = async (studentId: string, tx: PrismaTx = prisma) => {
  return tx.attendance.findMany({
    where: { studentId },
    include: {
      student: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};

const findByStudentIdAndDate = async (
  studentId: string,
  date: Date,
  tx: PrismaTx = prisma,
) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return tx.attendance.findFirst({
    where: {
      studentId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
};

const create = async (
  data: Prisma.AttendanceCreateInput,
  tx: PrismaTx = prisma,
) => {
  return tx.attendance.create({
    data,
    include: {
      student: true,
    },
  });
};

const update = async (
  id: string,
  data: Prisma.AttendanceUpdateInput,
  tx: PrismaTx = prisma,
) => {
  return tx.attendance.update({
    where: { id },
    data,
    include: {
      student: true,
    },
  });
};

const countByStatus = async (status: Status, tx: PrismaTx = prisma) => {
  return tx.attendance.count({
    where: { status },
  });
};

const countByStatusAndDateRange = async (
  status: Status,
  startDate: Date,
  endDate: Date,
  tx: PrismaTx = prisma,
) => {
  return tx.attendance.count({
    where: {
      status,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
};

const findAllByDateRange = async (
  startDate: Date,
  endDate: Date,
  tx: PrismaTx = prisma,
) => {
  return tx.attendance.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      student: true,
    },
    orderBy: {
      date: "desc",
    },
  });
};

const findAllByDateAndClassId = async (
  date: Date,
  classId: string,
  tx: PrismaTx = prisma,
) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return tx.attendance.findMany({
    where: {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      student: {
        classId: classId,
      },
    },
    include: {
      student: true,
    },
    orderBy: {
      student: {
        name: "asc",
      },
    },
  });
};

export default {
  findAll,
  findById,
  findByStudentId,
  findByStudentIdAndDate,
  create,
  update,
  countByStatus,
  countByStatusAndDateRange,
  findAllByDateRange,
  findByIds,
  findByStudentIdsAndDate,
  createBulk,
  findAllByDateAndClassId,
};
