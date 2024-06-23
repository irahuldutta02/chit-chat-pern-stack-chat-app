import express from "express";
import { PORT } from "./config/server.config";
import authRouter from "./routes/auth.routes";
import messageRouter from "./routes/message.routes";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Server is up and running!",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
