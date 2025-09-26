import { logger } from "../configs/logger.config";
import { IStoreRepository } from "../repositories/IStore.repository";
import { ResponseError } from "../errors/response.error";

export class DatabaseService {
  constructor(private storeRepository: IStoreRepository) {}

  async initializeDatabase(): Promise<void> {
    try {
      const indexes = await this.storeRepository.listIndexes();
      const exists = indexes.some((idx) => idx.name === "documents");

      if (!exists) {
        await this.storeRepository.createIndex("documents", 1536);
        logger.info("Created index 'documents'");
      } else {
        logger.info("Index 'documents' already exists");
      }
    } catch (error) {
      logger.error("Error initializing vector index:", error);
      throw new ResponseError(500, "Error initializing vector index");
    }
  }
}
