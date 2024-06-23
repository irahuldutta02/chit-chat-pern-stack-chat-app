import { Request, Response } from "express";

export const getConversations = async (req: Request, res: Response) => {
  return res.status(200).json({
    status: 200,
    message: "Get conversation",
  });
};
