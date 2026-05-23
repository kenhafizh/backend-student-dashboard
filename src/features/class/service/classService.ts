import { classRepository } from "../repository/classRepository.js";

export const classService = {
	getAll: async () => {
		return classRepository.findAll();
	},

	getById: async (id: string) => {
		const classData = await classRepository.findById(id);
		if (!classData) {
			throw new Error("Kelas tidak ditemukan");
		}
		return classData;
	},
};
