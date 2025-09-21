import { MDocument } from "@mastra/rag";
import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";
import { ResponseError } from "../errors/response.error";
import { IngestionRepository } from "../repositories/ingestion.repository";
import { logger } from "../configs/logger.config";

export class IngestionService {
  constructor(private ingestionRepository: IngestionRepository) {}

  async store(payload: string): Promise<string[]> {
    try {
      const docs = MDocument.fromMarkdown(payload);

      const chunks = await docs.chunk({
        strategy: "markdown",
        maxSize: 256,
        overlap: 50,
      });

      const { embeddings } = await embedMany({
        model: openai.embedding("text-embedding-3-small"),
        values: chunks.map((chunk) => chunk.text),
      });

      const result = await this.ingestionRepository.upsert(
        "embeddings",
        embeddings
      );

      logger.info(JSON.stringify(result));

      return result;
    } catch (error: any) {
      logger.error(error.message);
      throw new ResponseError(500, error.message);
    }
  }
}

// export const ingestionService = new IngestionService();
