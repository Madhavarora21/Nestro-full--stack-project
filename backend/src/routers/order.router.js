import express from "express";

import { placeOrder, getMyOrders } from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/place-order", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);

export default router;