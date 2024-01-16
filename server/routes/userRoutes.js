import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", requireSignIn, getAllUsers);

export default router;
