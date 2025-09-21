import { PgVector, PostgresStore } from "@mastra/pg";
import { IVectorStore } from "./IVectorStore";

export class PgVectorStore implements IVectorStore {
  private vectorStore: PgVector;
  private store: PostgresStore;

  constructor(connectionString: string) {
    this.vectorStore = new PgVector({ connectionString });
    this.store = new PostgresStore({ connectionString });
  }

  async listIndexes(): Promise<any[]> {
    return this.vectorStore.listIndexes();
  }

  async createIndex(indexName: string, dimension: number): Promise<void> {
    await this.vectorStore.createIndex({ indexName, dimension });
  }

  async upsert(indexName: string, vectors: any[]): Promise<void> {
    await this.vectorStore.upsert({ indexName, vectors });
  }

  getStore(): PostgresStore {
    return this.store;
  }
}
