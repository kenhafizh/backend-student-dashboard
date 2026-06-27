"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classRepository = void 0;
const db_1 = require("../../../db");
exports.classRepository = {
    findAll: async () => {
        return db_1.prisma.class.findMany({
            orderBy: { name: "asc" },
        });
    },
    findById: async (id) => {
        return db_1.prisma.class.findUnique({
            where: { id },
        });
    },
};
