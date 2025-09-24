import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { PgVector, PGVECTOR_PROMPT, PostgresStore } from "@mastra/pg";
import { fastembed } from "@mastra/fastembed";
import { weatherTool } from "../tools/weather-tool";
import { DATABASE_URL } from "../../configs/database.config";
import { createVectorQueryTool } from "@mastra/rag";

const pgVector = new PgVector({
  connectionString: DATABASE_URL,
});

const vectorQueryTool = createVectorQueryTool({
  vectorStoreName: "pgVector",
  vectorStore: pgVector,
  indexName: "documents",
  model: openai.embedding("text-embedding-3-small"),
});

export const weatherAgent = new Agent({
  name: "Weather Agent",
  instructions: `
  Process queries using the provided context. Structure responses to be concise and relevant.
  ${PGVECTOR_PROMPT}
  `,
  // instructions: `
  //   You are a helpful HR assistant. Answer questions based on the provided context.

  //   - Always respond in the same language the user uses.
  //   - Use a formal and professional tone.
  //   - Keep answers concise, clear, and focused.
  //   - If a question is not relevant to HR, politely explain that it is outside your scope.
  //   - If there are multiple possible answers, provide the best recommendation with reasoning.
  // `,
  model: openai("gpt-4o-mini"),
  memory: new Memory({
    storage: new PostgresStore({
      connectionString: DATABASE_URL,
    }),
    vector: pgVector,
    embedder: openai.embedding("text-embedding-3-small"),
    options: {
      lastMessages: 5, // simpan percakapan terakhir
      semanticRecall: {
        topK: 3, // ambil 3 embedding terdekat
        messageRange: 2, // rentang pesan yang dipertimbangkan
      },
    },
  }),
  tools: { vectorQueryTool },
});
