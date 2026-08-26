import express from "express";
const router = express.Router();
import { register,  verifyOtp,resendOtp,login,getProfile,forgotPassword } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.js";
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.post("/forgot-password", forgotPassword)

export default router 