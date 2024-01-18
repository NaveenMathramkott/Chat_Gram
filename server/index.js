import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import chatRoute from "./routes/chatRoutes.js";
import userRoute from "./routes/userRoutes.js";
import messageRoute from "./routes/messageRoutes.js";
import morgan from "morgan";
import { Server } from "socket.io";

dotenv.config();
const app = express();

// connect to database
connectDb();

//middleWare
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//api routes for authentication
app.use("/api/v1/auth", authRoute);

//api routes for users
app.use("/api/v1", userRoute);

//api routes for chats
app.use("/api/v1/chat", chatRoute);

//api routes for messages
app.use("/api/v1/message", messageRoute);

app.get("/", (req, res) => {
  res.send("Chat Gram API is working Successfully");
});

// starting server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});

// integrating socket io
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: `${process.env.ORIGIN_PORT}`,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io  🫒🫒");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: 🫒🫒 " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED 🫒🫒");
    socket.leave(userData._id);
  });
});
