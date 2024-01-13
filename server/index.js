import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const httpServer = createServer(app);
import constant from "./constants.js";

const socketIO = new Server(httpServer, {
  cors: {
    origin: constant.ORGIN_PORT,
  },
});

app.use(cors());
let users = [];

socketIO.on("connection", (socket) => {
  console.log(
    `------------------------------------: ${socket.id}  user just connected!`
  );
  users.push({
    userID: socket.id,
    username: socket.name,
  });

  socket.broadcast.emit("newUserResponse", users);

  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data);
  });

  socket.on("typing", (data) => socket.broadcast.emit("typingResponse", data));

  socket.on("disconnect", () => {
    console.log("-------------------------------------: A user disconnected");
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit("newUserResponse", users);
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello Chat Gram" });
});

httpServer.listen(constant.PORT, () => {
  console.log(`Server listening on ${constant.PORT}`);
});
