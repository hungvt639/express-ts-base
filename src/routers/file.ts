import { Router } from "express";
import { uploadFile } from "../controllers/file";
import upload from "../config/upload";

const File = Router();

File.post("/upload", upload.single("upload"), uploadFile);

export default File;
