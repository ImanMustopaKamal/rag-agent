import { Request, Response } from "express";
import { ResponseError } from "../errors/response.error";
import { ChatService } from "../services/chat.service";
import { chatSchema } from "../validations/chat.validation";

class ChatController {
  constructor(private chatService: ChatService) {}

  sendMessage = async (req: Request, res: Response) => {
    try {
      chatSchema.parse(req.body);

      const { message, userId, threadId } = req.body;

      const response = await this.chatService.sendMessage(
        message,
        userId,
        threadId
      );
      res.status(200).json({ response });
    } catch (error: any) {
      throw new ResponseError(500, error.message);
    }
  };
}

export const chatController = new ChatController(new ChatService());
