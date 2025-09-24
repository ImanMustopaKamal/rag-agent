import { PgVector } from "@mastra/pg";
import { ResponseError } from "../errors/response.error";

export class IngestionRepository {
  private vectorStore: PgVector;

  constructor(connectionString: string) {
    this.vectorStore = new PgVector({
      connectionString,
      // schemaName: "pgVector",
    });
  }

  async upsert(indexName: string, vectors: any[], metadata: any[]): Promise<string[]> {
    try {
      const data = await this.vectorStore.upsert({ indexName, vectors, metadata });
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
}
