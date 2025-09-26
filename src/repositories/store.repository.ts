import { PgVector, PostgresStore } from "@mastra/pg";
import { ResponseError } from "../errors/response.error";
import { IStoreRepository } from "./IStore.repository";
import { createVectorQueryTool } from "@mastra/rag";
import { openai } from "@ai-sdk/openai";
import { Memory } from "@mastra/memory";

export class StoreRepository implements IStoreRepository {
  private vectorStore: PgVector;
  private pgStore: PostgresStore;

  constructor(connectionString: string) {
    this.vectorStore = new PgVector({
      connectionString,
    });
    this.pgStore = new PostgresStore({
      connectionString,
    });
  }

  async upsert(
    indexName: string,
    vectors: any[],
    metadata: any[]
  ): Promise<string[]> {
    try {
      const data = await this.vectorStore.upsert({
        indexName,
        vectors,
        metadata,
      });
      return data;
    } catch (error: any) {
      throw new ResponseError(500, error.message);
    }
  }

  async listIndexes(): Promise<any[]> {
    return this.vectorStore.listIndexes();
  }

  async createIndex(indexName: string, dimension: number): Promise<void> {
    await this.vectorStore.createIndex({ indexName, dimension });
  }

  vectorQuery(indexName: string): ReturnType<typeof createVectorQueryTool> {
    return createVectorQueryTool({
      vectorStoreName: "pgVector",
      vectorStore: this.vectorStore,
      indexName,
      model: openai.embedding("text-embedding-3-small"),
    });
  }

  initMemory(): Memory {
    return new Memory({
      storage: this.pgStore,
      vector: this.vectorStore,
      embedder: openai.embedding("text-embedding-3-small"),
      options: {
        lastMessages: 5,
        semanticRecall: {
          topK: 3,
          messageRange: 2,
        },
      },
    });
  }

  initVectorStore(): PgVector {
    return this.vectorStore;
  }

  initPGStore(): PostgresStore {
    return this.pgStore;
  }
}
