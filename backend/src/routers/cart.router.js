import express from "express";
const router = express.Router();
// import {  } from "../controllers/cart.controller.js";
import upload from "../middleware/multer.js";
import {  syncCart,
    addToCart,
    removeFromCart,
    qty  } from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.js";

router.post("/sync-cart",protect,syncCart);
router.post("/add-to-cart",protect,addToCart);
router.post("/remove-from-cart",protect,removeFromCart);
router.post("/qty",protect,qty);



export default router 