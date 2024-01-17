import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { allMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

// to get messages for the chat
router.get("/:chatId", requireSignIn, allMessages);

// to create a message for chat
router.post("/", requireSignIn, sendMessage);

export default router;
