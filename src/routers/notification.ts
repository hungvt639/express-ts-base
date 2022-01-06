import {
    getNotifyForUser,
    getNotifyNotUser,
    createNotify,
} from "../controllers/notification";
import { Router } from "express";
import { errorHandler } from "../utils/errorHandler ";
import authentication from "../middlewares/authentication";

const Notify = Router();

Notify.post("/create", authentication, createNotify, errorHandler);
Notify.get("/lists", getNotifyNotUser, errorHandler);
Notify.get("/list-user", authentication, getNotifyForUser, errorHandler);
export default Notify;
