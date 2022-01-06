import { Request, Response } from "express";
import { UserInterface } from "./user";

export interface Req extends Request {
    user?: UserInterface;
    file?: any;
}
export interface Res extends Response {}
