import UserModel from "../models/user.model.js";
import admin from "../config/firebaseAdmin.js";
import { sendBadRequest, sendConflict, sendCreated, sendNotFound, sendServerError, sendSuccess } from "../utils/response.js"
import sendOtpMail from "../utils/sendOtpMail.js";
import Cryptr from "cryptr";
const cryptr = new Cryptr(process.env.API_SECRET);
import generateToken from "../utils/generateToken.js";
// import { OAuth2Client } from "google-auth-library";
// const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, mobile } = req.body;

        const existing = await UserModel.findOne({ email, _id: { $ne: userId } });
        if (existing) {
            return sendConflict(res, "Email already in use by another account");
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { name, email, mobile },
            { new: true, runValidators: true }
        ).select("-password -otp -otpExpire");

        return sendSuccess(res, "Profile updated successfully", { user: updatedUser });
    } catch (error) {
        console.log(error);
        sendServerError(res, "Internal Server Error");
    }
};

const addAddress = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, mobile, pincode, addressLine, city, state, country, isDefault } = req.body;

        if (!fullName || !mobile || !pincode || !addressLine || !city || !state) {
            return sendBadRequest(res, "Please fill all required address fields");
        }

        const user = await UserModel.findById(userId);

        if (isDefault) {
            user.addresses.forEach((addr) => (addr.isDefault = false));
        }

        user.addresses.push({
            fullName,
            mobile,
            pincode,
            addressLine,
            city,
            state,
            country: country || "India",
            isDefault: !!isDefault || user.addresses.length === 0,
        });

        await user.save();

        return sendSuccess(res, "Address added successfully", { addresses: user.addresses });
    } catch (error) {
        console.log(error);
        sendServerError(res, "Internal Server Error");
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        return sendSuccess(res, "Logged out successfully");
    } catch (error) {
        sendServerError(res, "Internal Server Error");
    }
};

const googleLogin = async (req, res) => {
    try {
        const { access_token } = req.body;

        if (!access_token) {
            return sendBadRequest(res, "Google access token is required");
        }

        const googleRes = await fetch(
            `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
        );

        if (!googleRes.ok) {
            return sendBadRequest(res, "Invalid Google access token");
        }

        const payload = await googleRes.json();
        const { email, name, sub: googleId } = payload;

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({
                name,
                email,
                googleId,
                isVerified: true,
                password: undefined,
            });
        } else if (!user.googleId) {
            user.googleId = googleId;
            user.isVerified = true;
            await user.save();
        }

        const token = generateToken(user._id);

        res.cookie("jwt", token, {
            maxAge: 900000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return sendSuccess(res, "Google login successful", { user, token });

    } catch (error) {
        console.log("GOOGLE LOGIN ERROR:", error);
        sendServerError(res, "Internal Server Error");
    }
};

const phoneLogin = async (req, res) => {
    try {
        const { idToken } = req.body;

        if (!idToken) {
            return sendBadRequest(res, "Firebase ID token is required");
        }

       const decodedToken = await admin.verifyIdToken(idToken);
        const { phone_number: phoneNumber, uid: firebaseUid } = decodedToken;

        let user = await UserModel.findOne({ mobile: phoneNumber });

        if (!user) {
            user = await UserModel.create({
                name: phoneNumber,
                email: `${firebaseUid}@phone.nestro.com`,
                mobile: phoneNumber,
                firebaseUid,
                isVerified: true,
                password: undefined,
            });
        } else if (!user.firebaseUid) {
            user.firebaseUid = firebaseUid;
            user.isVerified = true;
            await user.save();
        }

        const token = generateToken(user._id);

        res.cookie("jwt", token, {
            maxAge: 900000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return sendSuccess(res, "Phone login successful", { user, token });

    } catch (error) {
        console.log("PHONE LOGIN ERROR:", error);
        sendServerError(res, "Internal Server Error");
    }
};

export {
    forgotPassword,
    register,
    verifyOtp,
    resendOtp,
    login,
    getProfile,
    googleLogin,
    phoneLogin,
    updateProfile,
    addAddress,
    logout
}