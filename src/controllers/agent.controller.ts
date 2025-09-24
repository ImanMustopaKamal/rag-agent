import { Request, Response } from "express";
import { AgentService } from "../services/agent.service";
import { ResponseError } from "../errors/response.error";

class AgentController {
  constructor(private agentService: AgentService) {}

  chat = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({ data: "ok" });
    } catch (error: any) {
      throw new ResponseError(500, error.message);
    }
  };
}

export const agentController = new AgentController(new AgentService());
