import multer from "multer";
import * as path from "path";
import { Req, Res } from "../interfaces/Express";
import { UPLOAD_TO, BACKEND, PORT } from "../config/const";

export function uploadFile(req: Req, res: Res, next) {
    const file = req.file;
    if (!file) {
        const error: any = new Error("Upload file again!");
        error.httpStatusCode = 400;
        return next(error);
    }

    res.status(200).json({
        uploaded: true,
        url: `${BACKEND}:${PORT}/${UPLOAD_TO}/${req.file.filename}`,
    });
}
