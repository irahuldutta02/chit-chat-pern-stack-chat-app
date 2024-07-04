import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controllers";
import { protectRoute } from "../middlewares/protectRoute";

const messageRouter = express.Router();

messageRouter.post("/send/:id", protectRoute, sendMessage);
messageRouter.get("/:id", protectRoute, getMessages);

export default messageRouter;
