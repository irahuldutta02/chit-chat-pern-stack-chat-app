import express from "express";
import { getConversations } from "../controllers/message.controllers";

const messageRouter = express.Router();

messageRouter.get("/conversations", getConversations);

export default messageRouter;
