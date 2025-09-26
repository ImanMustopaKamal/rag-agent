import { ResponseError } from "../errors/response.error";
import { MastraService } from "./mastra.service";

export class ChatService {
  constructor() {}

  async sendMessage(message: string): Promise<string> {
    try {
      const threadId = "123";
      const resourceId = "user-456";
      const mastra = new MastraService();
      const result = await mastra
        .getAgent("chatAgent")
        .generate(message, {
          memory: { thread: threadId, resource: resourceId },
        });
      return result.text;
    } catch (error: any) {
      throw new ResponseError(500, error.message);
    }
  }
}
