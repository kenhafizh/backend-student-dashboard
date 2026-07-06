import recapitulationRepository from "../repository/recapitulationRepository";

const getRecapitulation = async (
	startMonth?: number,
	endMonth?: number,
	year?: number,
) => {
	const currentYear = year || new Date().getFullYear();
	const currentStartMonth = startMonth || new Date().getMonth() + 1;
	const currentEndMonth = endMonth || currentStartMonth;

	const startDate = new Date(currentYear, currentStartMonth - 1, 1);
	const endDate = new Date(currentYear, currentEndMonth, 0, 23, 59, 59, 999);

	return recapitulationRepository.getRecapitulationByMonth(startDate, endDate);
};

export { getRecapitulation };
