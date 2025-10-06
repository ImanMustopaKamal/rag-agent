// import "./instrumentation";
import express from "express";
import path from "path";
import { config } from "dotenv";

config({ path: path.join(__dirname, "../.env") });

import apiRoutes from "./routes/api.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import { logger } from "./configs/logger.config";
import { DATABASE_URL } from "./configs/database.config";
import { DatabaseService } from "./services/database.service";
import { StoreRepository } from "./repositories/store.repository";
import { setupSwagger } from "./configs/swagger.config";

declare global {
  var ___MASTRA_TELEMETRY___: boolean | undefined;
}

globalThis.___MASTRA_TELEMETRY___ = true;

const app = express();
const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.use("/api", apiRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

app.use(errorMiddleware);

async function startServer(): Promise<void> {
  try {
    const initDB = new DatabaseService(
      StoreRepository.getInstance(DATABASE_URL)
    );
    if (initDB) {
      await initDB.initializeDatabase();
    }

    app.listen(PORT, () => {
      logger.info(
        `Server running on port ${PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
}

process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("SIGINT received, shutting down gracefully");
  process.exit(0);
});

startServer();
