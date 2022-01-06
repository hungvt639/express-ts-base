import { Router } from "express";
import multer from "multer";
import { UPLOAD_TO } from "../config/const";
import { uploadFile } from "../controllers/file";
import { errorHandler } from "../utils/errorHandler ";
import upload from "../config/upload";

const File = Router();

File.post("/upload", upload.single("upload"), uploadFile, errorHandler);

export default File;
