import { PgVector } from "@mastra/pg";
import { ResponseError } from "../errors/response.error";

export class IngestionRepository {
  private vectorStore: PgVector;

  constructor(connectionString: string) {
    this.vectorStore = new PgVector({ connectionString });
  }

  async upsert(indexName: string, vectors: any[]): Promise<string[]> {
    try {
      const data = await this.vectorStore.upsert({ indexName, vectors });
      return data;
    } catch (error: any) {
      throw new ResponseError(500, error.message);
    }
  }
}
