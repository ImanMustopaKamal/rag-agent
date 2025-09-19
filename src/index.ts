import express from "express";
import { config } from "dotenv";
import apiRoutes from "./routes/api";
import { testConnection } from "./database/connection";
// import { runIngestion } from "./ingestion/pipeline";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", apiRoutes);

async function startServer() {
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      throw new Error('Database connection failed');
    }

    // Run ingestion on startup (optional)
    // await runIngestion("./documents");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
