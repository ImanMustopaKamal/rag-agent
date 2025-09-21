import { Request, Response } from "express";
import { ResponseError } from "../errors/response.error";
import { fileSchema } from "../validations/file.validation";
import { logger } from "../configs/logger.config";
import { IngestionService } from "../services/ingestion.service";
import { IngestionRepository } from "../repositories/ingestion.repository";
import { DATABASE_URL } from "../configs/database.config";

class IngestionController {
  constructor(private ingestionService: IngestionService) {}

  get = async (req: Request, res: Response): Promise<void> => {
    res.send("ok");
  };

  store = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        throw new ResponseError(400, "No file uploaded");
      }

      fileSchema.parse({
        originalname: req.file.originalname,
        size: req.file.size,
      });

      const content = req.file.buffer.toString("utf-8");

      const result = await this.ingestionService.store(content);

      res.status(200).json({ data: "ok" });
    } catch (error: any) {
      logger.error(error.message);
      throw new ResponseError(500, error.message);
    }
  };
}

export const ingestionController = new IngestionController(
  new IngestionService(new IngestionRepository(DATABASE_URL))
);
