import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { PgVector, PGVECTOR_PROMPT } from "@mastra/pg";
import { createVectorQueryTool } from "@mastra/rag";
import { StoreRepository } from "../../repositories/store.repository";
import { DATABASE_URL } from "../../configs/database.config";

export function createWeatherAgent(config: { databaseUrl: string }): Agent {
  // Create a single shared StoreRepository instance
  const storeRepo = new StoreRepository(config.databaseUrl);

  const vectorQueryTool = storeRepo.vectorQuery("documents");

  return new Agent({
    name: "Weather Agent",
    instructions: `
      Process queries using the provided context. Structure responses to be concise and relevant.
      ${PGVECTOR_PROMPT}
    `,
    model: openai("gpt-4o-mini"),
    memory: storeRepo.initMemory(),
    tools: { vectorQueryTool },
  });
}
