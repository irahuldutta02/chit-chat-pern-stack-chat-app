import express from "express";
import { login, logout, signup } from "../controllers/auth.controllers";

const authRouter = express.Router();

authRouter.get("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/signup", signup);

export default authRouter;
