import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authControllers.js";

// router object
const router = express.Router();

// Method POST || Register
router.post("/register", registerController);

// Method POST || Login

router.post("/login", loginController);

export default router;
