import express from "express";
import { get, create, deleteById, StatusUpdate, getById } from "../controllers/room.controller.js";
import {protect,authorize } from "../middleware/auth.js"
const router = express.Router();

router.get("/", get);
router.post("/create",protect,authorize("admin","superAdmin"),create);
router.patch("/status-update/:id",protect,authorize("admin","superAdmin"), StatusUpdate);
router.delete("/delete/:id", protect,authorize("admin","superAdmin"),deleteById);
router.get("/:id",protect, getById);
export default router
