import { MDocument } from "@mastra/rag";
import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";
import { ResponseError } from "../errors/response.error";
import { logger } from "../configs/logger.config";
import { IStoreRepository } from "../repositories/IStore.repository";

export class IngestionService {
  constructor(private storeRepository: IStoreRepository) {}

  async store(payload: string): Promise<string[]> {
    try {
      const docs = MDocument.fromMarkdown(payload);

      const chunks: Array<{ text: string }> = await docs.chunk({
        strategy: "markdown",
        headers: [
          ["#", "title"],
          ["##", "section"],
        ],
        extract: {
          summary: true,
          keywords: true,
        },
      });

      const { embeddings } = await embedMany({
        model: openai.embedding("text-embedding-3-small", {
          dimensions: 1536,
        }),
        values: chunks.map((chunk) => chunk.text),
      });

      const result = await this.storeRepository.upsert(
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
