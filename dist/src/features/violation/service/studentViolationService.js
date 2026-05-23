"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteViolation = exports.updateViolation = exports.createViolation = exports.getViolationById = exports.getAllViolations = void 0;
const studentViolationRepository_1 = __importDefault(require("../repository/studentViolationRepository"));
const studentRepository_1 = __importDefault(require("../../student/repository/studentRepository"));
const getAllViolations = async () => {
    const data = await studentViolationRepository_1.default.findAll();
    return data.map((item) => ({
        id: item.id,
        name: item.student.name,
        classId: item.student.classId,
        violationType: item.violationType,
        point: item.point,
        actionType: item.actionType,
        description: item.description,
        date: item.date,
    }));
};
exports.getAllViolations = getAllViolations;
const getViolationById = async (id) => {
    const violation = await studentViolationRepository_1.default.findById(id);
    if (!violation) {
        throw new Error("Pelanggaran tidak ditemukan");
    }
    return violation;
};
exports.getViolationById = getViolationById;
const createViolation = async (input) => {
    // Promise void agar tidak mengembalikan return value jika data response tidak dipakai
    const { studentId, violationType, actionType, point, description, date } = input;
    if (!studentId ||
        !violationType ||
        !actionType ||
        point === undefined ||
        !description ||
        !date) {
        throw new Error("Field 'studentId', 'violationType', 'actionType', 'point', 'description', dan 'date' wajib diisi");
    }
    const student = await studentRepository_1.default.findById(studentId);
    if (!student) {
        throw new Error("Siswa tidak ditemukan");
    }
    await studentViolationRepository_1.default.create({
        violationType,
        actionType,
        point,
        description,
        date: new Date(date),
        student: {
            connect: { id: studentId },
        },
    });
};
exports.createViolation = createViolation;
const updateViolation = async (id, input) => {
    const existing = await studentViolationRepository_1.default.findById(id);
    if (!existing) {
        throw new Error("Pelanggaran tidak ditemukan");
    }
    const updateData = {};
    if (input.violationType)
        updateData.violationType = input.violationType;
    if (input.actionType)
        updateData.actionType = input.actionType;
    if (input.point !== undefined)
        updateData.point = input.point;
    if (input.description)
        updateData.description = input.description;
    if (input.date)
        updateData.date = new Date(input.date);
    await studentViolationRepository_1.default.update(id, updateData);
};
exports.updateViolation = updateViolation;
const deleteViolation = async (id) => {
    const existing = await studentViolationRepository_1.default.findById(id);
    if (!existing) {
        throw new Error("Pelanggaran tidak ditemukan");
    }
    return studentViolationRepository_1.default.deleteViolation(id);
};
exports.deleteViolation = deleteViolation;
