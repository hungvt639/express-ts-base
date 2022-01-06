import dotenv from "dotenv";
dotenv.config();

import User from "./routers/user";
import Blog from "./routers/blog";
import Product from "./routers/product";
import File from "./routers/file";
import Notify from "./routers/notification";
import express from "express";
import morgan from "morgan";
import * as path from "path";
import connect from "./config/db";
import bodyParser from "body-parser";
import { PORT } from "./config/const";
import cors from "cors";
// import MqttClient from "./config/mqtt";

connect();
const app = express();

app.use("/public", express.static(path.join(__dirname, "../", "public")));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", User);
app.use("/blog", Blog);
app.use("/file", File);
app.use("/product", Product);
app.use("/notify", Notify);

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
