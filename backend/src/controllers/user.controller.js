import UserModel from "../models/user.model.js";
import { sendBadRequest, sendConflict, sendCreated, sendNotFound, sendServerError, sendSuccess } from "../utils/response.js"
import sendOtpMail from "../utils/sendOtpMail.js";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.API_SECRET);
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await UserModel.findOne({ email });
        console.log(user)
        if (user) return sendConflict(res, "User already exists");
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpire = Date.now() + 3 * 60 * 1000;
        const mailReponse = await sendOtpMail(email, otp);
        console.log(mailReponse, "mailResponse")
        const passwordHash = cryptr.encrypt(password);
        await UserModel.create({ name, email, password: passwordHash, otp, otpExpire });
        return res.status(201).json(
            {
                user: email,
                success: true, 
                message: "User registered successfully. Please check your email for OTP verification."
            }
        );


    } catch (error) {
        console.log(error, "error")
        sendServerError(res, "Internal Server Error")
    }

}

const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return sendConflict(res, "User not found");
        if (user.otp != otp) return sendConflict(res, "Invalid OTP");
        if (Date.now() > user.otpExpire) return sendConflict(res, "OTP expired");
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpire = undefined;
        await user.save();
        return res.send({
            msg: "otp verified sucessfully",
            success: true,
            email
        });
    } catch (error) {
        console.log(error, "error")
        sendServerError(res, "Internal Server Error")
    }

}


const resendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return sendConflict(res, "User not found");
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpire = Date.now() + 3 * 60 * 1000;
        const mailReponse = await sendOtpMail(email, otp);
        // console.log(mailReponse, "mailResponse")
        user.otp = otp;
        user.otpExpire = otpExpire;
        await user.save();
        return sendSuccess(res, "OTP resent successfully. Please check your email.");
    } catch (error) {
        console.log(error, "error")
        sendServerError(res, "Internal Server Error")
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return sendConflict(res, "User not found");
        const decryptedPassword = cryptr.decrypt(user.password);

        if (decryptedPassword != password) return sendConflict(res, "Invalid credentials");
        if (!user.isVerified) return sendConflict(res, "Please verify your email before logging in");
        // Send Cookie
const token = generateToken(user._id);

res.cookie("jwt", token, {
    maxAge: 900000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});
        return sendSuccess(res, "Login successful", { user:user, token:token });
    } catch (error) {
        console.log(error, "error")
        sendServerError(res, "Internal Server Error")
    }
}

const getProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return sendConflict(res, "User not found");
        return res.status(200).json({ success: true, message: "User profile fetched successfully",  user: user });
    }
    catch (error) {
        console.log(error, "error")

        sendServerError(res, "Internal Server Error")
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return sendConflict(res, "User not found");
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpire = Date.now() + 3 * 60 * 1000;

        await sendOtpMail(email, otp);

        user.otp = otp;
        user.otpExpire = otpExpire;

        await user.save();

        return res.send({
            msg: "OTP sent successfully",
            success: true,
            email,
        });

    } catch (error) {
        console.log(error);
        sendServerError(res, "Internal Server Error");
    }
};

export {
    forgotPassword,
    register,
    verifyOtp,
    resendOtp,
    login,
    getProfile
}