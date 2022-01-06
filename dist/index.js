"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("./User/router"));
const router_2 = __importDefault(require("./App/router"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const body_parser_1 = __importDefault(require("body-parser"));
(0, db_1.default)();
// const __dirname = path.resolve();
const app = (0, express_1.default)();
const port = 3000;
dotenv_1.default.config();
// app.use("/public", express.static(path.join(__dirname, "public")));
app.use((0, morgan_1.default)("combined"));
app.use(body_parser_1.default.json());
// app.use(bodyParser.urlencoded({ extended: true }));
//router
app.use("/user", router_1.default);
app.use("/", router_2.default);
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map