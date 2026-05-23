"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const classController_js_1 = require("./controller/classController.js");
const router = (0, express_1.Router)();
router.get("/class", classController_js_1.classController.getAll);
router.get("/class/:id", classController_js_1.classController.getById);
exports.default = router;
