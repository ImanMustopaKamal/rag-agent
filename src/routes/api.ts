import express from "express";
import { query } from "../database/connection";
// import { queryAgent } from "../agent/mastra-agent";
// import { runIngestion } from "../ingestion/pipeline";

const router = express.Router();

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

router.get("/health", async (req, res) => {
  try {
    // Test database connection
    const dbResult = await query("SELECT 1 as test");

    res.json({
      status: "OK",
      timestamp: new Date().toISOString(),
      database: dbResult.rows[0].test === 1 ? "connected" : "error",
    });
  } catch (error: any) {
    res.status(500).json({
      status: "ERROR",
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
});

export default router;
