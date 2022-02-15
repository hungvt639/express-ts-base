import { RequestHandler } from "express";
import { Req, Res, Next } from "../interfaces/Express";

type FnRequestHandler = (req: Req, res: Res, next?: Next) => Promise<any>;

export default (fn: FnRequestHandler): RequestHandler =>
    (req: Req, res: Res, next: Next) =>
        fn(req, res, next).catch(next);
