import dashboardRepository from "../repository/dashboardRepository";

const getDashboard = async () => {
	return dashboardRepository.getDashboardSummary();
};

export { getDashboard };
