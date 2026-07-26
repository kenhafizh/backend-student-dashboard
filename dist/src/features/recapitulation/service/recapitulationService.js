"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecapitulation = void 0;
const recapitulationRepository_1 = __importDefault(require("../repository/recapitulationRepository"));
const getRecapitulation = async (startMonth, endMonth, year) => {
    const currentYear = year || new Date().getFullYear();
    const currentStartMonth = startMonth || new Date().getMonth() + 1;
    const currentEndMonth = endMonth || currentStartMonth;
    const startDate = new Date(currentYear, currentStartMonth - 1, 1);
    const endDate = new Date(currentYear, currentEndMonth, 0, 23, 59, 59, 999);
    return recapitulationRepository_1.default.getRecapitulationByMonth(startDate, endDate);
};
exports.getRecapitulation = getRecapitulation;
