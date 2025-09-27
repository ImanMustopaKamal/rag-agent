import path from "path";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export function setupSwagger(app: Express): void {
  const swaggerDocument = YAML.load(path.join(__dirname, "../../swagger.yaml"));
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
