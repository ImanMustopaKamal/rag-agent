import multer from "multer";
import { MAX_FILE_SIZE } from "../configs/file.config";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
});