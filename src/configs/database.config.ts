import { PgVectorStore } from "../database/PgVectorStore";
import { IngestionRepository } from "../repositories/ingestion.repository";
import { logger } from "./logger.config";

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASSWORD) {
  throw new Error("Database environment variables not set properly");
}

export const DATABASE_URL = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export const vectorStore = new IngestionRepository(DATABASE_URL);

export async function initDatabase() {
  try {
    const indexes = await vectorStore.listIndexes();
    const exists = indexes.some((idx) => idx.name === "documents");

    if (!exists) {
      await vectorStore.createIndex("documents", 1536);
      logger.info("Created index 'documents'");
    } else {
      logger.info("Index 'documents' already exists");
    }
  } catch (error) {
    logger.error("Error initializing vector index:", error);
    throw error;
  }
}
