import { Agent } from "@mastra/core";
import { IStoreRepository } from "../repositories/IStore.repository";
import { openai } from "@ai-sdk/openai";
import { PGVECTOR_PROMPT } from "@mastra/pg";

export class AgentService {
  constructor(private storeRepository: IStoreRepository) {}

  chatAgent(): Agent {
    return new Agent({
      name: "Chat Agent",
      instructions: `
			Process queries using the provided context. Structure responses to be concise and relevant.
			${PGVECTOR_PROMPT}`,
      model: openai("gpt-4o-mini"),
      memory: this.storeRepository.initMemory(),
      // new Memory({
      //   storage: this.storeRepository.initPGStore(),
      //   vector: this.storeRepository.initVectorStore(),
      //   embedder: openai.embedding("text-embedding-3-small"),
      //   options: {
      //     lastMessages: 5,
      //     semanticRecall: {
      //       topK: 3,
      //       messageRange: 2,
      //     },
      //   },
      // }),
      tools: { vectorQueryTool: this.storeRepository.vectorQuery("documents") },
    });
  }
}
