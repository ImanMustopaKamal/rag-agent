import { Request, Response } from "express";
import { ResponseError } from "../errors/response.error";
import { ChatService } from "../services/chat.service";
import { chatSchema } from "../validations/chat.validation";

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Kirim pesan chat dengan konteks dokumen
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *     responses:
 *       200:
 *         description: Respon sukses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 */


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
