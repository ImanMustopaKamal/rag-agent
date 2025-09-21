import multer from "multer";
import { MAX_FILE_SIZE } from "../constants/file.constant";

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
});