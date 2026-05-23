"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classRepository = void 0;
const index_js_1 = require("../../../db/index.js");
exports.classRepository = {
    findAll: async () => {
        return index_js_1.prisma.class.findMany({
            orderBy: { name: "asc" },
        });
    },
    findById: async (id) => {
        return index_js_1.prisma.class.findUnique({
            where: { id },
        });
    },
};
