import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  accessChat,
  addToGroup,
  createGroupChat,
  fetchChats,
  removeFromGroup,
  renameGroup,
} from "../controllers/chatController.js";

const router = express.Router();

// to start a single chat
router.post("/", requireSignIn, accessChat);

// to get the single chat datas
router.get("/", requireSignIn, fetchChats);

// to create a group chat
router.post("/group", requireSignIn, createGroupChat);

// to rename a group chat
router.put("/groupchat/rename", requireSignIn, renameGroup);

// to remove user from a group chat
router.put("/groupchat/removeuser", requireSignIn, removeFromGroup);

// to add  user to a group chat
router.put("/groupchat/adduser", requireSignIn, addToGroup);

export default router;
