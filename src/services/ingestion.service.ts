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
        headers: [
          ["#", "title"],
          ["##", "section"],
        ],
        extract: {
          summary: true, // Extract summaries with default settings
          keywords: true, // Extract keywords with default settings
        },
      });

      logger.info("chuks: ", JSON.stringify(chunks));

      const { embeddings } = await embedMany({
        model: openai.embedding("text-embedding-3-small"),
        values: chunks.map((chunk) => chunk.text),
      });

      logger.info("embeddings: ", JSON.stringify(embeddings));

      const result = await this.ingestionRepository.upsert(
        "documents",
        embeddings,
        chunks.map((chunk) => ({ text: chunk.text }))
      );

      return result;
    } catch (error: any) {
      logger.error(error.message);
      throw new ResponseError(500, error.message);
    }
  }
}

// export const ingestionService = new IngestionService();
