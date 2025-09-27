import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mastra Agent API",
      version: "1.0.0",
      description:
        "API documentation for Mastra Agent service (Chat & Ingestion)",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        ChatRequest: {
          type: "object",
          required: ["message", "userId", "threadId"],
          properties: {
            message: { type: "string", example: "Halo, apa kabar?" },
            userId: { type: "string", example: "user-123" },
            threadId: { type: "string", example: "thread-456" },
          },
        },
        ChatResponse: {
          type: "object",
          properties: {
            ok: { type: "boolean", example: true },
            response: { type: "string", example: "Saya baik, terima kasih!" },
          },
        },
        IngestionResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            documentId: { type: "string", example: "doc-123" },
          },
        },
      },
    },
  },
  apis: ["./dist/routes/*.js", "./dist/controllers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
