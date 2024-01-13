import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import connectDb from "./config/db.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);
connectDb();

app.use(cors());

app.use("/api/v1/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Chat Gram API is working Successfully");
});

httpServer.listen(process.env.PORT, () => {
  console.log(
    `Server listening on ${process.env.PORT} ${process.env.ORIGIN_PORT}`
  );
});
