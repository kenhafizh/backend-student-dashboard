"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecapitulation = void 0;
const recapitulationRepository_1 = __importDefault(require("../repository/recapitulationRepository"));
const getRecapitulation = async (month, year) => {
    const currentMonth = month || new Date().getMonth() + 1;
    const currentYear = year || new Date().getFullYear();
    const startDate = new Date(currentYear, currentMonth - 1, 1);
    const endDate = new Date(currentYear, currentMonth, 0, 23, 59, 59, 999);
    return recapitulationRepository_1.default.getRecapitulationByMonth(startDate, endDate);
};
exports.getRecapitulation = getRecapitulation;
