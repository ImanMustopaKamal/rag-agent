import { Request, Response } from "express";
import { ResponseError } from "../errors/response.error";
import { ChatService } from "../services/chat.service";

class ChatController {
  constructor(private chatService: ChatService) {}

  sendMessage = async (req: Request, res: Response) => {
    try {
      const { message } = req.body as { message?: string };
      if (!message) {
        res.status(400).send("Missing 'message' in request body");
        return;
      }
      const response = await this.chatService.sendMessage(message);
      res.status(200).json({ response });
    } catch (error: any) {
      throw new ResponseError(500, error.message);
    }
  };
}

export const chatController = new ChatController(new ChatService());
