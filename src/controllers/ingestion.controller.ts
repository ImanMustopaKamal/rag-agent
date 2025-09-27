import { Request, Response } from "express";
import { ResponseError } from "../errors/response.error";
import { fileSchema } from "../validations/file.validation";
import { logger } from "../configs/logger.config";
import { IngestionService } from "../services/ingestion.service";
import { DATABASE_URL } from "../configs/database.config";
import { StoreRepository } from "../repositories/store.repository";
import { IStoreRepository } from "../repositories/IStore.repository";
class IngestionController {
  constructor(private ingestionService: IngestionService) {}

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

      res.status(200).json({ data: result });
    } catch (error: any) {
      logger.error(error.message);
      throw new ResponseError(500, error.message);
    }
  };
}

const storeRepo: IStoreRepository = StoreRepository.getInstance(DATABASE_URL);

export const ingestionController = new IngestionController(
  new IngestionService(storeRepo)
);
