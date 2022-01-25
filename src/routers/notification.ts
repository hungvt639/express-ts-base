import {
    getNotifyForUser,
    getNotifyNotUser,
    createNotify,
} from "../controllers/notification";
import { Router } from "express";
import authentication from "../middlewares/authentication";

const Notify = Router();

Notify.post("/create", authentication, createNotify);
Notify.get("/lists", getNotifyNotUser);
Notify.get("/list-user", authentication, getNotifyForUser);
export default Notify;
