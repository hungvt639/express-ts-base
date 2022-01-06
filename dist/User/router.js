"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./controllers/user");
const express_1 = require("express");
const user = (0, express_1.Router)();
user.get("/", user_1.getUser);
user.post("/", user_1.createUser);
exports.default = user;
//# sourceMappingURL=router.js.map