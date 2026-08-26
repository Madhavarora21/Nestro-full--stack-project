import "dotenv/config";
import express from "express";
import cors from "cors";
const server = express();
import { connectDB } from './config/connectDB.js';


import categoryRouter from './routers/category.router.js';
import roomRouter from './routers/room.router.js';
import productRouter from "./routers/product.router.js";
import userRouter from './routers/user.router.js';
import cartRouter from './routers/cart.router.js'
import cookieParser from 'cookie-parser';

server.use(cookieParser())
server.use(express.json());
server.use(cors({ origin: "http://localhost:3000", credentials: true }));

server.use("/api/category", categoryRouter)
server.use("/api/room-type", roomRouter)
server.use("/api/product", productRouter)
server.use("/api/user", userRouter);
server.use("api/cart",cartRouter);

connectDB()
server.listen(process.env.PORT, () => {
    console.log("Server is running on port 5000")
})