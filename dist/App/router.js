"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home_1 = require("./controllers/home");
const express_1 = require("express");
const app = (0, express_1.Router)();
app.get("/", home_1.home);
exports.default = app;
//# sourceMappingURL=router.js.map