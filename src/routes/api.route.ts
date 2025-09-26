import express from "express";
import { ingestionController } from "../controllers/ingestion.controller";
import { upload } from "../middlewares/file.middleware";
import { chatController } from "../controllers/chat.controller";

const router = express.Router();

router.post("/ingestion", upload.single("file"), ingestionController.store);

router.post("/chat", chatController.sendMessage);

export default router;
