import { Memory } from "@mastra/memory";
import { PgVector, PostgresStore } from "@mastra/pg";
import { createVectorQueryTool } from "@mastra/rag";

export interface IStoreRepository {
  upsert(indexName: string, vectors: any[], metadata: any[]): Promise<string[]>;
  listIndexes(): Promise<any[]>;
  createIndex(indexName: string, dimension: number): Promise<void>;
  vectorQuery(indexName: string): ReturnType<typeof createVectorQueryTool>;
  initMemory(): Memory;
  initVectorStore(): PgVector;
  initPGStore(): PostgresStore;
}
