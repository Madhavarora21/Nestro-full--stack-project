import express from "express";
const router = express.Router();
import { register, verifyOtp, resendOtp, login, getProfile, forgotPassword, googleLogin, phoneLogin, updateProfile, addAddress, logout } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.js";
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", login);
router.get("/profile", protect, getProfile);
router.post("/forgot-password", forgotPassword)
router.post("/google-login", googleLogin)
router.post("/phone-login", phoneLogin)
router.put("/update-profile", protect, updateProfile)
router.post("/add-address", protect, addAddress)
router.post("/logout", protect, logout)


export default router