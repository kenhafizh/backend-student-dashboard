"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recapitulationController_1 = require("./controller/recapitulationController");
const router = (0, express_1.Router)();
router.get("/recapitulation", recapitulationController_1.recapitulationController.getRecapitulation);
exports.default = router;
