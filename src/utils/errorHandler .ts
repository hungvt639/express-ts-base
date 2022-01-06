import { Req, Res } from "../interfaces/Express";

export function errorHandler(err: any, req: Req, res: Res, next: any) {
    // console.log(err);
    res.status(400).json({ message: err.message });
}
