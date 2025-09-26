import { Mastra } from "@mastra/core/mastra";
import { DATABASE_URL } from "../configs/database.config";
import { AgentService } from "./agent.service";
import { StoreRepository } from "../repositories/store.repository";

export class MastraService {
  private mastra: Mastra;

  constructor() {
    const repo = new StoreRepository(DATABASE_URL);

    this.mastra = new Mastra({
      agents: {
        chatAgent: new AgentService(repo).chatAgent(),
      },
    });
  }

  getAgent(agentName: string) {
    return this.mastra.getAgent(agentName);
  }
}
