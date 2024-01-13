import express from "express";

// router object
const router = express.Router();

// Method POST || Register
router.post("/register", registerController);

export default router;
