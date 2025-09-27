import { ResponseError } from "../errors/response.error";
import { MastraService } from "./mastra.service";

export class ChatService {
  constructor() {}

  async sendMessage(message: string, userId: string, threadId: string): Promise<string> {
    try {
      const mastra = new MastraService();
      const result = await mastra
        .getAgent("chatAgent")
        .generate(message, {
          memory: { thread: threadId, resource: userId },
        });
      return result.text;
    } catch (error: any) {
      throw new ResponseError(500, error.message);
    }
  }
}
