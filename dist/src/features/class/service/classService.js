"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classService = void 0;
const classRepository_js_1 = require("../repository/classRepository.js");
exports.classService = {
    getAll: async () => {
        return classRepository_js_1.classRepository.findAll();
    },
    getById: async (id) => {
        const classData = await classRepository_js_1.classRepository.findById(id);
        if (!classData) {
            throw new Error("Kelas tidak ditemukan");
        }
        return classData;
    },
};
