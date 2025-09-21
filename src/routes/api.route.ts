import express, { Request, Response } from "express";
import { mastra } from "../mastra";
import { MDocument } from "@mastra/rag";

import fs from "fs";
import { join } from "path";
import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";
import { vectorStore } from "../configs/database.config";
import { ingestionController } from "../controllers/ingestion.controller";
import { upload } from "../middlewares/file.middleware";

// import { query } from "../database/connection";
// import { queryAgent } from "../agent/mastra-agent";
// import { runIngestion } from "../ingestion/pipeline";

const router = express.Router();

router.get("/ingestion", ingestionController.get);
router.post("/ingestion", upload.single("file"), ingestionController.store);
// router.get("/weather", async (req: Request, res: Response) => {
//   const { city } = req.query as { city?: string };

//   if (!city) {
//     return res.status(400).send("Missing 'city' query parameter");
//   }

//   const agent = mastra.getAgent("weatherAgent");

//   try {
//     const result = await agent.generate(`What's the weather like in ${city}?`);
//     res.send(result.text);
//   } catch (error) {
//     console.error("Agent error:", error);
//     res.status(500).send("An error occurred while processing your request");
//   }
// });

// router.get("/ingestion", async (req: Request, res: Response) => {
//   const filePath = join(__dirname, "../../documents/master-documents.md");
//   const content = fs.readFileSync(filePath, "utf-8");

//   const docs = MDocument.fromMarkdown(content);

//   const chunks = await docs.chunk({
//     strategy: "markdown",
//     maxSize: 256,
//     overlap: 50,
//   });

//   const { embeddings: openAIEmbeddings } = await embedMany({
//     model: openai.embedding("text-embedding-3-small"),
//     values: chunks.map((chunk) => chunk.text),
//   });

//   // try {
//   //   const res = await vectorStore.upsert({
//   //     indexName: "documents",
//   //     vectors: openAIEmbeddings,
//   //   });

//   //   console.log("res: ", res)
//   // } catch (error) {
//   //   console.log("error: ", error)
//   // }

//   res.send("result.text");
// });

// router.post("/chat", async (req, res) => {
//   try {
//     const { userId, sessionId, message } = req.body;

//     if (!userId || !message) {
//       return res.status(400).json({ error: "userId and message are required" });
//     }

//     const response = await queryAgent(
//       userId,
//       sessionId || "default-session",
//       message
//     );

//     res.json({ response });
//   } catch (error) {
//     console.error("Error in chat endpoint:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.post("/ingest", async (req, res) => {
//   try {
//     await runIngestion("./documents");
//     res.json({ message: "Documents ingested successfully" });
//   } catch (error) {
//     console.error("Error in ingest endpoint:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

export default router;
