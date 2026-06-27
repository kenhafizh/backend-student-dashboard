"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const dashboardRepository_1 = __importDefault(require("../repository/dashboardRepository"));
const getDashboard = async () => {
    return dashboardRepository_1.default.getDashboardSummary();
};
exports.getDashboard = getDashboard;
