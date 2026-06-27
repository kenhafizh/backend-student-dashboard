"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classController_1 = require("./controller/classController");
const router = (0, express_1.Router)();
router.get("/class", classController_1.classController.getAll);
router.get("/class/:id", classController_1.classController.getById);
exports.default = router;
