import recapitulationRepository from "../repository/recapitulationRepository";

const getRecapitulation = async (month?: number, year?: number) => {
	const currentMonth = month || new Date().getMonth() + 1;
	const currentYear = year || new Date().getFullYear();

	const startDate = new Date(currentYear, currentMonth - 1, 1);
	const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);

	return recapitulationRepository.getRecapitulationByMonth(startDate, endDate);
};

export { getRecapitulation };
