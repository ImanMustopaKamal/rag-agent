export interface IVectorStore {
  listIndexes(): Promise<any[]>;
  createIndex(indexName: string, dimension: number, metric: string): Promise<void>;
  upsert(indexName: string, vectors: any[]): Promise<void>;
}