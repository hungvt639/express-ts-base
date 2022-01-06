import multer from "multer";
import { UPLOAD_TO } from "./const";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, UPLOAD_TO);
    },
    filename: function (req, file, cb) {
        const filename = Date.now();
        cb(null, filename + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });
export default upload;
