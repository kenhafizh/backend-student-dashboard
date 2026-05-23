import { prisma } from "../../../db/index.js";

export const classRepository = {
	findAll: async () => {
		return prisma.class.findMany({
			orderBy: { name: "asc" },
		});
	},

	findById: async (id: string) => {
		return prisma.class.findUnique({
			where: { id },
		});
	},
};
